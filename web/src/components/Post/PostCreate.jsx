import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import {
  ArrowLeft,
  ChevronsRight,
  Images,
  Loader2,
  Music,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';
import crtPost from '../../assets/createPost.png';
import { Link, useNavigate } from 'react-router-dom';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef('');
  const audioRef = useRef('');
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [audioFile, setAudioFile] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [audioPreview, setAudioPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleFileChange = async (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setMediaPreview(dataUrl);
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
    if (mediaFile) formData.append('media', mediaFile); // Use 'media' for both images and videos

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
        navigate('/');
        toast.success(res.data.message);
        setMediaFile(null);
        setMediaPreview(null);
        setCaption('');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // const handleFileChange = async (e, type) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     if (type === 'image') {
  //       setImageFile(file);
  //       const dataUrl = await readFileAsDataURL(file);
  //       setImagePreview(dataUrl);
  //     }
  //   }
  // };

  // const createPostHandler = async () => {
  //   const formData = new FormData();
  //   formData.append('caption', caption);
  //   if (imageFile) formData.append('image', imageFile);

  //   try {
  //     setLoading(true);
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/addpost`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     if (res.data.success) {
  //       dispatch(setPosts([res.data.post, ...posts]));
  //       navigate('/');
  //       toast.success(res.data.message);
  //       setOpen(false);
  //     }
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="">
      <>
        {/* Mobile */}
        <div className="md:hidden fixed top-0 z-50 flex items-center justify-center bg-opacity-20">
          <div className="bg-white w-screen h-screen flex flex-col gap-4 dark:bg-black">
            <div className="flex gap-4 text-center font-bold font-serif p-1 dark:text-white">
              <Link to="/">
                <ArrowLeft />
              </Link>
              Create New Post
            </div>
            {mediaPreview || mediaFile ? (
              <>
                <div className="w-full flex flex-col items-center justify-center">
                  {mediaPreview &&
                    mediaFile &&
                    (mediaFile.type.startsWith('image/') ? (
                      <img
                        src={mediaPreview}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: '400px' }}
                      />
                    ) : mediaFile.type.startsWith('video/') ? (
                      <video
                        controls
                        style={{ maxWidth: '100%', maxHeight: '400px' }}
                      >
                        <source src={mediaPreview} type={mediaFile.type} />
                        Your browser does not support the video tag.
                      </video>
                    ) : null)}
                  {/* {audioPreview && (
                    <audio
                      src={audioPreview}
                      controls
                      className="object-cover h-full w-full"
                    />
                  )} */}

                  {/* deflaut  */}
                  {/* {imagePreview && (
                    <>
                      {imageFile && imageFile.type.startsWith('image/') ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="object-cover h-[20rem] w-full"
                        />
                      ) : (
                        <video
                          src={imagePreview} // Assuming imagePreview holds the video data URL
                          controls
                          className="object-cover h-[20rem] w-full"
                        />
                      )}
                    </>
                  )} */}
                </div>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full rounded-sm resize-none p-2 border-b border-gray-200 px-2"
                  placeholder="Write a caption or add a poll..."
                ></textarea>
                {audioPreview && (
                  <audio
                    src={audioPreview}
                    controls
                    className="object-cover w-full px-2"
                  />
                )}
                <div className="flex flex-col gap-2 px-4 w-full">
                  {!audioPreview && (
                    <button
                      onClick={() => audioRef?.current?.click()}
                      className="flex gap-2 bg-gray-50 p-1 rounded-xl"
                    >
                      <Music />
                      <span className="text-sm">Add music</span>
                      <ChevronsRight className="ml-36" />
                    </button>
                  )}
                  <button
                    onClick={() => imageRef?.current?.click()}
                    className="flex gap-2 bg-gray-50 p-1 rounded-xl"
                  >
                    <Images />
                    <span className="text-sm">Other Photo</span>
                    <ChevronsRight className="ml-32" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-12 my-10">
                <Avatar className=" w-28 h-28">
                  <AvatarImage
                    src={
                      'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
                    }
                  />

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <img
                  src={crtPost}
                  width={200}
                  onClick={() => imageRef}
                  alt="Select"
                  className="inline-block mr-2"
                />
                {/* <Button
                  onClick={() => imageRef?.current?.click()}
                  className="bg-blue-400 rounded-md py-2 px-20 font-bold"
                >
                  Choose Your Photo
                </Button> */}
              </div>
            )}
            {/* <input
              ref={imageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, 'image')}
            /> */}

            {/* deflaut  */}
            <input
              id="file"
              name="media"
              type="file"
              accept="image/*,video/*" // Accept both images and videos
              onChange={(e) =>
                handleFileChange(
                  e,
                  e.target.files[0].type.startsWith('image/')
                    ? 'image'
                    : 'video'
                )
              }
            />
            {mediaPreview || mediaFile ? (
              loading ? (
                <Button>
                  <Loader2 className="mr-2 w-full py-2 animate-spin text-black" />
                  Please wait
                </Button>
              ) : (
                <Button
                  onClick={createPostHandler}
                  type="submit"
                  variant="secondary"
                  className="bg-blue-500 text-white rounded-md py-2 mx-2"
                >
                  Post
                </Button>
              )
            ) : null}
          </div>
        </div>

        {/* Desktop */}
        {/* <div className="hidden md:block fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex gap-4 text-center font-bold font-serif text-white">
              <Link to={`/profile/${user?._id}`}>
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
              Select Your Media...
            </button>
            {imagePreview || audioPreview ? (
              <>
                <div className="w-full h-64 flex flex-col items-center justify-center mb-4">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-cover h-full w-full rounded-md"
                    />
                  )}
                  {audioPreview && (
                    <audio
                      src={audioPreview}
                      controls
                      className="object-cover h-full w-full rounded-md"
                    />
                  )}
                </div>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-700 text-white resize-none mb-4"
                  placeholder="Write a caption..."
                ></textarea>
              </>
            ) : null}
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, 'image')}
            />
            <input
              ref={audioRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, 'audio')}
            />
            <button
              onClick={() => imageRef.current.click()}
              className="hidden md:block w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 mb-4"
            >
              Select Media from Your Computer
            </button>

            {imagePreview || audioPreview ? (
              loading ? (
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
              )
            ) : null}
          </div>
        </div> */}
      </>
    </div>
  );
};

export default CreatePost;
