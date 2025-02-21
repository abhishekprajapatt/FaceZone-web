import React from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const StatusSlide = () => {
    const { suggestedUsers } = useSelector(store => store.auth);

  const users = [
    {
      id: 1,
      image:
        'https://www.google.com/imgres?q=venom%20spider%20man&imgurl=https%3A%2F%2Fwww.redwolf.in%2Fimage%2Fcache%2Fcatalog%2Fartwork-Images%2Fmens%2FDigital%2Fspider-man-venom-split-t-shirt-india-artwork-500x667.jpg%3Fm%3D1711517175&imgrefurl=https%3A%2F%2Fwww.redwolf.in%2Fspider-man-venom-split-t-shirt-india&docid=dNVOBJKstQIcfM&tbnid=NxfX9paJnXnqEM&vet=12ahUKEwjIy4fBjZiLAxXzTGwGHTnyLTMQM3oECDEQAA..i&w=500&h=667&hcb=2&ved=2ahUKEwjIy4fBjZiLAxXzTGwGHTnyLTMQM3oECDEQAA',
      name: 'Your story',
    },
    {
      id: 2,
      image: 'path-to-palak-image',
      name: 'palak_tiwari2...',
    },
    {
      id: 3,
      image: 'path-to-buildwitharyan',
      name: 'buildwitharyan',
    },
    {
      id: 4,
      image: 'path-to-maxwell-image',
      name: 'maxwel_redd...',
    },
    {
      id: 5,
      image: 'path-to-maxwell-image',
      name: 'maxwel_redd...',
    },
    {
      id: 6,
      image: 'path-to-maxwell-image',
      name: 'maxwel_redd...',
    },
    {
      id: 7,
      image: 'path-to-maxwell-image',
      name: 'maxwel_redd...',
    },
    {
      id: 8,
      image: 'path-to-maxwell-image',
      name: 'maxwel_redd...',
    },
    {
      id: 9,
      image: 'path-to-maxwell-image',
      name: 'maxwel_redd...',
    },
  ];

  return (
    <>
      <ScrollArea className="w-[20rem]">
        <div className="flex w-max bg-whi te">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex flex-col items-center p-2">
              <Link to={`/profile/${user?._id}`}
                className="shrink-0 h-16 w-16 rounded-full border-2 border-blue-500 overflow-hidden"
              >
                <img
                  src={user?.profilePicture}
                  alt={user.name}
                  className="aspect-[3/4] h-fit w-fit object-cover"
                  width={0}
                  height={0}
                />
              </Link>
              <p className="text-xs text-center">{
                user?.name?.length > 10 ? `${user?.name?.slice(0,10)}...` : user?.name}</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default StatusSlide;

