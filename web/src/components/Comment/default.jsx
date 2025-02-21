
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const Comments = ({ post }) => {
//   const updatePosts = (updatedPosts) => {
//     dispatch(setPosts(updatedPosts));
//   };
//   const { posts } = useSelector((state) => state.post);
//   const [comments, setComments] = useState([]);
//   const [comment, setComment] = useState(post.comment);
//   const [childComment, setChildComment] = useState('');

//   useEffect(() => {
//     // Fetch all comments with replies for the post
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`/api/comments/${post._id}/all`);
//         setComments(response.data.comments);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };
//     fetchComments();
//   }, [post._id]);

//   const commentHandler = async () => {
//     if (!text) return;
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post._id}/comment`,
//         { text },
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         const updatedComments = [...comment, res.data.comment];
//         setComment(updatedComments);

//         const updatedPosts = posts.map((p) =>
//           p._id === post._id ? { ...p, comments: updatedComments } : p
//         );
//         updatePosts(updatedPosts);
//         toast.success(res.data.message);
//         setText('');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddReply = async (commentId) => {
//     if (!childComment.trim()) return;
//     try {
//       const response = await axios.post(`/api/comments/${commentId}/reply`, {
//         text: childComment,
//       });
//       const updatedComments = comments.map((comment) => {
//         if (comment._id === commentId) {
//           return {
//             ...comment,
//             replies: [response.data.reply, ...comment.replies],
//           };
//         }
//         return comment;
//       });
//       setComments(updatedComments);
//       setChildComment('');
//     } catch (error) {
//       console.error('Error adding reply:', error);
//     }
//   };

//   const handleLikeComment = async (commentId) => {
//     try {
//       await axios.post(`/api/comments/${commentId}/like`);
//       const updatedComments = comments.map((comment) => {
//         if (comment._id === commentId) {
//           return {
//             ...comment,
//             likes: [...comment.likes, { userId: 'currentUser' }], // Replace "currentUser" with actual user ID
//           };
//         }
//         return comment;
//       });
//       setComments(updatedComments);
//     } catch (error) {
//       console.error('Error liking comment:', error);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(`/api/comments/${commentId}`);
//       const updatedComments = comments.filter(
//         (comment) => comment._id !== commentId
//       );
//       setComments(updatedComments);
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-xl">
//       <h2 className="text-lg font-bold mb-4">Comments</h2>
//       <div className="mb-4">
//         <textarea
//           className="w-full p-2 border rounded mb-2"
//           placeholder="Write a comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         ></textarea>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={commentHandler}
//         >
//           Post Comment
//         </button>
//       </div>
//       {comments.map((comment) => (
//         <div key={comment._id} className="mb-4 border-b pb-2">
//           <div className="flex justify-between items-center">
//             <p className="font-semibold">
//               {comment.author?.username || 'aman'}
//             </p>
//             <button
//               className="text-red-500"
//               onClick={() => handleDeleteComment(comment._id)}
//             >
//               Delete
//             </button>
//           </div>
//           <p>{comment?.text}</p>
//           <div className="mt-2">
//             <button
//               className="text-blue-500 mr-2"
//               onClick={() => handleLikeComment(comment._id)}
//             >
//               Like ({comment?.likes?.length})
//             </button>
//             <textarea
//               className="w-full p-2 border rounded mt-2"
//               placeholder="Write a reply..."
//               value={childComment}
//               onChange={(e) => setChildComment(e.target.value)}
//             ></textarea>
//             <button
//               className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//               onClick={() => handleAddReply(comment?._id)}
//             >
//               Reply
//             </button>
//           </div>
//           {comment.replies.map((reply) => (
//             <div key={reply?._id} className="ml-4 mt-2">
//               <p className="font-semibold">{reply.author?.username}</p>
//               <p>{reply.text}</p>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Comments;












// import { useState } from "react";
//  { motion } fromimport "framer-motion";

// export default function BottomSheet() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [height, setHeight] = useState(100); // Initial height

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button
//         className="px-4 py-2 bg-blue-600 text-white rounded"
//         onClick={() => setIsOpen(true)}
//       >
//         Open Comments
//       </button>

//       {/* Backdrop */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-10"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}

//       {/* Bottom Sheet */}
//       <motion.div
//         drag="y"
//         dragConstraints={{ top: -400, bottom: 0 }}
//         onDragEnd={(event, info) => {
//           if (info.velocity.y > 20 || info.point.y > 300) {
//             setIsOpen(false); // Close on slight downward drag
//           } else {
//             setHeight(info.point.y < 200 ? 400 : 250); // Adjust height dynamically
//           }
//         }}
//         initial={{ y: 600 }}
//         animate={{ y: isOpen ? 0 : 600 }}
//         transition={{ type: "spring", stiffness: 100, damping: 20 }}
//         className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-4 z-20"
//         style={{ height: `${height}px` }}
//       >
//         {/* Drag Handle */}
//         <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto mb-2"></div>
        
//         {/* Comments Section */}
//         <div className="overflow-auto h-full">
//           <p className="text-lg font-semibold">Comments</p>
//           <div className="mt-2 space-y-3">
//             {[...Array(10)].map((_, i) => (
//               <div key={i} className="p-2 bg-gray-100 rounded">
//                 Comment {i + 1}
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
