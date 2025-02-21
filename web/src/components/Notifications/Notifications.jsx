import { ArrowLeft, AtSign } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';
import Users from '../Profile/Users';

const Notifications = () => {
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
  const { suggestedUsers } = useSelector((store) => store.auth);

  return (
    <div className="bg-white dark:bg-black w-full h-screen">
      <div className=" fixed top-0 bg-gray-50 dark:bg-black dark:text-white w-full px-2 py-4 flex gap-4 text-xl text-center font-bold font-serif border-b dark:border-gray-900">
        <Link to="/">
          <ArrowLeft />
        </Link>
        Notifications
      </div>
      <div className="px-4 my-16">
        <h1 className="font-semibold text-md text-gray-600">Today</h1>
        {likeNotification?.map((notification) => {
          return (
            <div
              key={notification.userId}
              className="flex items-center gap-2 my-2"
            >
              <Link to={`/profile/${notification?.userId}`}>
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={
                      notification?.userDetails?.profilePicture ||
                      'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <p className="text-sm">
                <Link
                  to={`/profile/${notification?.userId}`}
                  className="font-bold"
                >
                  {notification?.userDetails?.username || 'abhishekprajapatt'}
                </Link>{' '}
                liked your post
              </p>
            </div>
          );
        })}
      <div className="mb-12 px-4">
        <h1 className="font-semibold text-md text-gray-600">
          Suggested for you
        </h1>
        <Users/>
        {/* {suggestedUsers?.map((user) => {
          return (
            <div
              key={user._id}
              className="flex items-center justify-between my-5"
            >
              <div className="flex items-center gap-6">
                <Link to={`/profile/${user?._id}`}>
                  <Avatar className="w-14 h-14">
                    <AvatarImage
                      src={
                        user?.profilePicture ||
                        'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
                      }
                      alt="post_image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <h1 className="font-semibold text-sm">
                    <Link to={`/profile/${user?._id}`}>
                      {user?.username || 'abhishekprajapatt'}
                    </Link>
                  </h1>
                  <span className="text-gray-400 text-xs">
                    {`${user?.bio?.slice(0, 35) || 'Software Engineer'}...`}
                  </span>
                </div>
              </div>
                <Button className="rounded-full">ZoneUp</Button>
            </div>
          );
        })} */}
      </div>
      </div>
    </div>
  );
};

export default Notifications;
