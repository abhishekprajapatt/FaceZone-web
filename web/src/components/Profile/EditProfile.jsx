import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import axios from 'axios';
import { ArrowLeft, Loader2, Pencil, PlusSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';
import { Card } from '../ui/card';

const EditProfile = () => {
  const profileImageRef = useRef();
  const bannerImageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    bannerPhoto: user?.bannerPicture,
    name: user?.name,
    bio: user?.bio,
    gender: user?.gender,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePhoto: file });
  };
  const bannerChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, bannerPhoto: file });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append('bio', input.bio);
    formData.append('name', input.name);
    formData.append('gender', input.gender);
    if (input.profilePhoto) {
      formData.append('profilePhoto', input.profilePhoto);
    }
    if (input.bannerPhoto) {
      formData.append('bannerPhoto', input.bannerPhoto);
    }
    console.log([...formData]);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile/edit`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedUserData = {
          ...user,
          name: res.data.user?.name,
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture,
          bannerPicture: res.data.user?.bannerPicture,
          gender: res.data.user.gender,
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
      console.log("form Data",formData);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.messasge);
    } finally {
      setLoading(false);
    }
  };
  console.log("Input Data",input);
  console.log("Profile Data",input.profilePhoto);
  console.log("Banner Data",input.bannerPhoto);
  return (
    <div className="fixed top-0 h-full dark:bg-black dark:text-white">
      <div className=" rounded-2xl">
        <h1 className="flex gap-2 font-bold text-xl bg-white dark:bg-black p-1">
          {' '}
          <ArrowLeft onClick={() => navigate(`/profile/${user?._id}`)} /> Edit
          Your Zone
        </h1>
        <div className="grid grid-cols-1">
          <div className="flex">
            <img
              src={
                user?.bannerPhoto ||
                'https://images.pexels.com/photos/30154480/pexels-photo-30154480/free-photo-of-dusk-at-the-beach-with-urban-skyline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              }
              alt=""
              className="w-full h-20"
            />
            <Pencil
              className="ml-[-2rem] my-2 w-fit text-blue-400"
              onClick={() => bannerImageRef?.current.click()}
            />
          </div>
          <div className="flex gap-[12rem] px-2">
            <Avatar
              className="w-28 h-28 border border-2 border-gray-500 mt-[-3rem]"
              onClick={() => profileImageRef?.current.click()}
            >
              <AvatarImage
                src={
                  user?.profilePhoto ||
                  'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
                }
                alt="profilephoto"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Pencil
              className="my-2 w-fit text-blue-800"
              onClick={() => profileImageRef?.current.click()}
            />
          </div>
        </div>
        <div className="">
          <input
            name="profilePhoto"
            type="file"
            ref={profileImageRef}
            accept="image/*"
            onChange={fileChangeHandler}
            className="hidden"
          />
          <Button
            onClick={() => profileImageRef?.current.click()}
            className="text-blue-600 text-sm"
            variant="ghost"
          >
            Change profile photo
          </Button>
        </div>
        <div className="">
          <input
            type="file"
            name="bannerPhoto"
            ref={bannerImageRef}
            accept="image/*"
            onChange={bannerChangeHandler}
            className="hidden"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="">
          <h1 className="font-bold mb-2">Name</h1>
          <input
            name="name"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            placeholder={user?.name || 'eg. Abhishek Prajapatt Kashyap'}
            className="w-[20rem] p-2 rounded-lg border border-gray-600 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <h1 className="font-bold mb-2">Bio</h1>
          <Textarea
            name="bio"
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            placeholder={user?.bio || 'eg. I am Smart Baby...'}
            className="w-[20rem] py-2 rounded-lg border text-sm border-gray-600 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <h1 className="font-bold mb-2">Gender</h1>
          <Select
            defaultValue={input.gender}
            onValueChange={selectChangeHandler}
          >
            <SelectTrigger className="w-[20rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="text-md font-medium " value="male">
                  Male
                </SelectItem>
                <SelectItem
                  className="text-md text-gray-800 font-medium"
                  value="female"
                >
                  Female
                </SelectItem>
                <SelectItem
                  className="text-md text-gray-800 font-medium"
                  value="custom"
                >
                  Custom
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-center my-4">
        {loading ? (
          <Button className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            onClick={editProfileHandler}
            className="bg-gradient-to-t from-red-600 to-pink-400 px-32 py-3 rounded-lg text-center text-white"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
