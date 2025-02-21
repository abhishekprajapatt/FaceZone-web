import express from 'express';
import {
  addComment,
  getCommentsOfPost,
  addReplyToComment,
  likeComment,
  dislikeComment,
  likeReply,
  dislikeReply,
} from '../controllers/comment.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/:id/comment').post(isAuthenticated, addComment);
router.route('/:id/comment/all').get(isAuthenticated, getCommentsOfPost);
router.route('/:id/comment/:commentId/reply').post(isAuthenticated, addReplyToComment);
router.route('/:postId/comment/:commentId/like').post(isAuthenticated, likeComment);
router.route('/:postId/comment/:commentId/reply/:replyId/like').post(isAuthenticated, likeReply);
router.route('/:postId/comment/:commentId/dislike').post(isAuthenticated, dislikeComment);
router.route('/:postId/comment/:commentId/reply/:replyId/dislike').post(isAuthenticated, dislikeReply);

export default router;