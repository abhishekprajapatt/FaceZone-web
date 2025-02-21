// import { Comment } from '../models/comment.model.js';
// import { Post } from '../models/post.model.js';

// export const addComment = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const commentAuthorId = req.id;
//     const { text } = req.body;

//     if (!text) {
//       return res
//         .status(400)
//         .json({ message: 'Text is required', success: false });
//     }

//     const post = await Post.findById(postId);

//     if (!post) {
//       return res
//         .status(404)
//         .json({ message: 'Post not found', success: false });
//     }

//     const comment = await Comment.create({
//       text,
//       author: commentAuthorId,
//       post: postId,
//       likes: 0,
//       replies: [],
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
//     console.error(error);
//     res.status(500).json({ message: 'Server error', success: false });
//   }
// };

// export const getCommentsOfPost = async (req, res) => {
//   try {
//     const postId = req.params.id;

//     const comments = await Comment.find({ post: postId }).populate(
//       'author',
//       'username profilePicture'
//     );

//     if (!comments || comments.length === 0) {
//       return res
//         .status(404)
//         .json({ message: 'No comments found for this post', success: false });
//     }

//     return res.status(200).json({ success: true, comments });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', success: false });
//   }
// };

// export const addReplyToComment = async (req, res) => {
//   try {
//     const { commentId } = req.params;
//     const postId = req.params.id;
//     const replyAuthorId = req.id;
//     const { text } = req.body;
//     console.log(
//       'post Id',
//       postId,
//       'comment Id',
//       commentId,
//       'text',
//       text,
//       'replyAuth',
//       replyAuthorId
//     );
//     if (!text || !postId || !commentId || !replyAuthorId) {
//       return res.status(400).json({ message: 'Invalid input', success: false });
//     }

//     const comment = await Comment.findById(commentId).populate(
//       'replies.author'
//     );
//     if (!comment) {
//       return res
//         .status(404)
//         .json({ message: 'Comment not found', success: false });
//     }

//     comment.replies.push({ text, author: replyAuthorId });
//     await comment.save();

//     const populatedComment = await Comment.findById(commentId).populate(
//       'replies.author',
//       'username profilePicture'
//     );
//     return res.status(201).json({
//       message: 'Reply added successfully',
//       replies: populatedComment.replies,
//       success: true,
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({
//       message: 'Server error',
//       success: false,
//       error: error.message,
//     });
//   }
// };

// // // Corrected controller for liking a comment
// // export const likeComment = async (req, res) => {
// //   try {
// //     const { postId, commentId } = req.params; // Ensure postId and commentId are in the URL
// //     const comment = await Comment.findById(commentId);
// //     if (!comment) {
// //       return res
// //         .status(404)
// //         .json({ message: 'Comment not found', success: false });
// //     }
// //     comment.likes += 1;
// //     await comment.save();
// //     return res.status(200).json({
// //       message: 'Comment liked',
// //       likes: comment.likes,
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error', success: false });
// //   }
// // };


// // // Corrected controller for liking a reply
// // export const likeReply = async (req, res) => {
// //   try {
// //     const { commentId, replyId } = req.params; // Properly using commentId and replyId from params

// //     const comment = await Comment.findById(commentId);

// //     if (!comment) {
// //       return res
// //         .status(404)
// //         .json({ message: 'Comment not found', success: false });
// //     }

// //     const reply = comment.replies.find(
// //       (reply) => reply._id.toString() === replyId
// //     );

// //     if (!reply) {
// //       return res
// //         .status(404)
// //         .json({ message: 'Reply not found', success: false });
// //     }

// //     reply.likes += 1;
// //     await comment.save();

// //     return res.status(200).json({
// //       message: 'Reply Liked',
// //       likes: reply.likes,
// //       success: true,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error', success: false });
// //   }
// // };



// // ✅ Like a Comment

// export const likeComment = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { commentId } = req.params;

//     const comment = await Comment.findById(commentId);
//     if (!comment) return res.status(404).json({ message: 'Comment not found', success: false });

//     // Add user to the likedBy array
//     await comment.updateOne({ $addToSet: { likedBy: userId } });
//     await comment.save();

//     // Send Notification to the comment owner
//     const commentOwnerId = comment.author.toString();
//     if (commentOwnerId !== userId) {
//       const user = await User.findById(userId).select('username profilePicture');
//       const notification = {
//         type: 'like',
//         userId,
//         userDetails: user,
//         commentId,
//         message: 'Your comment was liked',
//       };

//       const commentOwnerSocketId = getReceiverSocketId(commentOwnerId);
//       io.to(commentOwnerSocketId).emit('notification', notification);
//     }

//     return res.status(200).json({ message: 'Comment liked', success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Server error', success: false });
//   }
// };

// // ✅ Dislike a Comment
// export const dislikeComment = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { commentId } = req.params;

//     const comment = await Comment.findById(commentId);
//     if (!comment) return res.status(404).json({ message: 'Comment not found', success: false });

//     // Remove user from likedBy array
//     await comment.updateOne({ $pull: { likedBy: userId } });
//     await comment.save();

//     return res.status(200).json({ message: 'Comment disliked', success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Server error', success: false });
//   }
// };

// // ✅ Like a Reply
// export const likeReply = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { commentId, replyId } = req.params;

//     const comment = await Comment.findById(commentId);
//     if (!comment) return res.status(404).json({ message: 'Comment not found', success: false });

//     const reply = comment.replies.find((r) => r._id.toString() === replyId);
//     if (!reply) return res.status(404).json({ message: 'Reply not found', success: false });

//     // Add user to the likedBy array of the reply
//     reply.likedBy.push(userId);
//     await comment.save();

//     return res.status(200).json({ message: 'Reply liked', success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Server error', success: false });
//   }
// };

// // ✅ Dislike a Reply
// export const dislikeReply = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { commentId, replyId } = req.params;

//     const comment = await Comment.findById(commentId);
//     if (!comment) return res.status(404).json({ message: 'Comment not found', success: false });

//     const reply = comment.replies.find((r) => r._id.toString() === replyId);
//     if (!reply) return res.status(404).json({ message: 'Reply not found', success: false });

//     // Remove user from likedBy array of the reply
//     reply.likedBy = reply.likedBy.filter((id) => id.toString() !== userId);
//     await comment.save();

//     return res.status(200).json({ message: 'Reply disliked', success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Server error', success: false });
//   }
// };













import { Comment } from '../models/comment.model.js';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';
import { io, getReceiverSocketId } from '../socket/socket.js';

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentAuthorId = req.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text is required', success: false });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false });
    }

    const comment = await Comment.create({
      text,
      author: commentAuthorId,
      post: postId,
      likedBy: [],
      replies: [],
    });

    await comment.populate({
      path: 'author',
      select: 'username profilePicture',
    });

    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({
      message: 'Comment Added',
      comment,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId }).populate('author', 'username profilePicture');

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this post', success: false });
    }

    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};

export const addReplyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const postId = req.params.id;
    const replyAuthorId = req.id;
    const { text } = req.body;

    if (!text || !postId || !commentId || !replyAuthorId) {
      return res.status(400).json({ message: 'Invalid input', success: false });
    }

    const comment = await Comment.findById(commentId).populate('replies.author');
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found', success: false });
    }

    comment.replies.push({ text, author: replyAuthorId, likedBy: [] });
    await comment.save();

    const populatedComment = await Comment.findById(commentId).populate('replies.author', 'username profilePicture');
    return res.status(201).json({
      message: 'Reply added successfully',
      replies: populatedComment.replies,
      success: true,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      error: error.message,
    });
  }
};

export const likeComment = async (req, res) => {
  try {
    const userId = req.id;
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found', success: false });

    await comment.updateOne({ $addToSet: { likedBy: userId } });
    await comment.save();

    const commentOwnerId = comment.author.toString();
    if (commentOwnerId !== userId) {
      const user = await User.findById(userId).select('username profilePicture');
      const notification = {
        type: 'like',
        userId,
        userDetails: user,
        commentId,
        message: 'Your comment was liked',
      };

      const commentOwnerSocketId = getReceiverSocketId(commentOwnerId);
      io.to(commentOwnerSocketId).emit('notification', notification);
    }

    return res.status(200).json({ message: 'Comment liked', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};

export const dislikeComment = async (req, res) => {
  try {
    const userId = req.id;
    const { commentId } = req.params;

    console.log('Disliking Comment ID:', commentId); // Debugging line

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found', success: false });

    await comment.updateOne({ $pull: { likedBy: userId } });
    await comment.save();

    return res.status(200).json({ message: 'Comment disliked', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};

export const likeReply = async (req, res) => {
  try {
    const userId = req.id;
    const { commentId, replyId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found', success: false });

    const reply = comment.replies.find((r) => r._id.toString() === replyId);
    if (!reply) return res.status(404).json({ message: 'Reply not found', success: false });

    reply.likedBy.push(userId);
    await comment.save();

    return res.status(200).json({ message: 'Reply liked', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};

export const dislikeReply = async (req, res) => {
  try {
    const userId = req.id;
    const { commentId, replyId } = req.params;

    console.log('Disliking Reply ID:', replyId); // Debugging line

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found', success: false });

    const reply = comment.replies.find((r) => r._id.toString() === replyId);
    if (!reply) return res.status(404).json({ message: 'Reply not found', success: false });

    reply.likedBy = reply.likedBy.filter((id) => id.toString() !== userId);
    await comment.save();

    return res.status(200).json({ message: 'Reply disliked', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};