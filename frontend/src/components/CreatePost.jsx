import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { ArrowLeft, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';
import crtPost from '../assets/createPost.png';
import { Link } from 'react-router-dom';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef('');
  const [file, setFile] = useState('');
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append('caption', caption);
    if (imagePreview) formData.append('image', file);
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/addpost`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="">
    //   <Dialog open={open}>
    //     <DialogContent onInteractOutside={() => setOpen(false)}>
    //       <DialogHeader className='text-center font-semibold text-white'>Create New Post</DialogHeader>
    //       <div className='flex gap-3 items-center'>
    //         <Avatar>
    //           <AvatarImage src={user?.profilePicture} alt="img" />
    //           <AvatarFallback>CN</AvatarFallback>
    //         </Avatar>
    //         <div>
    //           <h1 className='font-semibold text-xs text-gray-200'>{user?.username}</h1>
    //           <span className='text-gray-400 font-thin text-xs'>@{user?.username}</span>
    //         </div>
    //       </div>
    //       <Button variant="ghost" onClick={() => imageRef.current.click()} className='md:hidden w-fit'><img src={crtPost} width={50}/><span className="text-white">Select Your pic...</span></Button>
    //       {/* <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." /> */}
    //       {
    //         imagePreview && (<>
    //           <div className='w-full h-64 flex items-center justify-center'>
    //             <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
    //           </div>
    //           <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none text-white" placeholder="Write a caption..." />
    //         </>
    //         )
    //       }
    //       <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
    //       <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] hidden md:block '>Select Pic from Your Computer</Button>

    //       {
    //         imagePreview && (
    //           loading ? (
    //             <Button>
    //               <Loader2 className='mr-2 h-4 w-4 animate-spin' />
    //               Please wait
    //             </Button>
    //           ) : (
    //             <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
    //           )
    //         )
    //       }
    //     </DialogContent>
    //   </Dialog>
    // </div>
    <div className="">
      {open && (
        <>
          {/* Mobile */}
          <div className="md:hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 rounded-lg p-6 w-96">
              <div className="flex gap-4 text-center font-bold font-serif text-white">
                <X />
                Create New Post
              </div>
              <div className="flex gap-3 items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {user?.profilePicture ? (
                    <img
                      src={user?.profilePicture}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      CN
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="font-semibold text-xs text-gray-200">
                    {user?.username}
                  </h1>
                  <span className="text-gray-400 font-thin text-xs">
                    {`${user?.bio?.slice(0, 30)}...`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => imageRef?.current?.click()}
                className="block md:hidden w-full text-white bg-blue-500 rounded-md py-2 mb-4"
              >
                <img
                  src={crtPost}
                  width={50}
                  alt="Select"
                  className="inline-block mr-2"
                />
                Select Your Pic...
              </button>
              {imagePreview && (
                <>
                  <div className="w-full h-64 flex items-center justify-center mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover h-full w-full rounded-md"
                    />
                  </div>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-700 text-white resize-none mb-4"
                    placeholder="Write a caption..."
                  ></textarea>
                </>
              )}
              <input
                ref={imageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={fileChangeHandler}
              />
              <button
                onClick={() => imageRef.current.click()}
                className="hidden md:block w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 mb-4"
              >
                Select Pic from Your Computer
              </button>

              {imagePreview &&
                (loading ? (
                  <Button>
                    <Loader2 className="mr-2 w-full py-2 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    onClick={createPostHandler}
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2"
                  >
                    Post
                  </Button>
                ))}
            </div>
          </div>
          {/* Desktop */}
          <div className="hidden md:block fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 rounded-lg p-6 w-96">
              <div className="flex gap-4 text-center font-bold font-serif text-white">
                <Link to={`/profile/${user?._id}`}>
                  {' '}
                  <ArrowLeft />
                </Link>
                Create New Post
              </div>
              <div className="flex gap-3 items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {user?.profilePicture ? (
                    <img
                      src={user?.profilePicture}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      CN
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="font-semibold text-xs text-gray-200">
                    {user?.username}
                  </h1>
                  <span className="text-gray-400 font-thin text-xs">
                    {user?.bio}
                  </span>
                </div>
              </div>

              <button
                onClick={() => imageRef?.current?.click()}
                className="block md:hidden w-full text-white bg-blue-500 rounded-md py-2 mb-4"
              >
                <img
                  src={crtPost}
                  width={50}
                  alt="Select"
                  className="inline-block mr-2"
                />
                Select Your Pic...
              </button>
              {imagePreview && (
                <>
                  <div className="w-full h-64 flex items-center justify-center mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover h-full w-full rounded-md"
                    />
                  </div>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-700 text-white resize-none mb-4"
                    placeholder="Write a caption..."
                  ></textarea>
                </>
              )}
              <input
                ref={imageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={fileChangeHandler}
              />
              <button
                onClick={() => imageRef.current.click()}
                className="hidden md:block w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 mb-4"
              >
                Select Pic from Your Computer
              </button>

              {imagePreview &&
                (loading ? (
                  <Button>
                    <Loader2 className="mr-2 w-full py-2 text-blue-600 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    onClick={createPostHandler}
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2"
                  >
                    Post
                  </Button>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CreatePost;
