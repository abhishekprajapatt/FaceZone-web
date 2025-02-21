import express from 'express';
import {
  editProfile,
  // followOrUnfollow,
  followUser,
  getProfile,
  getSuggestedUsers,
  login,
  logout,
  register,
  unfollowUser,
} from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload, { uploadProfile } from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getProfile);
router
  .route('/profile/edit')
  .post(isAuthenticated, uploadProfile, editProfile);
router.route('/suggested').get(isAuthenticated, getSuggestedUsers);
// router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);

// default
router.route('/follow/:id').post(isAuthenticated, followUser );
router.route('/unfollow/:id').delete(isAuthenticated, unfollowUser );

export default router;
