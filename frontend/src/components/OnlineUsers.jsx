import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '@/redux/authSlice';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const OnlineUser = () => {
  const { suggestedUsers, selectedUser } = useSelector((store) => store.auth);
  const { onlineUsers } = useSelector((store) => store.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-sm"
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
                        <AvatarImage src={suggestedUser?.profilePicture || "https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain"} />

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
  );
};

export default OnlineUser;
