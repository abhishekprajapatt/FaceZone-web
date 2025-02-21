import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';
import { Post } from '../models/post.model.js';
export const register = async (req, res) => {
  try {
    const { username, email, password, birthday } = req.body;
    if (!username || !email || !password || !birthday) {
      return res.status(401).json({
        message: 'Something is missing, please check!',
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: 'Try different email',
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
      birthday,
    });
    return res.status(201).json({
      message: 'Account created successfully.',
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: 'Something is missing, please check!',
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Incorrect email or password',
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: 'Incorrect email or password',
        success: false,
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );
    user = {
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      profilePicture: user.profilePicture,
      bannerPicture: user.bannerPicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: populatedPosts,
    };
    return res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (_, res) => {
  try {
    return res.cookie('token', '', { maxAge: 0 }).json({
      message: 'Logged out successfully.',
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId)
      .populate({ path: 'posts', createdAt: -1 })
      .populate('bookmarks');
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// original 
export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, bio, gender } = req.body;
    const profilePicture = req.files.profilePhoto ? req.files.profilePhoto[0] : null; // Use req.files for multiple files
    const bannerPicture = req.files.bannerPhoto ? req.files.bannerPhoto[0] : null; // Use req.files for multiple files
    let cloudResponse;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        message: 'User  not found.',
        success: false,
      });
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;

    // Handle profile picture upload
    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
      user.profilePicture = cloudResponse.secure_url; // Save the URL to the user object
    }

    // Handle banner picture upload
    if (bannerPicture) {
      const fileUri = getDataUri(bannerPicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
      user.bannerPicture = cloudResponse.secure_url; // Save the URL to the user object
    }

    await user.save();

    return res.status(200).json({
      message: 'Profile updated.',
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while updating the profile.',
      success: false,
    });
  }
};

// export const ditProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { name, bio, gender } = req.body;
//     const profilePicture = req.file;
//     const bannerPicture = req.file;
//     let cloudResponse;

//     if (profilePicture) {
//       const fileUri = getDataUri(profilePicture);
//       cloudResponse = await cloudinary.uploader.upload(fileUri);
//     }
//     if (bannerPicture) {
//       const fileUri = getDataUri(bannerPicture);
//       cloudResponse = await cloudinary.uploader.upload(fileUri);
//     }

//     const user = await User.findById(userId).select('-password');
//     if (!user) {
//       return res.status(404).json({
//         message: 'User not found.',
//         success: false,
//       });
//     }
//     if (name) user.name = name;
//     if (bio) user.bio = bio;
//     if (gender) user.gender = gender;
//     if (profilePicture) user.profilePicture = cloudResponse.secure_url;
//     if (bannerPicture) user.bannerPicture = cloudResponse.secure_url;

//     await user.save();

//     return res.status(200).json({
//       message: 'Profile updated.',
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getSuggestedUsers = async (req, res) => {
//   try {
//     const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
//       '-password'
//     );
//     if (!suggestedUsers) {
//       return res.status(400).json({
//         message: 'Currently do not have any users',
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       users: suggestedUsers,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const followOrUnfollow = async (req, res) => {
//   try {
//     const followKrneWala = req.id;
//     const jiskoFollowKrunga = req.params.id;
//     if (followKrneWala === jiskoFollowKrunga) {
//       return res.status(400).json({
//         message: 'You cannot follow/unfollow yourself',
//         success: false,
//       });
//     }

//     const user = await User.findById(followKrneWala);
//     const targetUser = await User.findById(jiskoFollowKrunga);

//     if (!user || !targetUser) {
//       return res.status(400).json({
//         message: 'User not found',
//         success: false,
//       });
//     }

//     const isFollowing = user.following.includes(jiskoFollowKrunga);
//     if (isFollowing) {
//       // unfollow logic
//       await Promise.all([
//         User.updateOne(
//           { _id: followKrneWala },
//           { $pull: { following: jiskoFollowKrunga } }
//         ),
//         User.updateOne(
//           { _id: jiskoFollowKrunga },
//           { $pull: { followers: followKrneWala } }
//         ),
//       ]);
//       return res
//         .status(200)
//         .json({ message: 'Unfollowed successfully', success: true });
//     } else {
//       // follow logic
//       await Promise.all([
//         User.updateOne(
//           { _id: followKrneWala },
//           { $push: { following: jiskoFollowKrunga } }
//         ),
//         User.updateOne(
//           { _id: jiskoFollowKrunga },
//           { $push: { followers: followKrneWala } }
//         ),
//       ]);
//       return res
//         .status(200)
//         .json({ message: 'followed successfully', success: true });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// default

// Follow a user
export const followUser  = async (req, res) => {
  try {
    const followerId = req.id;
    const targetUserId = req.params.id;

    if (followerId === targetUserId) {
      return res.status(400).json({
        message: 'You cannot follow yourself',
        success: false,
      });
    }

    const user = await User.findById(followerId);
    const targetUser  = await User.findById(targetUserId);

    if (!user || !targetUser ) {
      return res.status(404).json({
        message: 'User  not found',
        success: false,
      });
    }

    if (user.following.includes(targetUserId)) {
      return res.status(400).json({
        message: 'You are already following this user',
        success: false,
      });
    }

    // Follow logic
    await Promise.all([
      User.updateOne(
        { _id: followerId },
        { $push: { following: { id: targetUserId, username: targetUser .username, name: targetUser .name, profilePicture: targetUser .profilePicture } } }
      ),
      User.updateOne(
        { _id: targetUserId },
        { $push: { followers: { id: followerId, username: user.username, name: user.name, profilePicture: user.profilePicture } } }
      ),
    ]);

    return res.status(200).json({
      message: 'Followed successfully',
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while following the user',
      success: false,
    });
  }
};

// Unfollow a user
export const unfollowUser  = async (req, res) => {
  try {
    const followerId = req.id;
    const targetUserId = req.params.id;

    if (followerId === targetUserId) {
      return res.status(400).json({
        message: 'You cannot unfollow yourself',
        success: false,
      });
    }

    const user = await User.findById(followerId);
    const targetUser  = await User.findById(targetUserId);

    if (!user || !targetUser ) {
      return res.status(404).json({
        message: 'User  not found',
        success: false,
      });
    }

    if (!user.following.includes(targetUserId)) {
      return res.status(400).json({
        message: 'You are not following this user',
        success: false,
      });
    }

    // Unfollow logic
    await Promise.all([
      User.updateOne(
        { _id: followerId },
        { $pull: { following: { id: targetUserId } } }
      ),
      User.updateOne(
        { _id: targetUserId },
        { $pull: { followers: { id: followerId } } }
      ),
    ]);

    return res.status(200).json({
      message: 'Unfollowed successfully',
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while unfollowing the user',
      success: false,
    });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id, $nin: req?.user?.following } }).select('-password');
    if (!suggestedUsers.length) {
      return res.status(400).json({
        message: 'Currently do not have any users',
      });
    }
    return res.status(200).json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'An error occurred while fetching suggested users',
      success: false,
    });
  }
};