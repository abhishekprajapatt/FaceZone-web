import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    image: { type: String, default: '' }, // Optionally, an image for status
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

statusSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // Automatically remove after 24 hours

export const Status = mongoose.model('Status', statusSchema);
