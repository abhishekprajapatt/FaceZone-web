import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { IoArrowRedoOutline } from 'react-icons/io5';
import {
  Bookmark,
  Forward,
  Heart,
  MessageSquareText,
  MoreHorizontal,
  ThumbsUp,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import Comment from '../Comment/Comment';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { FcLike } from 'react-icons/fc';
import { GoHeart } from 'react-icons/go';

import { motion } from 'framer-motion';
import PostComment from './PostComment';
import PostLikes from './PostLikes';

const Post = ({ post, isLoading }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  const [isOpen, setIsOpen] = useState(false);
  const [isLikesOpen, setIsLikesOpen] = useState(false);
  const [height, setHeight] = useState(100);

  const [text, setText] = useState('');
  const [openComment, setOpenComment] = useState(false);
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isLoading) return <Loading />;
  }, [isLoading]);

  const handleTextChange = (e) => setText(e.target.value.trim());
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  const updatePosts = (updatedPosts) => {
    dispatch(setPosts(updatedPosts));
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post._id}/${action}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        const updatedPosts = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [
                      ...p.likes,
                      {
                        id: res.data.user._id,
                        username: res.data.user.username,
                        profilePicture: res.data.user.profilePicture,
                        bio: res.data.user.bio,
                      },
                      user._id,
                    ],
              }
            : p
        );
        updatePosts(updatedPosts);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const commentHandler = async () => {
    if (!text) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedComments = [...comment, res.data.comment];
        setComment(updatedComments);

        const updatedPosts = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedComments } : p
        );
        updatePosts(updatedPosts);
        toast.success(res.data.message);
        setText('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/delete/${post._id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedPosts = posts.filter((p) => p._id !== post._id);
        updatePosts(updatedPosts);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error deleting post');
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post._id}/bookmark`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const currentComment = comment.slice(0, 3).map((c) => c.author);
  const firstUser = comment[0]?.author;

  // console.log('comment', comment);
  console.log('post', posts);
  return (
    <div className="border border-gray-200 md:my-8 w-full md:max-w-xl md:mx-auto py-2 rounded-sm md:rounded-lg bg-gray-50 dark:border-gray-800 dark:bg-black dark:text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-2">
          <img
            src={
              post.author?.profilePicture ||
              'https://cdn1.epicgames.com/offer/f696430be718494fac1d6542cfb22542/EGS_MarvelsSpiderManMilesMorales_InsomniacGamesNixxesSoftware_S1_2560x1440-a0518b9f9f36a05294e37448df8a27a0'
            }
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="flex gap-6 font-bold text-gray-800 dark:text-white">
              {post.author?.username}{' '}
              {user?._id === post.author?._id && (
                <Badge variant="secondary" className="text-xs font-thin">
                  Author
                </Badge>
              )}
            </h1>
            <h1 className="text-xs text-gray-400">
              {post.author?.bio?.slice(0, 35)}...
            </h1>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer mx-2" />
          </DialogTrigger>
          <DialogContent className="text-white flex flex-col items-center text-sm text-center">
            {post.author?._id !== user?._id && (
              <Button
                variant="ghost"
                className="w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
            )}
            <Button variant="ghost" className="w-fit">
              Add to favorites
            </Button>
            {user?._id === post.author?._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="w-fit text-blue-600"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      {/* {post?.media && (
        <img
          src={post?.media}
          alt="Post content"
          className="rounded-sm my-2 w-full aspect-square object-cover"
        />
      )}
      {post?.media && (
        <video
          src={post?.media}
          controls
          loop
          alt="post content"
          className="rounded-sm my-2 w-full aspect-square object-cover"
        />
      )} */}
      {post?.media && (
        <div className="rounded-sm my-2 w-full aspect-square">
          {post?.media.includes('jpg') ||
          post?.media.includes('png') ||
          post?.media.includes('jpeg') ? (
            <img src={post?.media} alt="Post content" className="object-cover" />
          ) : (
            <video
              src={post?.media}
              loop
              controls
              alt="post content"
              className="rounded-sm my-2 w-full aspect-square object-cover"
            />
          )}
        </div>
      )}

      <div className="flex items-center justify-between my-2 px-2">
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {liked ? (
              <FcLike onClick={likeOrDislikeHandler} size={25} />
            ) : (
              <GoHeart onClick={likeOrDislikeHandler} size={25} />
            )}
            {/* <FcLike
              onClick={likeOrDislikeHandler}
              size={liked ? 25 : 20}
              className={`cursor-pointer ${
                liked
                  ? 'bg-blue-500 text-white rounded-full py-1'
                  : 'hover:text-gray-600'
              }`}
            /> */}
            <button
              onClick={() => setIsLikesOpen(true)}
              className="font-serif dark:text-gray-200 text-xl "
            >
              {postLike > 0 && postLike}
            </button>
            {isLikesOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                onClick={() => setIsLikesOpen(false)}
              ></div>
            )}
            <PostLikes
              setIsLikesOpen={setIsLikesOpen}
              isLikesOpen={isLikesOpen}
              post={post}
            />
          </div>
          <div className="flex gap-1">
            <MessageSquareText
              onClick={() => {
                dispatch(setSelectedPost(post));
                setIsOpen(true);
              }}
              size={25}
              className="cursor-pointer hover:text-gray-600 mt-1"
            />

            <h1 className="font-serif dark:text-gray-200 text-xl">
              {comment.length > 0 && comment.length}
            </h1>
            {isOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                onClick={() => setIsOpen(false)}
              ></div>
            )}
          </div>
          <IoArrowRedoOutline
            size={25}
            className="cursor-pointer hover:text-gray-600"
          />
        </div>
        <Bookmark
          onClick={bookmarkHandler}
          size={25}
          className="cursor-pointer hover:text-gray-600"
        />
      </div>

      <span className="font-medium block mb-2 px-2">
        <div className="flex">
          {currentComment?.map((c, idx) => (
            <img
              key={idx}
              src={
                c.profilePicture ||
                'https://cdn1.epicgames.com/offer/f696430be718494fac1d6542cfb22542/EGS_MarvelsSpiderManMilesMorales_InsomniacGamesNixxesSoftware_S1_2560x1440-a0518b9f9f36a05294e37448df8a27a0'
              }
              alt="Commenter avatar"
              className="w-6 h-6 rounded-full mx-[-0.3rem]"
            />
          ))}
          {comment?.length > 0 && (
            <span
              onClick={() => {
                dispatch(setSelectedPost(post));
                setOpenComment(true);
              }}
              className="font-sans text-gray-800 dark:text-white px-2"
            >
              Comment by {firstUser?.username}{' '}
              {comment.length > 1 && `and ${comment.length - 1} others`}
            </span>
          )}
        </div>
      </span>

      <div className="px-2">
        {post?.caption?.length > 40 ? (
          isExpanded ? (
            <>
              <span className="font-bold mr-1">{post.author?.username}</span>
              <span className="text-xs">{post.caption}</span>
              <span
                onClick={toggleExpansion}
                className="text-gray-600 text-sm underline cursor-pointer mx-1"
              >
                Less
              </span>
            </>
          ) : (
            <>
              <span className="font-bold mr-1">{post.author?.username}</span>
              <span className="text-sm">{post.caption.slice(0, 30)}...</span>
              <span
                onClick={toggleExpansion}
                className="text-gray-600 text-sm underline cursor-pointer mx-1"
              >
                More
              </span>
            </>
          )
        ) : (
          <>
            <span className="font-bold mr-1">{post.author?.username}</span>
            <span className="text-sm">{post.caption}</span>
          </>
        )}
        <h1 className="text-xs text-gray-500 dark:text-gray-200 py-2">
          {(() => {
            if (!post?.createdAtDate) return '';
            const createdAt = parseISO(post.createdAtDate);
            const now = new Date();
            const isRecent = now - createdAt < 24 * 60 * 60 * 1000;
            return isRecent
              ? formatDistanceToNow(createdAt, { addSuffix: true })
              : post.createdAtDate.slice(0, 10).split('-').reverse().join('-');
          })()}
        </h1>
      </div>
      {/* <div className="flex items-center justify-between px-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={handleTextChange}
            className="outline-none text-sm w-full py-2 px-4 rounded-full border border-gray-200"
          />
          {text && (
            <span
              onClick={() => {
                commentHandler();
                setOpenComment(true);
              }}
              className="bg-blue-700 text-white cursor-pointer rounded-full px-2 py-1 mx-1"
            >
              Comment
            </span>
          )}
        </div> */}
      <div className="px-2">
        <PostComment post={post} isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* {openComment && <Comment key={comment?._id} post={post} setIsOpen={setIsOpen} isOpen={isOpen} />} */}
      </div>
    </div>
  );
};

export default Post;

const PostLiks = ({ post, likes }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Comments
      </button> */}

      {/* Backdrop
      {isOpen && (
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
        <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto mb-2"></div>

        {/* Comments Section */}
        <div className="overflow-auto h-full">
          <p className="text-lg font-semibold">Comments</p>
          <div className="mt-2 space-y-3">
            <ul>
              {post.likes.map((likedUser) => (
                <li key={likedUser.id}>
                  <img
                    src={likedUser.profilePicture}
                    alt={likedUser.username}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{likedUser.username}</span>
                  <span>{likedUser.bio}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Loading = () => (
  <div className="md:my-8 w-full md:max-w-xl max-w-md md:mx-auto my-20">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 px-2">
        <div className="rounded-full w-12 h-12 bg-gray-200 animate-pulse" />
        <div className="flex flex-col gap-1">
          <div className="bg-gray-200 animate-pulse w-20 h-4 rounded-full" />
          <div className="bg-gray-200 animate-pulse w-28 h-3 rounded-full" />
        </div>
      </div>
      <div className="bg-gray-200 animate-pulse w-6 h-6 rounded-full" />
    </div>
    <div className="mt-4 w-full bg-gray-200 animate-pulse h-64 rounded-lg" />
    <div className="flex items-center justify-between mt-4 px-2">
      <div className="flex items-center gap-3">
        <div className="bg-gray-200 animate-pulse w-6 h-6 rounded-full" />
        <div className="bg-gray-200 animate-pulse w-8 h-4 rounded-full" />
        <div className="bg-gray-200 animate-pulse w-6 h-6 rounded-full" />
        <div className="bg-gray-200 animate-pulse w-8 h-4 rounded-full" />
        <div className="bg-gray-200 animate-pulse w-6 h-6 rounded-full" />
      </div>
      <div className="bg-gray-200 animate-pulse w-6 h-6 rounded-full" />
    </div>
  </div>
);
