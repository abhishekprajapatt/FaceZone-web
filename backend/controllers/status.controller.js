import { Status } from '../models/status.model.js';

// Create a new status
export const createStatus = async (req, res) => {
  try {
    const { content, image } = req.body;
    const newStatus = new Status({
      user: req.id, // assuming user id is set in middleware
      content,
      image,
    });

    await newStatus.save();
    return res.status(201).json({
      message: 'Status created successfully!',
      success: true,
      status: newStatus,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating status', success: false });
  }
};

// Get all statuses for a specific user
export const getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find({ user: req.id }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      statuses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching statuses', success: false });
  }
};

// Get a specific status by ID
export const getStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ message: 'Status not found', success: false });
    }
    return res.status(200).json({
      success: true,
      status,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching status', success: false });
  }
};

// Delete a status
export const deleteStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status || status.user.toString() !== req.id) {
      return res.status(404).json({ message: 'Status not found or unauthorized', success: false });
    }

    await status.remove();
    return res.status(200).json({
      message: 'Status deleted successfully!',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error deleting status', success: false });
  }
};
