import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';
import { Card } from './ui/card';

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePhoto: file });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    console.log(input);
    const formData = new FormData();
    formData.append('bio', input.bio);
    formData.append('gender', input.gender);
    if (input.profilePhoto) {
      formData.append('profilePhoto', input.profilePhoto);
    }
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
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture,
          gender: res.data.user.gender,
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.messasge);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <Card className="flex max-w-2xl mx-auto pl-10 my-10 p-8 rounded-2xl">
        <section className="flex flex-col gap-6 w-full my-8">
          <h1 className="font-bold text-xl">Edit Profile</h1>
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="post_image" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-sm">{user?.username}</h1>
                <span className="text-gray-600">
                  {user?.bio || 'Bio here...'}
                </span>
              </div>
            </div>
            <input
              ref={imageRef}
              onChange={fileChangeHandler}
              type="file"
              className="hidden"
            />
            <Button
              onClick={() => imageRef?.current.click()}
              className="bg-[#0095F6] h-8 hover:bg-[#318bc7]"
            >
              Change photo
            </Button>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-2">Bio</h1>
            <Textarea
              value={input.bio}
              onChange={(e) => setInput({ ...input, bio: e.target.value })}
              name="bio"
              className="focus-visible:ring-transparent"
            />
          </div>
          <div>
            <h1 className="font-bold text-xl mb-2">Gender</h1>
            <Select
              defaultValue={input.gender}
              onValueChange={selectChangeHandler}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem className="text-md text-gray-800 font-medium" value="male">Male</SelectItem>
                  <SelectItem className="text-md text-gray-800 font-medium" value="female">Female</SelectItem>
                  <SelectItem className="text-md text-gray-800 font-medium" value="custom">Custom</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            {loading ? (
              <Button className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={editProfileHandler}
                className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]"
              >
                Submit
              </Button>
            )}
          </div>
        </section>
      </Card>
      <div className="flex items-center justify-center gap-6 my-1 text-sm text-gray-600">
        <p className="">Meta</p>
        <p className="">Blog</p>
        <p className="">Jobs</p>
        <p className="">Help</p>
        <p className="">API</p>
        <p className="">Privacy</p>
        <p className="">Terms</p>
        <p className="">Locations</p>
        <p className="">Instgram Lite</p>
        <p className="">Threads</p>
      </div>
      <div className="flex my-1 items-center justify-center gap-4 text-sm text-gray-600">
        <p className="">Contact Uploading & Non-Users</p>
        <p className="">Meta Verified</p>
      </div>
      <p className="text-sm my-4 text-center text-gray-600"> © 2024 Instagram from Meta</p>
    </div>
  );
};

export default EditProfile;
