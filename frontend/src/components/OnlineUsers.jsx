import React from 'react';
import Logo from '../assets/logo.png';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '@/redux/authSlice';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { BellRing, Heart, MessageSquareMore, MessageSquareText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const OnlineUser = () => {
  const navigate = useNavigate();
  const { suggestedUsers, selectedUser } = useSelector((store) => store.auth);
  const { onlineUsers } = useSelector((store) => store.chat);
  const dispatch = useDispatch();
  useEffect(() => { 
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

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
    }
  };

  const topItems = [
    { icon: <BellRing />, text: 'Notifications' },
    { icon: <MessageSquareMore />, text: 'Messages' },
  ];

  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );

  return (
    <div className="">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-sm hidden md:block"
      >
        <CarouselContent>
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <CarouselItem
                key={''}
                className="md:basis-1/2 lg:basis-1/3 bg-red-3 00"
              >
                {isOnline && (
                  <div className="p-1">
                    <Card className="rounded-full w-28 h-28">
                      <div
                        onClick={() => dispatch(setSelectedUser(suggestedUser))}
                        className=""
                      >
                        <Avatar className="hover:bg-gray-50 cursor-pointer w-28 h-28">
                          <AvatarImage
                            src={
                              suggestedUser?.profilePicture ||
                              'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
                            }
                          />

                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div
                          className={` font-bold mt-[-1.4rem] ml-[5rem] ${
                            isOnline
                              ? 'text-green-600 font-bold text-6xl'
                              : 'text-red-600 font-bold text-6xl'
                          } `}
                        >
                          {isOnline ? '°' : '°'}
                        </div>
                      </div>
                    </Card>
                    <span className="font-serif mx-6">
                      {suggestedUser?.username?.length[10]}
                    </span>
                  </div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="md:hidden fixed grid grid-cols-2 ">
        <div className="border border-gray-200 grid grid-cols-2 shadow-sm shadow-gray-50 gap-[3rem] fixed top-0 left-0 px-2 bg-white py-2 w-full">
          <h1 className="flex gap-2 font-extrabold text-2xl">
            <Link to="/" className="font-extrabold font-serif text-2xl my-2">
              FaceZone
            </Link>
          </h1>
          <div className="mx-2 my-2 fixed top-2 right-1">
            <div className="grid grid-cols-2 gap-4">
              {topItems.map((item, index) => {
                return (
                  <div
                    onClick={() => sidebarHandler(item.text)}
                    key={index}
                    className="flex flex-row items-center gap- relative hover:bg-gray-100 cursor-pointer rounded-lg"
                  >
                    {item.icon}
                    <span className="hidden">{item.text}</span>
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
                                            notification.userDetails
                                              ?.profilePicture
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
        </div>
        <div className="fixed left-4 top-14 bg-red-600">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-sm hidden md:block"
          >
            <CarouselContent>
              {suggestedUsers?.map((suggestedUser) => {
                const isOnline = onlineUsers?.includes(suggestedUser?._id);
                return (
                  <CarouselItem
                    key={''}
                    className="md:basis-1/2 lg:basis-1/3 bg-red-3 00"
                  >
                    {isOnline && (
                      <div className="p-1">
                        <Card className="">
                          <div
                            onClick={() =>
                              dispatch(setSelectedUser(suggestedUser))
                            }
                            className=""
                          >
                            <Avatar className="">
                              <AvatarImage
                                src={
                                  suggestedUser?.profilePicture ||
                                  'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
                                }
                              />

                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div
                              className={` font-bold mt-[-1.4rem] ml-[5rem] ${
                                isOnline
                                  ? 'text-green-600 font-bold text-6xl'
                                  : 'text-red-600 font-bold text-6xl'
                              } `}
                            >
                              {isOnline ? '°' : '°'}
                            </div>
                          </div>
                        </Card>
                        <span className="font-serif mx-6">
                          {suggestedUser?.username?.length[10]}
                        </span>
                      </div>
                    )}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default OnlineUser;
