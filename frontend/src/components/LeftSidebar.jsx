import {
    Drama,
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        'https://socialmedia-bk8h.onrender.com/api/v1/user/logout',
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === 'Create') {
      setOpen(true);
    } else if (textType === 'Profile') {
      navigate(`/profile/${user?._id}`);
    } else if (textType === 'Home') {
      navigate('/');
    } else if (textType === 'Messages') {
      navigate('/chat');
    }else if (textType === 'network') {
      navigate('/network');
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: 'Home' },
    { icon: <MessageCircle />, text: 'Messages' },
    { icon: <Heart />, text: 'Notifications' },
    { icon: <PlusSquare />, text: 'Create' },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: 'Profile',
    },
    { icon: <LogOut />, text: 'Logout' },
  ];
  return (
    <div>
        <div className="hidden sm:block fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
          <div className="flex flex-col">
            <h1 className="my-8 pl-3 font-bold text-xl text-blue-600 hidden md:block">
              FaceZone
            </h1>
            <h1 className="my-8 pl-3 font-bold text-xl text-blue-600 md:hidden">
              FZ
            </h1>
            <div>
              {sidebarItems.map((item, index) => {
                return (
                  <div
                    onClick={() => sidebarHandler(item.text)}
                    key={index}
                    className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
                  >
                    {item.icon}
                    <span className="hidden xl:block">{item.text}</span>
                    {item.text === 'Notifications' &&
                      likeNotification.length > 0 && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              size="icon"
                              className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                            >
                              {likeNotification.length}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div>
                              {likeNotification.length === 0 ? (
                                <p>No new notification</p>
                              ) : (
                                likeNotification.map((notification) => {
                                  return (
                                    <div
                                      key={notification.userId}
                                      className="flex items-center gap-2 my-2"
                                    >
                                      <Avatar>
                                        <AvatarImage
                                          src={
                                            notification.userDetails?.profilePicture
                                          }
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                      </Avatar>
                                      <p className="text-sm">
                                        <span className="font-bold">
                                          {notification.userDetails?.username}
                                        </span>{' '}
                                        liked your post
                                      </p>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
    
          <CreatePost open={open} setOpen={setOpen} />
        </div>
        <MobileLeftSidebar user={user} sidebarHandler={sidebarHandler} likeNotification={likeNotification} setOpen={setOpen} open={open} />
    </div>
  );
};

export default LeftSidebar;

const MobileLeftSidebar = ({user, sidebarHandler, likeNotification, setOpen, open}) => {
    const sidebarItems = [
        { icon: <Home size={32} />, text: 'Home' },
        { icon: <PlusSquare size={32} />, text: 'Create' },
        { icon: <Drama size={32} />, text: 'network' },
        { icon: <LogOut size={32} />, text: 'Logout' },
        {
            icon: (
                <Avatar className="w-10 h-10">
              <AvatarImage src={user?.profilePicture} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ),
          text: 'Profile',
        },
        // { icon: <Heart />, text: 'Notifications' },
        // { icon: <MessageCircle />, text: 'Messages' },
      ];
  return (
    <div className="sm:hidden ">
      <div className="flex">
        <div className='grid grid-cols-5 px-4 py-2 fixed bottom-0 gap-6 border-b border-gray-300 w-full h-[6%] bg-white'>
          {sidebarItems.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex flex-row items-center gap- relative hover:bg-gray-100 cursor-pointer rounded-lg"
              >
                {item.icon}
                <span className="hidden xl:block">{item.text}</span>
                {item.text === 'Notifications' &&
                  likeNotification.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                        >
                          {likeNotification.length}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div>
                          {likeNotification.length === 0 ? (
                            <p>No new notification</p>
                          ) : (
                            likeNotification.map((notification) => {
                              return (
                                <div
                                  key={notification.userId}
                                  className="flex items-center gap-2 my-2"
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={
                                        notification.userDetails?.profilePicture
                                      }
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm">
                                    <span className="font-bold">
                                      {notification.userDetails?.username}
                                    </span>{' '}
                                    liked your post
                                  </p>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
              </div>
            );
          })}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  )
};
