import sharp from 'sharp';
import cloudinary from '../utils/cloudinary.js';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';
import { Comment } from '../models/comment.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

// original
// export const addNewPost = async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const image = req.file;
//     const authorId = req.id;

//     if (!image) return res.status(400).json({ message: 'Image required' });

//     const optimizedImageBuffer = await sharp(image.buffer)
//       .resize({ width: 800, height: 800, fit: 'inside' })
//       .toFormat('jpeg', { quality: 80 })
//       .toBuffer();

//     const fileUri = `data:image/jpg;base64,${optimizedImageBuffer.toString(
//       'base64'
//     )}`;
//     const cloudResponse = await cloudinary.uploader.upload(fileUri);

//     const post = await Post.create({
//       caption,
//       image: cloudResponse.secure_url,
//       author: authorId,
//       createdAtDate: new Date(),
//     });
//     const user = await User.findById(authorId);
//     if (user) {
//       user.posts.push(post._id);
//       await user.save();
//     }

//     await post.populate({ path: 'author', select: '-password' });

//     return res.status(201).json({
//       message: 'New post added',
//       post,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// default
export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const media = req.file; // Renamed from 'image' to 'media' for clarity
    const authorId = req._id;

    if (!media) return res.status(400).json({ message: 'Media required' });

    let fileUri;
    let cloudResponse;

    // Check the MIME type of the uploaded file
    if (media.mimetype.startsWith('image/')) {
      // Handle image uploads
      const optimizedImageBuffer = await sharp(media.buffer)
        .resize({ width: 800, height: 800, fit: 'inside' })
        .toFormat('jpeg', { quality: 80 })
        .toBuffer();

      fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
        'base64'
      )}`;
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    } else if (media.mimetype.startsWith('video/')) {
      // Handle video uploads
      fileUri = `data:${media.mimetype};base64,${media.buffer.toString(
        'base64'
      )}`;
      cloudResponse = await cloudinary.uploader.upload(fileUri, {
        resource_type: 'video', // Specify that this is a video
      });
    } else {
      return res.status(400).json({ message: 'Unsupported media type' });
    }

    const post = await Post.create({
      caption,
      media: cloudResponse.secure_url, // Changed 'image' to 'media' to be more generic
      author: authorId,
      createdAtDate: new Date(),
    });

    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: 'author', select: '-password' });

    return res.status(201).json({
      message: 'New post added',
      post,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: 'author', select: 'username profilePicture bio' })
      .populate({
        path: 'comments',
        sort: { createdAt: -1 },
        populate: {
          path: 'author',
          select: 'username profilePicture bio',
        },
      });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'author',
        select: 'username profilePicture',
      })
      .populate({
        path: 'comments',
        sort: { createdAt: -1 },
        populate: {
          path: 'author',
          select: 'username profilePicture',
        },
      });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = async (req, res) => {
  try {
    const likeKrneWalaUserKiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: 'Post not found', success: false });

    await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
    await post.save();

    const user = await User.findById(likeKrneWalaUserKiId).select(
      'username profilePicture bio'
    );

    const postOwnerId = post.author.toString();
    if (postOwnerId !== likeKrneWalaUserKiId) {
      const notification = {
        type: 'like',
        userId: likeKrneWalaUserKiId,
        userDetails: user,
        postId,
        message: 'Your post was liked',
      };
      const postOwnerSocketId = getReceiverSocketId(postOwnerId);
      io.to(postOwnerSocketId).emit('notification', notification);
    }

    return res.status(200).json({ message: 'Post liked', user, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = async (req, res) => {
  try {
    const likeKrneWalaUserKiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: 'Post not found', success: false });

    await post.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
    await post.save();

    const user = await User.findById(likeKrneWalaUserKiId).select(
      'username profilePicture bio'
    );
    const postOwnerId = post.author.toString();
    if (postOwnerId !== likeKrneWalaUserKiId) {
      const notification = {
        type: 'dislike',
        userId: likeKrneWalaUserKiId,
        userDetails: user,
        postId,
        message: 'Your post was liked',
      };
      const postOwnerSocketId = getReceiverSocketId(postOwnerId);
      io.to(postOwnerSocketId).emit('notification', notification);
    }

    return res
      .status(200)
      .json({ message: 'Post disliked', user, success: true });
  } catch (error) {
    console.log(error);
  }
};

// export const addComment = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const commentKrneWalaUserKiId = req.id;

//     const { text } = req.body;

//     const post = await Post.findById(postId);

//     if (!text)
//       return res
//         .status(400)
//         .json({ message: 'text is required', success: false });

//     const comment = await Comment.create({
//       text,
//       author: commentKrneWalaUserKiId,
//       post: postId,
//     });

//     await comment.populate({
//       path: 'author',
//       select: 'username profilePicture',
//     });

//     post.comments.push(comment._id);
//     await post.save();

//     return res.status(201).json({
//       message: 'Comment Added',
//       comment,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getCommentsOfPost = async (req, res) => {
//   try {
//     const postId = req.params.id;

//     const comments = await Comment.find({ post: postId }).populate(
//       'author',
//       'username profilePicture'
//     );

//     if (!comments)
//       return res
//         .status(404)
//         .json({ message: 'No comments found for this post', success: false });

//     return res.status(200).json({ success: true, comments });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: 'Post not found', success: false });

    if (post.author.toString() !== authorId)
      return res.status(403).json({ message: 'Unauthorized' });

    await Post.findByIdAndDelete(postId);

    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      success: true,
      message: 'Post deleted',
    });
  } catch (error) {
    console.log(error);
  }
};
export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: 'Post not found', success: false });

    const user = await User.findById(authorId);
    if (user.bookmarks.includes(post._id)) {
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        type: 'unsaved',
        message: 'Post removed from bookmark',
        success: true,
      });
    } else {
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();
      return res
        .status(200)
        .json({ type: 'saved', message: 'Post bookmarked', success: true });
    }
  } catch (error) {
    console.log(error);
  }
};
