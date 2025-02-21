import {
  BellRing,
  CircleFadingPlus,
  Drama,
  Frown,
  Grid3x3,
  Heart,
  Home,
  LogOut,
  MessageCircle,
  MessageSquareMore,
  PlusSquare,
  Search,
  TrendingUp,
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const LeftSidebar = () => {
  const button = useRef()
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [iconOpen, setIconOpen] = useState(false);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
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

  // const sidebarHandler = (textType) => {
  //   if (textType === 'Logout') {
  //     logoutHandler();
  //   } else if (textType === 'Create') {
  //     setIconOpen(true);
  //   } else if (textType === 'Createp') {
  //     setIconOpen(true);
  //   } else if (textType === 'Profile') {
  //     navigate(`/profile/${user?._id}`);
  //   } else if (textType === 'Home') {
  //     navigate('/');
  //   } else if (textType === 'Messages') {
  //     navigate('/chat');
  //   } else if (textType === 'network') {
  //     navigate('/network');
  //   }
  // };
  // const sidebarItems = [
  //   { icon: <Home />, text: 'Home' },
  //   { icon: <MessageCircle />, text: 'Messages' },
  //   { icon: <Heart />, text: 'Notifications' },
  //   {
  //     icon: <PlusSquare className="hidden md:block" />,
  //     text: 'Create',
  //   },
  //   {
  //     icon: (
  //       <Avatar className="w-6 h-6">
  //         <AvatarImage src={user?.profilePicture} alt="@shadcn" />
  //         <AvatarFallback>CN</AvatarFallback>
  //       </Avatar>
  //     ),
  //     text: 'Profile',
  //   },
  //   { icon: <LogOut />, text: 'Logout' },
  // ];

  // Mobile
  // const MobilesidebarItems = [
  //   { icon: <Home />, text: 'Home' },
  //   // { icon: <MessageCircle />, text: 'Messages' },
  //   {
  //     icon: <PlusSquare className="md:block" />,
  //     text: 'Create',
  //   },
  //   { icon: <Drama size={28} />, text: 'network' },
  //   { icon: <Frown size={28} />, text: 'Logout' },
  //   {
  //     icon: (
  //       <Avatar className="w-6 h-6">
  //         <AvatarImage src={user?.profilePicture} alt="@shadcn" />
  //         <AvatarFallback>CN</AvatarFallback>
  //       </Avatar>
  //     ),
  //     text: 'Profile',
  //   },
  //   { icon: <LogOut />, text: 'Logout' },
  // ];

  return (
    <div>
      {/* Mobile */}
      <div className="flex shadow-lg shadow-gray-800 px-4 py-1 fixed bottom-0 gap-8 border-b border-gray-300 w-full h-[6%] bg-white md:max-w-60 md:h-full md:top-0 md:flex-col">
        <h1 className="font-bold text-blue-600 hidden md:block">FaceZone</h1>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4">
          <Home
            onClick={() => button}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Home</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer hidden md:block md:p-4">
          <MessageSquareMore
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Messages</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer hidden md:block md:p-4">
          <BellRing
            onClick={() => setIconOpen(true)}
            className="text-gray-600 hover:text-gray-800"
          /><h1 className="relative bottom-7 left-3 text-xs bg-blue-600 rounded-full w-fit h-4 text-white font-semibold px-1">5</h1>
          {likeNotification?.length > 0 && <>{likeNotification?.length}</>}
          <span className="hidden md:block">Notifications</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4">
          <PlusSquare
            onClick={() => setIconOpen(true)}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Create</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4">
          <Drama
            onClick={() => navigate('/network')}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">NetWork</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4">
          <Frown
            onClick={() => logoutHandler()}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Logout</span>
        </div>
        <div className="flex gap-2 bg-gray-50 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4">
          <Avatar
            onClick={() => navigate(`/profile/${user?._id}`)}
            className="w-6 h-6 text-gray-600 hover:text-gray-800"
          >
            <AvatarImage src={user?.profilePicture} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="hidden md:block">Profile</span>
        </div>
        <>
          {iconOpen && (
            <div className="bg-white flex flex-col gap-2 w-2/2 fixed bottom-16 ml-16  rounded-xl">
              <Link
                to="/create"
                className="flex gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl"
              >
                Post <Grid3x3 />
              </Link>
              <Link
                to="/"
                className="flex gap-2 hover:bg-gray-100 px-3 py-2 rounded-xl"
              >
                Story <CircleFadingPlus />
              </Link>
            </div>
          )}
        </>
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default LeftSidebar;

      // {/* Desktop */}
      //  <div className="hidden fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      //   <div className="flex flex-col">
      //     <h1 className="my-8 pl-3 font-bold text-xl text-blue-600 hidden md:block">
      //       FaceZone
      //     </h1>
      //     <h1 className="my-8 pl-3 font-bold text-xl text-blue-600 md:hidden">
      //       FZ
      //     </h1>
      //     {/* <>
      //       {open == true && (
      //         <div className="grid grid-cols-1 gap-2 bg-gray-100 rounded-xl text-center">
      //           <h1 className="hover:bg-gray-200 py-2 font-bold text-gray-800 cursor-pointer rounded-xl">Post</h1>
      //           <h1 className="hover:bg-gray-200 py-2 font-bold text-gray-800 cursor-pointer rounded-xl">Reels</h1>
      //         </div>
      //       )}
      //     </> */}
      //     <div>
      //       {sidebarItems.map((item, index) => {
      //         return (
      //           <div
      //             onClick={() => sidebarHandler(item.text)}
      //             key={index}
      //             className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
      //           >
      //             {item.icon}
      //             <span className="hidden xl:block">{item.text}</span>
      //             {item.text === 'Notifications' &&
      //               likeNotification.length > 0 && (
      //                 <Popover>
      //                   <PopoverTrigger asChild>
      //                     <Button
      //                       size="icon"
      //                       className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
      //                     >
      //                       {likeNotification.length}
      //                     </Button>
      //                   </PopoverTrigger>
      //                   <PopoverContent>
      //                     <div>
      //                       {likeNotification.length === 0 ? (
      //                         <p>No new notification</p>
      //                       ) : (
      //                         likeNotification.map((notification) => {
      //                           return (
      //                             <div
      //                               key={notification.userId}
      //                               className="flex items-center gap-2 my-2"
      //                             >
      //                               <Avatar>
      //                                 <AvatarImage
      //                                   src={
      //                                     notification.userDetails
      //                                       ?.profilePicture
      //                                   }
      //                                 />
      //                                 <AvatarFallback>CN</AvatarFallback>
      //                               </Avatar>
      //                               <p className="text-sm">
      //                                 <span className="font-bold">
      //                                   {notification.userDetails?.username}
      //                                 </span>{' '}
      //                                 liked your post
      //                               </p>
      //                             </div>
      //                           );
      //                         })
      //                       )}
      //                     </div>
      //                   </PopoverContent>
      //                 </Popover>
      //               )}
      //           </div>
      //         );
      //       })}
      //     </div>
      //   </div>
      //   {/* <CreatePost open={open} setOpen={setOpen} /> */}
      // </div> 