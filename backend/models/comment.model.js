import mongoose from 'mongoose';
// const commentSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
//   likes: { type: Number, default: 0 },
//   replies: [
//     {
//       text: { type: String, required: true },
//       author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//       },
//       likes: { type: Number, default: 0 },
//       createdAt: { type: Date, default: Date.now },
//     },
//   ],
// });
// export const Comment = mongoose.model('Comment', commentSchema);

// import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [
      {
        text: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Comment = mongoose.model('Comment', commentSchema);