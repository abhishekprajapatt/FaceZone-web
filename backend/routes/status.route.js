import express from 'express';
import {
  createStatus,
  getStatuses,
  getStatus,
  deleteStatus,
} from '../controllers/status.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

// Create a status
router.route('/status').post(isAuthenticated, createStatus);

// Get all statuses for the authenticated user
router.route('/statuses').get(isAuthenticated, getStatuses);

// Get a specific status by ID
router.route('/status/:id').get(isAuthenticated, getStatus);

// Delete a status
router.route('/status/delete/:id').delete(isAuthenticated, deleteStatus);

export default router;
