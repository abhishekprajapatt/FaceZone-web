import { useEffect } from 'react';
// import ChatPage from './components/ChatPage';
import EditProfile from './components/Profile/EditProfile';
import Home from './components/Home';
import Login from './components/Login';
import MainLayout from './components/LayOut/MainLayOut';
import Profile from './components/Profile/UserProfile';
import Signup from './components/Signup';
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/chatSlice';
import { setLikeNotification } from './redux/rtnSlice';
import ProtectedRoutes from './components/ProtectedRoutes';
import SuggestedUsers from './components/SuggestedUsers';
import Network from './components/Network';
import MobileCreatePost from './components/MobileCreatePost';
import AllUserPost from './components/AllUserPost';
import AllSongs from './components/AllSong';
import CreatePost from './components/Post/PostCreate';
import { ThemeProvider } from './components/ThemeProvider';
import Notifications from './components/Notifications/Notifications';
import MessagePage from './components/Message/MessagePage';
import PostComment from './components/Post/PostComment';
import UserProfile from './components/Profile/UserProfile';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/profile/:id',
        element: (
          <ProtectedRoutes>
            {' '}
            <UserProfile />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/Create',
        element: (
          <ProtectedRoutes>
            {' '}
            <CreatePost />.
          </ProtectedRoutes>
        ),
      },
      {
        path: '/notifications',
        element: (
          <ProtectedRoutes>
            {' '}
            <Notifications />
          </ProtectedRoutes>
        ),
      },
      // {
      //   path: '/profile/:id',
      //   element: (
      //     <ProtectedRoutes>
      //       {' '}
      //       <CreatePost />
      //     </ProtectedRoutes>
      //   ),
      // },
      {
        path: '/account/edit',
        element: (
          <ProtectedRoutes>
            <EditProfile />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/message',
        element: (
          <ProtectedRoutes>
            <MessagePage />
          </ProtectedRoutes>
        ),
      },
      // {
      //   path: '/suggest',
      //   element: (
      //     <ProtectedRoutes>
      //       <SuggestedUsers />
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: '/network',
      //   element: (
      //     <ProtectedRoutes>
      //       <Network />
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: '/songs',
      //   element: (
      //     <ProtectedRoutes>
      //       <AllSongs />
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: '/create',
      //   element: (
      //     <ProtectedRoutes>
      //       {/* <CreatePost/> */}
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: '/alluserpost',
      //   element: (
      //     <ProtectedRoutes>
      //       <AllUserPost />
      //     </ProtectedRoutes>
      //   ),
      // },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

function App() {
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io(`${import.meta.env.VITE_BACKEND_URL}`, {
        query: {
          userId: user?._id,
        },
        transports: ['websocket'],
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={browserRouter} />
      </ThemeProvider>
    </>
  );
}

export default App;
