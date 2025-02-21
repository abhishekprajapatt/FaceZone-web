// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Heart } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { useSelector } from 'react-redux';

// const InstagramCommentSystem = () => {
//   const { post } = useSelector((state) => state.post);
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       name: 'abhi_shek_81301',
//       profilePic:
//         'https://www.google.com/imgres?q=wallpaper%20spider%20man&imgurl=https%3A%2F%2F4kwallpapers.com%2Fimages%2Fwallpapers%2Fmarvels-spider-man-1920x1200-12891.jpg&imgrefurl=https%3A%2F%2F4kwallpapers.com%2Fgames%2Fmarvels-spider-man-12891.html&docid=GodEWzXlv8nV8M&tbnid=9NJJmltdsaFWtM&vet=12ahUKEwi6xe_UsZGLAxU_iK8BHWOfPc0QM3oECGYQAA..i&w=1920&h=1200&hcb=2&ved=2ahUKEwi6xe_UsZGLAxU_iK8BHWOfPc0QM3oECGYQAA',
//       text: 'Nice pic😍😍',
//       likes: 0,
//       replies: [
//         {
//           id: 1,
//           name: 'getuready_',
//           profilePic: 'https://via.placeholder.com/40',
//           text: '@abhi_shek_81301 jskwiie9d99c',
//           likes: 8,
//         },
//         {
//           id: 2,
//           name: 'aman',
//           profilePic: 'https://via.placeholder.com/40',
//           text: '@aman_81301 jddkkskks',
//           likes: 1,
//         },
//       ],
//     },
//     {
//       id: 1,
//       name: 'abhi_shek_1',
//       profilePic: 'https://via.placeholder.com/40',
//       text: 'Nice pic😍😍',
//       likes: 0,
//       replies: [
//         {
//           id: 1,
//           name: 'getuready_',
//           profilePic: 'https://via.placeholder.com/40',
//           text: '@abhi_shek_81301 jskwiie9d99c',
//           likes: 8,
//         },
//         {
//           id: 2,
//           name: 'aman',
//           profilePic: 'https://via.placeholder.com/40',
//           text: '@aman_81301 jddkkskks',
//           likes: 1,
//         },
//       ],
//     },
//     {
//       id: 1,
//       name: 'abhi_shek_8',
//       profilePic: 'https://via.placeholder.com/40',
//       text: 'Nice pic😍😍',
//       likes: 0,
//       replies: [
//         {
//           id: 1,
//           name: 'getuready_',
//           profilePic: 'https://via.placeholder.com/40',
//           text: '@abhi_shek_81301 jskwiie9d99c',
//           likes: 8,
//         },
//         {
//           id: 2,
//           name: 'aman',
//           profilePic: 'https://via.placeholder.com/40',
//           text: '@aman_81301 jddkkskks',
//           likes: 1,
//         },
//       ],
//     },
//   ]);

//   const [newComment, setNewComment] = useState('');
//   const [newReply, setNewReply] = useState('');
//   const [activeReply, setActiveReply] = useState(null);

//   const handleTextChange = (e) => setNewComment(e.target.value.trim());

//   const handleAddComment = () => {
//     if (newComment.trim() !== '') {
//       const newCommentObj = {
//         id: comments.length + 1,
//         name: 'Your Username', // Replace with logged-in user name
//         profilePic: 'https://via.placeholder.com/40', // Replace with user's profile pic
//         text: newComment,
//         likes: 0,
//         replies: [],
//       };
//       setComments([...comments, newCommentObj]);
//       setNewComment('');
//     }
//   };

//   const handleAddReply = (commentId) => {
//     if (newReply.trim() !== '') {
//       setComments(
//         comments.map((comment) =>
//           comment.id === commentId
//             ? {
//                 ...comment,
//                 replies: [
//                   ...comment.replies,
//                   {
//                     id: comment.replies.length + 1,
//                     name: 'Your Username', // Replace with logged-in user name
//                     profilePic: 'https://via.placeholder.com/40', // Replace with user's profile pic
//                     text: `@${activeReply.username} ${newReply}`,
//                     likes: 0,
//                   },
//                 ],
//               }
//             : comment
//         )
//       );
//       setNewReply('');
//       setActiveReply(null);
//     }
//   };

//   const handleReplyClick = (commentId, username) => {
//     setActiveReply({ commentId, username });
//   };

//   const handleLike = (commentId, isReply = false, replyId = null) => {
//     setComments(
//       comments.map((comment) => {
//         if (comment.id === commentId) {
//           if (isReply) {
//             return {
//               ...comment,
//               replies: comment.replies.map((reply) =>
//                 reply.id === replyId
//                   ? { ...reply, likes: reply.likes + 1 }
//                   : reply
//               ),
//             };
//           }
//           return { ...comment, likes: comment.likes + 1 };
//         }
//         return comment;
//       })
//     );
//   };

//   return (
//     <div className="">
//       <div className=" mb-4">
//         <div className="flex items-center justify-between px-2">
//           <input
//             type="text"
//             placeholder={`Add a comment for ${
//               post?.author.username || 'abhishekprajapatt'
//             }...`}
//             value={newComment}
//             onChange={handleTextChange}
//             className="outline-none text-sm w-full py-2 px-4 rounded-full border border-gray-200"
//           />
//           {newComment && (
//             <span
//               onClick={() => handleAddComment()}
//               className="bg-blue-700 text-white cursor-pointer rounded-full px-2 py-1 mx-1"
//             >
//               Comment
//             </span>
//           )}
//         </div>
//       </div>
//       {comments.map((comment) => (
//         <div key={comment.id} className="p-">
//           <div className="flex gap-2 items-center">
//             <Avatar className="">
//               <AvatarImage
//                 src={
//                   comment.profilePic ||
//                   'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
//                 }
//                 alt={comment?.name}
//               />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             {/* <img
//               src={
//                 comment.profilePic ||
//                 'https://www.google.com/imgres?q=wallpaper%20spider%20man&imgurl=https%3A%2F%2F4kwallpapers.com%2Fimages%2Fwallpapers%2Fmarvels-spider-man-1920x1200-12891.jpg&imgrefurl=https%3A%2F%2F4kwallpapers.com%2Fgames%2Fmarvels-spider-man-12891.html&docid=GodEWzXlv8nV8M&tbnid=9NJJmltdsaFWtM&vet=12ahUKEwi6xe_UsZGLAxU_iK8BHWOfPc0QM3oECGYQAA..i&w=1920&h=1200&hcb=2&ved=2ahUKEwi6xe_UsZGLAxU_iK8BHWOfPc0QM3oECGYQAA'
//               }
//               alt={comment.name}
//               className="mr-2"
//             /> */}
//             <span className="font-bold text-sm">{comment.name}</span>
//           </div>
//           <p className="px-12 text-sm">{comment.text}</p>
//           <div className="flex items-center px-8">
//             <Button variant="ghost" onClick={() => handleLike(comment.id)}>
//               <Heart className="mr-2" /> {comment.likes}
//             </Button>
//             <button
//               className="text-gray-600 text-xs"
//               variant="ghost"
//               onClick={() => handleReplyClick(comment.id, comment.name)}
//             >
//               Reply
//             </button>
//           </div>

//           {/* Replies Section */}
//           <div className="ml-8 mt-4">
//             {comment.replies.map((reply) => (
//               <div key={reply.id} className="mb-2">
//                 {/* <div className="flex items-center mb-1">
//                   <Avatar
//                     src={reply.profilePic}
//                     alt={reply.name}
//                     className="mr-2"
//                   />
//                   <span className="font-bold">{reply.name}</span>
//                 </div> */}
//                 <div className="flex gap-2 items-center">
//                   <Avatar className="">
//                     <AvatarImage
//                       src={
//                         reply.profilePic ||
//                         'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
//                       }
//                       alt={reply?.name}
//                     />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                   <span className="font-bold text-sm">{reply.name}</span>
//                 </div>
//                 <p className="px-12 text-sm">{reply.text}</p>
//                 <Button
//                   variant="ghost"
//                   onClick={() => handleLike(comment.id, true, reply.id)}
//                 >
//                   <Heart className="mr-2" /> {reply.likes}
//                 </Button>
//               </div>
//             ))}

//             {activeReply && activeReply.commentId === comment.id && (
//               <>
//                 {/* <div className="mt-2">
//                   <Input
//                     type="text"
//                     placeholder={`Replying to ${activeReply.username}...`}
//                     value={newReply}
//                     onChange={(e) => setNewReply(e.target.value)}
//                     className="mb-2"
//                   />
//                   <Button onClick={() => handleAddReply(comment.id)}>
//                     Send Reply
//                   </Button>
//                 </div> */}
//                 <div className="flex items-center justify-between px-2">
//                   <input
//                     type="text"
//                     placeholder={`Replying to ${activeReply.username}...`}
//                     value={newReply}
//                     onChange={(e) => setNewReply(e.target.value)}
//                     className="outline-none text-sm w-full py-2 px-4 rounded-full border border-gray-200"
//                   />
//                   {newReply && (
//                     <span
//                       onClick={() => handleAddReply(comment.id)}
//                       className="bg-blue-700 text-white cursor-pointer rounded-full px-2 py-1 mx-1"
//                     >
//                       Comment
//                     </span>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InstagramCommentSystem;

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Flame, Heart, ThumbsUp } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { GoHeart } from 'react-icons/go';
// import { FcLike } from 'react-icons/fc';

// const Comment = ({ post }) => {
//   const { posts } = useSelector((state) => state.post);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [newReply, setNewReply] = useState('');
//   const [activeReply, setActiveReply] = useState(null);
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (post?._id) {
//       fetchComments(post?._id);
//     }
//   }, [post?._Id]);

//   const fetchComments = async (postId) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${postId}/comment/all`,
//         { withCredentials: true }
//       );

//       setComments(response.data.comments || []);
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//     }
//   };

//   const handleAddComment = async (postId) => {
//     if (!newComment.trim()) return;

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${postId}/comment`,
//         { text: newComment },
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true,
//         }
//       );
//       if (response.data.success) {
//         setComments([...comments, response.data.comment]);
//       }
//       setNewComment('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   const handleAddReply = async (commentId) => {
//     if (!newReply.trim()) {
//       console.error('Reply text cannot be empty.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${
//           post._id
//         }/comment/${commentId}/reply`,
//         { text: `@${activeReply.username} ${newReply}` },
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true,
//         }
//       );

//       if (response.data.success) {
//         setComments(
//           comments.map((comment) =>
//             comment._id === commentId
//               ? { ...comment, replies: response.data.replies }
//               : comment
//           )
//         );
//       }
//       setNewReply('');
//       setActiveReply(null);
//     } catch (error) {
//       console.error('Error adding reply:', error);
//     }
//   };

//   const handleLike = async (commentId) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${
//           post._id
//         }/comment/${commentId}/like`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       if (response.data.success) {
//         setComments(
//           comments.map((comment) =>
//             comment._id === commentId
//               ? { ...comment, likes: response.data.likes }
//               : comment
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Error liking:', error);
//     }
//   };
//   const handleReplyLike = async (commentId, replyId) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${
//           post._id
//         }/comment/${commentId}/reply/${replyId}/like`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data.success) {
//         setComments((prevComments) =>
//           prevComments.map((comment) =>
//             comment._id === commentId
//               ? {
//                   ...comment,
//                   replies: comment.replies.map((reply) =>
//                     reply._id === replyId
//                       ? { ...reply, likes: response.data.likes }
//                       : reply
//                   ),
//                 }
//               : comment
//           )
//         );
//       } else {
//         console.error('Failed to like reply:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error liking reply:', error);
//     }
//   };

//   const handleReplyClick = (commentId, username) => {
//     setActiveReply({ commentId, username });
//   };

//   return (
//     <div className="">
//       <div className="mb-4">
//         <div className="flex items-center justify-between px-2">
//           <input
//             type="text"
//             placeholder={`Add a comment for ${post?.author?.username || ''}...`}
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             className="outline-none text-sm w-full py-2 px-4 rounded-full border border-gray-200 dark:bg-slate-800"
//           />
//           {newComment && (
//             <span
//               onClick={() => handleAddComment(post?._id)}
//               className="bg-blue-700 text-white cursor-pointer rounded-full px-2 py-1 mx-1"
//             >
//               Comment
//             </span>
//           )}
//         </div>
//       </div>
//       {comments?.map((comment) => (
//         <div key={comment?._id} className="p-">
//           <div className="flex gap-2 items-center">
//             <Avatar className="">
//               <AvatarImage
//                 src={
//                   comment?.author?.profilePicture ||
//                   'https://cdn1.epicgames.com/offer/f696430be718494fac1d6542cfb22542/EGS_MarvelsSpiderManMilesMorales_InsomniacGamesNixxesSoftware_S1_2560x1440-a0518b9f9f36a05294e37448df8a27a0'
//                 }
//                 alt={comment?.author?.username}
//               />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <span className="font-bold text-sm">
//               {comment?.author?.username}
//             </span>
//           </div>
//           <p className="px-12 py-1 text-sm">{comment?.text}</p>
//           <div className="flex items-center px-12">
//             <div className="flex gap-2">
//               {comment.likes ? (
//                 <FcLike size={30} />
//               ) : (
//                 <GoHeart size={30} onClick={() => handleLike()} />
//               )}
//               {comment?.likes}
//               {/* <ThumbsUp
//                 size={comment.likes ? 25 : 20}
//                 className={`cursor-pointer ${
//                   comment.likes
//                     ? 'bg-blue-500 text-white rounded-full py-1'
//                     : 'hover:text-gray-600'
//                 }`}
//                 // className="mr-2 text-yellow-300"
//               />{' '} */}
//             </div>
//             <button
//               className="text-gray-600 text-xs px-2"
//               onClick={() =>
//                 handleReplyClick(comment?._id, comment?.author?.username)
//               }
//             >
//               Reply
//             </button>
//           </div>

//           {/* Replies Section */}
//           <div className="ml-8 mt-4">
//             {comment.replies.map((reply) => (
//               <div key={reply?._id} className="mb-2">
//                 <div className="flex gap-2 items-center">
//                   <Avatar className="">
//                     <AvatarImage
//                       src={
//                         reply?.author?.profilePicture ||
//                         'https://cdn1.epicgames.com/offer/f696430be718494fac1d6542cfb22542/EGS_MarvelsSpiderManMilesMorales_InsomniacGamesNixxesSoftware_S1_2560x1440-a0518b9f9f36a05294e37448df8a27a0'
//                       }
//                       alt={reply?.author?.username}
//                     />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                   <span className="font-bold text-sm">
//                     {reply?.author?.username}
//                   </span>
//                 </div>
//                 <p className="px-12 py-1 text-sm">{reply?.text}</p>
//                 <div className="flex px-12 gap-2">
//                   {reply?.likedByUser ? (
//                     <FcLike size={30} onClick ={() => handleReplyLike(comment._id, reply._id)} />
//                   ) : (
//                     <GoHeart
//                       onClick={() => handleReplyLike(comment._id, reply._id)}
//                       size={30}
//                     />
//                   )}

//                   {/* <ThumbsUp
//                     onClick={() => handleReplyLike(comment._id, reply._id)}
//                     size={reply.likes ? 25 : 20}
//                     className={`cursor-pointer ${
//                       reply.likes
//                         ? 'bg-blue-500 text-white rounded-full py-1'
//                         : 'hover:text-gray-600'
//                     }`}
//                   />{' '} */}
//                   {reply?.likes}
//                 </div>
//               </div>
//             ))}

//             {activeReply && activeReply.commentId === comment?._id && (
//               <div className="flex items-center justify-between px-2">
//                 <input
//                   type="text"
//                   placeholder={`Replying to ${activeReply?.username}...`}
//                   value={newReply}
//                   onChange={(e) => setNewReply(e.target.value)}
//                   className="outline-none text-sm w-full py-2 px-4 rounded-full border border-gray-200 dark:bg-slate-800"
//                 />
//                 {newReply && (
//                   <button
//                     onClick={() => handleAddReply(comment._id)}
//                     className="bg-blue-700 text-white cursor-pointer rounded-full px-2 py-1 mx-1"
//                   >
//                     Reply
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Comment;

import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GoHeart } from 'react-icons/go';
import { FcLike } from 'react-icons/fc';
import { formatDistanceToNow, parseISO } from 'date-fns';


const Comment = ({ post}) => {
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
        { text: `@${activeReply.username} ${newReply}` },
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

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center justify-between px-2">
          <input
            type="text"
            placeholder={`Add a comment for ${post?.author?.username || ''}...`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="outline-none text-sm w-full py-2 px-4 rounded-full border border-gray-200 dark:bg-slate-800"
          />
          {newComment && (
            <span
              onClick={() => handleAddComment(post?._id)}
              className="bg-blue-700 text-white cursor-pointer rounded-full px-2 py-1 mx-1"
            >
              Comment
            </span>
          )}
        </div>
      </div>
      {comments.map((comment) => (
        <div key={comment._id} className="p-2">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                src={
                  comment?.author?.profilePicture ||
                  'https://example.com/default-avatar.png'
                }
                alt={comment?.author?.username}
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
                const isRecent = now - updatedAt < 24 * 60 * 60 * 1000;
                return isRecent
                  ? formatDistanceToNow(updatedAt, { addSuffix: true })
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
                <FcLike size={20} onClick={() => handleDislike(comment._id)} />
              ) : (
                <GoHeart size={20} onClick={() => handleLike(comment._id)} />
              )}
              {comment?.likedBy?.length}
            </div>
            <button
              className="text-gray-600 dark:text-white text-xs px-4"
              onClick={() =>
                handleReplyClick(comment._id, comment?.author?.username)
              }
            >
              Reply
            </button>
          </div>

          <div className="ml-8 mt-4">
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
                      const isRecent = now - createdAt < 24 * 60 * 60 * 1000;
                      return isRecent
                        ? formatDistanceToNow(createdAt, { addSuffix: true })
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
                      onClick={() => handleReplyDislike(comment._id, reply._id)}
                    />
                  ) : (
                    <GoHeart
                      size={20}
                      onClick={() => handleReplyLike(comment._id, reply._id)}
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

    </div>
  );
};

export default Comment;
