import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import {
  Bookmark,
  Forward,
  MessageCircle,
  MessageSquareText,
  MoreHorizontal,
  Send,
  ThumbsUp,
} from 'lucide-react';
import { Button } from './ui/button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import CommentDialog from './CommentDialog';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

const Post = ({ post, isLoading }) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post?.likes?.length);
  const [comment, setComment] = useState(post.comments);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText('');
    }
  };

  console.log(post.author)
  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post._id}/${action}`,
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoading) return <Loading />;
  }, [isLoading]);

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/delete/${post?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.messsage);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post?._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  console.log('comment ', comment);
  console.log('like ', postLike);
  return (
    <div className="border border-gray-200 md:my-8 w-full md:max-w-xl md:mx-auto my-12 py-2 rounded-sm md:rounded-lg bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-2">
          <Avatar>
            <AvatarImage
              src={post.author?.profilePicture}
              alt="post_image"
              className=""
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            <div className="">
              <h1 className="font-bold font-sans text-gray-800">{post.author?.username}</h1>
              <h1 className="text-xs text-gray-400">{post.author?.bio.slice(0,28)}</h1>
            </div>
            {user?._id === post.author._id && (
              <Badge variant="secondary">Author</Badge>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer mx-2 sm:mx-auto" />
          </DialogTrigger>
          <DialogContent className="text-white flex flex-col items-center text-sm text-center">
            {post?.author?._id !== user?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
            )}

            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorites
            </Button>
            {user && user?._id === post?.author._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="cursor-pointer w-fit text-blue-600"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={post.image}
        alt="post_img"
      />
      <div className="flex items-center justify-between my-2 px-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <>
              <ThumbsUp
                onClick={likeOrDislikeHandler}
                size={'24'}
                className="cursor-pointer text-blue-600"
              />
              <span className="font-bold">
                {' '}
                {postLike > 0 && <>{postLike}</>}
              </span>
            </>
          ) : (
            <>
              <ThumbsUp
                onClick={likeOrDislikeHandler}
                size={'22px'}
                className="cursor-pointer hover:text-gray-600"
              />
              <span className="font-bold">
                {' '}
                {postLike > 0 && <>{postLike}</>}
              </span>
            </>
          )}
          <>
            <MessageSquareText
              onClick={() => {
                dispatch(setSelectedPost(post));
                setOpen(true);
              }}
              className="cursor-pointer hover:text-gray-600"
            />{' '}
            <span className="font-bold">
              {comment?.length > 0 && <>{comment?.length}</>}
            </span>
          </>
          <Forward className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark
          onClick={bookmarkHandler}
          className="cursor-pointer hover:text-gray-600"
        />
      </div>
      <span className="font-medium block mb-2 px-2">
        Comment by {comment?.author?.username} and {comment?.length} others
      </span>
      <div className="px-2">
        {post?.caption?.length > 30 ? (
          isExpanded ? (
            <>
              <span className="font-medium font-extrabold mr-1">
                {post?.author?.username}
              </span>
              <span className="text-sm">{post?.caption}</span>
              <span
                onClick={toggleExpansion}
                className="text-gray-600 cursor-pointer mx-1 cursor-pointer text-sm underline"
              >
                Less
              </span>
            </>
          ) : (
            <>
              <span className="font-medium font-extrabold mr-1">
                {post?.author?.username}
              </span>
              <span className="text-sm">{post?.caption.slice(0, 30)}...</span>
              <span
                onClick={toggleExpansion}
                className="text-gray-600 text-sm cursor-pointer mx-1 cursor-pointer underline"
              >
                more
              </span>
            </>
          )
        ) : (
          <>
            <span className="font-medium font-extrabold mr-1">
              {post?.author?.username}
            </span>
            <span className="text-sm">{post?.caption}</span>
          </>
        )}
      </div>
      {/* <span>{`${post?.author?.username}`}</span> */}
      {/* <span>{`${post?.caption.slice(0, 30)}...`}}</span> */}
      {/* {post?.caption} */}
      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-gray-400 px-2"
        >
          View all {comment?.length} comments
        </span>
      )}
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between px-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-xs w-full p-1 px-2 rounded-xl border border-gray-200"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="bg-blue-700 font-mono text-white cursor-pointer rounded-full px-2 mx-1"
          >
            Comment
          </span>
        )}
      </div>
    </div>
  );
};

const Loading = () => (
  <div className="md:my-8 w-full md:max-w-xl max-w-md md:mx-auto my-20">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 px-2 md:px-0">
        <Avatar>
          <Skeleton className="w-10 h-10 rounded-full" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <MoreHorizontal className="cursor-pointer mx-2 sm:mx-auto" />
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center text-sm text-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32 mt-2" />
        </DialogContent>
      </Dialog>
    </div>
    <Skeleton className="rounded-sm my-2 w-full aspect-square" />
    <div className="flex items-center justify-between my-2 px-2 md:px-0">
      <div className="flex items-center gap-3">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
      <Skeleton className="w-6 h-6 rounded-full" />
    </div>
    <Skeleton className="h-4 w-16 mb-2 px-2 md:px-0" />
    <Skeleton className="h-4 w-full px-2 md:px-0" />
    <Skeleton className="h-3 w-40 px-2 md:px-0 mt-1" />
    <div className="flex items-center justify-between px-2 md:px-0 mt-3">
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-8 w-12 rounded-md ml-2" />
    </div>
  </div>
);
export default Post;
