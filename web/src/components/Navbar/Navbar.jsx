import React, { useState } from 'react';
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
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import DarkMode from '@/DarkMode';

const Navbar = () => {
  const dispatch = useDispatch();
  // const [iconOpen, setIconOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
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
  return (
    <div>
      {/* Mobile */}
      <div className="flex bg-white dark:bg-black shadow-lg shadow-gray-800 px-4 py-1 fixed bottom-0 gap-8 border-t border-gray-300 dark:border-gray-800 dark:bg-black w-full h-[6%]  md:max-w-60 md:h-full md:top-0 md:flex-col">
        <h1 className="font-bold text-blue-600 hidden md:block">FaceZone</h1>
        <div className="flex gap-2 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4 dark:hover:bg-gray-900">
          <Home
            onClick={() => navigate('/')}
            className="text-gray-600"
          />
          <span className="hidden md:block">Home</span>
        </div>
        <div className="flex gap-2 hover:bg-gray-100 p-1 rounded-lg cursor-pointer hidden md:block md:p-4 dark:hover:bg-gray-900">
          <MessageSquareMore
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Messages</span>
        </div>
        <div className="flex gap-2  hover:bg-gray-100 p-1 rounded-lg cursor-pointer hidden md:block md:p-4 dark:hover:bg-gray-900">
          <BellRing
            onClick={() => navigate('/notifications')}
            className="text-gray-600 hover:text-gray-800"
          />
          {likeNotification?.length > 0 && (
            <h1 className="relative bottom-7 left-3 text-xs bg-blue-600 rounded-full w-fit h-4 text-white font-semibold px-1 dark:hover:bg-gray-900">
              {likeNotification?.length}
            </h1>
          )}
          <span className="hidden md:block">Notifications</span>
        </div>
        <div className="flex gap-2  hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4 dark:hover:bg-gray-900">
          <Search
            onClick={() => navigate('/search')}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">NetWork</span>
        </div>
        <div className="flex gap-2 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4 dark:hover:bg-gray-900">
          <PlusSquare
            onClick={() => navigate('/create')}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Create</span>
        </div>
        <div className="flex gap-2 hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4 dark:hover:bg-gray-900">
          <Frown
            onClick={() => logoutHandler()}
            className="text-gray-600 hover:text-gray-800"
          />
          <span className="hidden md:block">Logout</span>
        </div>
        <div className="flex gap-2  hover:bg-gray-100 p-1 rounded-lg cursor-pointer md:p-4 dark:hover:bg-gray-900">
          <Avatar
            onClick={() => navigate(`/profile/${user?._id}`)}
            className="w-6 h-6 text-gray-600 hover:text-gray-800"
          >
            <AvatarImage src={user?.profilePicture} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="hidden md:block">Profile</span>
        </div>
        {/* <>
          {iconOpen && (
            <div className="bg-gray-50 dark:bg-slate-600 flex flex-col gap-2 w-2/2 fixed bottom-12 ml-24  rounded-xl">
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
        </> */}
      </div>
    </div>
  );
};

export default Navbar;
