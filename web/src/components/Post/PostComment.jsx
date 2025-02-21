import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GoHeart } from 'react-icons/go';
import { FcLike } from 'react-icons/fc';
import { CiLocationArrow1 } from 'react-icons/ci';
import { formatDistanceToNow, parseISO } from 'date-fns';

const PostComment = ({ post, isOpen, setIsOpen }) => {
  const [height, setHeight] = useState(600); // Initial height
  const { user } = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [activeReply, setActiveReply] = useState(null);

  useEffect(() => {
    if (post?._id) {
      fetchComments(post._id);
    }
  }, [post?._id]);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${postId}/comment/all`,
        { withCredentials: true }
      );
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async (postId) => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${postId}/comment`,
        { text: newComment },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setComments([...comments, response.data.comment]);
      }
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddReply = async (commentId) => {
    if (!newReply.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${
          post._id
        }/comment/${commentId}/reply`,
        { text: `@${activeReply.username}${newReply}` },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: response.data.replies }
              : comment
          )
        );
      }
      setNewReply('');
      setActiveReply(null);
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${
          post._id
        }/comment/${commentId}/like`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, likedBy: [...comment.likedBy, user.id] }
              : comment
          )
        );
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDislike = async (commentId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${
          post._id
        }/comment/${commentId}/dislike`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likedBy: comment.likedBy.filter((id) => id !== user.id),
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  const handleReplyLike = async (commentId, replyId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${
          post._id
        }/comment/${commentId}/reply/${replyId}/like`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply._id === replyId
                      ? { ...reply, likedBy: [...reply.likedBy, user.id] }
                      : reply
                  ),
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error('Error liking reply:', error);
    }
  };

  const handleReplyDislike = async (commentId, replyId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${
          post._id
        }/comment/${commentId}/reply/${replyId}/dislike`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply._id === replyId
                      ? {
                          ...reply,
                          likedBy: reply.likedBy.filter((id) => id !== user.id),
                        }
                      : reply
                  ),
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error('Error disliking reply:', error);
    }
  };

  const handleReplyClick = (commentId, username) => {
    setActiveReply({ commentId, username });
  };

  console.log('comment : ', comments);
  return (
    <div className="flex justify-center itenms-center h-s creen">
      {/* Backdrop */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )} */}

      {/* Bottom Sheet */}
      <motion.div
        drag="y"
        dragConstraints={{ top: -400, bottom: 0 }}
        onDragEnd={(event, info) => {
          if (info.velocity.y > 20 || info.point.y > 300) {
            setIsOpen(false); // Close on slight downward drag
          } else {
            setHeight(info.point.y < 200 ? 400 : 250); // Adjust height dynamically
          }
        }}
        initial={{ y: 600 }}
        animate={{ y: isOpen ? 0 : 600 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-4 z-20"
        style={{ height: `${height}px` }}
      >
        {/* Drag Handle */}
        <div className="bg-white">
          <div className="w-12 h-1 bg-gray-500 rounded-full mx-auto mb-2" />
          <p className="text-md font-bold text-center border-b">Comments</p>
        </div>
        {/* <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto mb-2"></div> */}

        {/* Comments Section */}
        <div className="overflow-auto h-full">
          {/* <p className="text-md font-semibold text-center fixed border-b w-full right-0 bg-white">
              Comments
            </p> */}
          <div className="mt-2 space-y-3 mb-20">
            {comments.length > 0 ? (
              <>
                {comments?.map((comment) => (
                  <div key={comment._id} className="p-2">
                    <div className="flex gap-2 items-center">
                      <Avatar>
                        <AvatarImage
                          src={
                            comment?.author?.profilePicture ||
                            'https://example.com/default-avatar.png'
                          }
                          alt={comment?.author?.username || 'username'}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-sm">
                        {comment?.author?.username}
                      </span>
                      <h1 className="text-xs text-gray-500 dark:text-white">
                        {(() => {
                          if (!comment?.updatedAt) return '';
                          const updatedAt = parseISO(comment.updatedAt);
                          const now = new Date();
                          const isRecent =
                            now - updatedAt < 24 * 60 * 60 * 1000;
                          return isRecent
                            ? formatDistanceToNow(updatedAt, {
                                addSuffix: true,
                              })
                            : comment.updatedAt
                                .slice(0, 10)
                                .split('-')
                                .reverse()
                                .join('-');
                        })()}
                      </h1>
                    </div>
                    <p className="px-12 text-sm">{comment?.text}</p>
                    <div className="flex items-center px-12 py-1">
                      <div className="flex gap-2">
                        {comment.likedBy.includes(user.id) ? (
                          <FcLike
                            size={20}
                            onClick={() => handleDislike(comment._id)}
                          />
                        ) : (
                          <GoHeart
                            size={20}
                            onClick={() => handleLike(comment._id)}
                          />
                        )}
                        {comment?.likedBy?.length}
                      </div>
                      <button
                        className="text-gray-600 dark:text-white text-xs px-4"
                        onClick={() =>
                          handleReplyClick(
                            comment._id,
                            comment?.author?.username
                          )
                        }
                      >
                        Reply
                      </button>
                    </div>
                    <div className="ml-8 mt-">
                      {comment?.replies.map((reply) => (
                        <div key={reply._id} className="mb-2">
                          <div className="flex gap-2 items-center">
                            <Avatar>
                              <AvatarImage
                                src={
                                  reply?.author?.profilePicture ||
                                  'https://example.com/default-avatar.png'
                                }
                                alt={reply?.author?.username}
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="font-bold text-sm">
                              {reply?.author?.username}
                            </span>
                            <h1 className="text-xs text-gray-500 dark:text-white">
                              {(() => {
                                if (!reply?.createdAt) return '';
                                const createdAt = parseISO(reply.createdAt);
                                const now = new Date();
                                const isRecent =
                                  now - createdAt < 24 * 60 * 60 * 1000;
                                return isRecent
                                  ? formatDistanceToNow(createdAt, {
                                      addSuffix: true,
                                    })
                                  : reply.createdAt
                                      .slice(0, 10)
                                      .split('-')
                                      .reverse()
                                      .join('-');
                              })()}
                            </h1>
                          </div>
                          <p className="px-12 py-1 text-sm">{reply.text}</p>
                          <div className="flex px-12 gap-2">
                            {reply.likedBy.includes(user.id) ? (
                              <FcLike
                                size={20}
                                onClick={() =>
                                  handleReplyDislike(comment._id, reply._id)
                                }
                              />
                            ) : (
                              <GoHeart
                                size={20}
                                onClick={() =>
                                  handleReplyLike(comment._id, reply._id)
                                }
                              />
                            )}
                            {reply.likedBy.length}
                          </div>
                        </div>
                      ))}

                      {activeReply && activeReply.commentId === comment._id && (
                        <div className="flex items-center justify-between px-2">
                          <input
                            type="text"
                            placeholder={`Replying to ${activeReply?.username}...`}
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            className="outline-none text-sm w-full py-2 px-4 rounded-full border border-gray-200 dark:bg-slate-800"
                          />
                          {newReply && (
                            <button
                              onClick={() => handleAddReply(comment._id)}
                              className="bg-blue-700 text-white cursor-pointer rounded-full px-2 py-1 mx-1"
                            >
                              Reply
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center my-32">
                {' '}
                <h1 className="text-lg font-bold">No comments yet</h1>
                <p className="text-sm text-gray-400">Start the conversation.</p>
              </div>
            )}
          </div>
          <div className="flex gap-1 items-center justify-between fixed bottom-0 left-0 w-full px-2 py-2 bg-white border-t">
            <Avatar>
              <AvatarImage
                src={
                  user?.author?.profilePicture ||
                  'https://example.com/default-avatar.png'
                }
                alt={user?.author?.username}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <input
              type="text"
              placeholder={`Add a comment for ${
                post?.author?.username || ''
              }...`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={`outline-none text-sm ${
                !newComment ? 'w-full' : 'w-[16rem]'
              } w-full py-2 px-4 rounded-full border border-gray-200 dark:bg-slate-800`}
            />
            {newComment && (
              <button
                onClick={() => handleAddComment(post?._id)}
                className="bg-blue-600 text-white cursor-pointer rounded-full p-1"
              >
                <CiLocationArrow1 size={25} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PostComment;
