import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';
import {
  addNewPost,
  bookmarkPost,
  deletePost,
  dislikePost,
  getAllPost,
  getUserPost,
  likePost,
} from '../controllers/post.controller.js';
import {
  addComment,
  getCommentsOfPost,
  addReplyToComment,
  likeComment,
  likeReply,
  dislikeComment,
  dislikeReply,
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/addpost', upload.single('media'), addNewPost);
router.route('/all').get(isAuthenticated, getAllPost);
router.route('/userpost/all').get(isAuthenticated, getUserPost);
router.route('/:id/like').get(isAuthenticated, likePost);
router.route('/:id/dislike').get(isAuthenticated, dislikePost);
// router.route('/:id/comment').post(isAuthenticated, addComment);
// router.route('/:id/comment/all').post(isAuthenticated, getCommentsOfPost);
router.route('/delete/:id').delete(isAuthenticated, deletePost);
router.route('/:id/bookmark').get(isAuthenticated, bookmarkPost);

// Comment Routes

router.route('/:id/comment').post(isAuthenticated, addComment);
router.route('/:id/comment/all').get(isAuthenticated, getCommentsOfPost);
router
  .route('/:id/comment/:commentId/reply')
  .post(isAuthenticated, addReplyToComment);
router
  .route('/:postId/comment/:commentId/like')
  .post(isAuthenticated, likeComment);
router
  .route('/:postId/comment/:commentId/reply/:replyId/like')
  .post(isAuthenticated, likeReply);
router
  .route('/:postId/comment/:commentId/dislike')
  .post(isAuthenticated, dislikeComment);
router
  .route('/:postId/comment/:commentId/reply/:replyId/dislike')
  .post(isAuthenticated, dislikeReply);

export default router;
