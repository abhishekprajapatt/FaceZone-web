import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date, required: true },
    name: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    bannerPicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female'] },
    followers: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: String,
        name: String,
        profilePicture: String,
      },
    ],
    following: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: String,
        name: String,
        profilePicture: String,
      },
    ],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);