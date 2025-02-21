import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowLeft, Menu, MessageCircleCode, X } from 'lucide-react';
import Messages from './Message';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';
// import { Link } from 'react-router-dom';
// import { Card } from './ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const MessagePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [textMessage, setTextMessage] = useState('');
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex ml-[16%] h-screen ">
      <button
        onClick={toggleSidebar}
        className="p-2 text-white rounded-md z-50"
      >
        {isOpen ? (
          <X
            size={24}
            className="fixed top-2 left-1 p-1 bg-slate-300 rounded-md"
          />
        ) : (
          <Menu
            size={24}
            className="fixed top-2 left-1 p-1 bg-slate-300 rounded-md"
          />
        )}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100  transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-40`}
      >
        <h1 className="flex font-bold font-serif text-gray-800 px-16 my-2 text-xl">
          <Link to="/" className="fixed left-8">
            <ArrowLeft />
          </Link>
          Messages
        </h1>
        <section className="w-full md:w-1/4 my-8">
          <div className="flex p-2">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={
                  user?.profilePicture ||
                  'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="p-2">
              <Link to={`/profile/${user?._id}`} className="font-bold text-md">
                {user?.username || 'abhishekprajapatt'}
              </Link>
              <p className="text-gray-400 text-xs">
                {`${user?.bio?.slice(0, 35) || 'Software Engineer'}...`}
              </p>
            </h1>
          </div>
          <hr className="border-gray-300" />
          <ScrollArea className=" rounded-md borderoverflow-y-auto h-[80vh]">
            {suggestedUsers?.map((suggestedUser) => {
              const isOnline = onlineUsers.includes(suggestedUser?._id);
              return (
                <div
                  onClick={() => dispatch(setSelectedUser(suggestedUser))}
                  className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <Avatar className="w-14 h-14">
                    <AvatarImage
                      src={
                        suggestedUser?.profilePicture ||
                        'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {suggestedUser?.username || 'abhishekprajapatt'}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isOnline ? 'text-green-600' : 'text-red-600'
                      } `}
                    >
                      {isOnline ? 'online' : 'offline'}
                    </span>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </section>
        {selectedUser ? (
          <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
            <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
              <Avatar>
                <AvatarImage
                  src={
                    selectedUser?.profilePicture ||
                    'https://th.bing.com/th/id/OIP.YxvEw4Wl6-91Y0v8ntxuMwHaEK?rs=1&pid=ImgDetMain'
                  }
                  alt="profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{selectedUser?.username || 'abhishekprajapatt'}</span>
              </div>
            </div>
            <Messages selectedUser={selectedUser} />
            <div className="flex items-center p-4 border-t border-t-gray-300">
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                className="flex-1 mr-2 focus-visible:ring-transparent"
                placeholder="Messages..."
              />
              <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
                Send
              </Button>
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center mx-auto">
            <MessageCircleCode className="w-32 h-32 my-4" />
            <h1 className="font-medium">Your messages</h1>
            <span>Send a message to start a chat.</span>
          </div>
        )}
      </div>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </div>
  );
};

export default MessagePage;
