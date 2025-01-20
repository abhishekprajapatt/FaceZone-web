import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle, UserPlus } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  console.log(user);

  const displayedPost =
    activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div>
      <div className="hidden sm:block flex max-w-5xl justify-center mx-auto md:pl-10">
        <div className="flex flex-col gap-12 sm:gap-20 py-8 px-4">
          <div className="grid grid-cols-2 ml-[-3rem] sm:ml-auto">
            <section className="flex items-center justify-center mt-[-4rem] sm:mt-auto ">
              <Avatar className="w-24 h-24 sm:h-32 sm:w-32">
                <AvatarImage
                  src={
                    userProfile?.profilePicture ||
                    'https://i.pinimg.com/474x/07/cf/97/07cf97356d99cb99415c8ad31cc417bf.jpg'
                  }
                  alt="profilephoto"
                />
                <AvatarFallback><img src="https://i.pinimg.com/474x/07/cf/97/07cf97356d99cb99415c8ad31cc417bf.jpg" alt="" className="" /></AvatarFallback>
              </Avatar>
            </section>
            <section>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <span className="md:hidden font-serif fixed left-8">
                    {userProfile?.username}
                  </span>
                  <div className="hidden sm:block">
                    {isLoggedInUserProfile ? (
                      <>
                        <Link to="/account/edit">
                          <Button
                            variant="secondary"
                            className="hover:bg-gray-200 h-8"
                          >
                            Edit profile
                          </Button>
                        </Link>
                        <Button
                          variant="secondary"
                          className="hover:bg-gray-200 h-8"
                        >
                          View archive
                        </Button>
                        <Button
                          variant="secondary"
                          className="hover:bg-gray-200 h-8"
                        >
                          Ad tools
                        </Button>
                      </>
                    ) : isFollowing ? (
                      <>
                        <Button variant="secondary" className="h-8">
                          Unfollow
                        </Button>
                        <Button variant="secondary" className="h-8">
                          Message
                        </Button>
                      </>
                    ) : (
                      <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8">
                        Follow
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-[-1.5rem] sm:ml-auto">
                  <p>
                    <span className="font-semibold">
                      {userProfile?.posts?.length}{' '}
                    </span>
                    posts
                  </p>
                  <p>
                    <span className="font-semibold">
                      {userProfile?.followers?.length}{' '}
                    </span>
                    followers
                  </p>
                  <p>
                    <span className="font-semibold">
                      {userProfile?.following?.length}{' '}
                    </span>
                    following
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold w-1/2">
                    {userProfile?.name || ''}
                  </span>
                  <span className="font-semibold w-1/2">
                    {userProfile?.bio || 'Add Bio...'}
                  </span>
                  <Badge className="w-fit">
                    <AtSign />{' '}
                    <span className="pl-1">{userProfile?.username}</span>{' '}
                  </Badge>
                </div>
                <div className="sm:hidden flex items-center gap-2 ml-[-2rem]">
                  {isLoggedInUserProfile ? (
                    <>
                      <Link to="/account/edit">
                        <Button
                          variant="secondary"
                          className="hover:bg-gray-200 h-8 text-xs"
                        >
                          Edit profile
                        </Button>
                      </Link>
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8 text-xs"
                      >
                        View archive
                      </Button>
                    </>
                  ) : isFollowing ? (
                    <>
                      <Button variant="secondary" className="h-8">
                        Unfollow
                      </Button>
                      <Button variant="secondary" className="h-8">
                        Message
                      </Button>
                    </>
                  ) : (
                    <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8">
                      Follow
                    </Button>
                  )}
                </div>
              </div>
            </section>
          </div>
          <div className="border-t border-t-gray-200">
            <div className="flex items-center justify-center gap-10 text-sm">
              <span
                className={`py-3 cursor-pointer ${
                  activeTab === 'posts' ? 'font-bold' : ''
                }`}
                onClick={() => handleTabChange('posts')}
              >
                POSTS
              </span>
              <span
                className={`py-3 cursor-pointer ${
                  activeTab === 'saved' ? 'font-bold' : ''
                }`}
                onClick={() => handleTabChange('saved')}
              >
                SAVED
              </span>
              <span className="py-3 cursor-pointer">REELS</span>
              <span className="py-3 cursor-pointer">TAGS</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {displayedPost?.map((post) => {
                return (
                  <div
                    key={post?._id}
                    className="relative group cursor-pointer"
                  >
                    <img
                      src={post.image}
                      alt="postimage"
                      className="rounded-sm my-2 w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-white space-x-4">
                        <button className="flex items-center gap-2 hover:text-gray-300">
                          <Heart />
                          <span>{post?.likes?.length}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-gray-300">
                          <MessageCircle />
                          <span>{post?.comments?.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <MobileProfile
        userProfile={userProfile}
        isLoggedInUserProfile={isLoggedInUserProfile}
        isFollowing={isFollowing}
        activeTab={activeTab}
        displayedPost={displayedPost}
      />
    </div>
  );
};

const MobileProfile = ({
  userProfile,
  isLoggedInUserProfile,
  isFollowing,
  activeTab,
  displayedPost,
}) => (
  <div className="md:hidden bg-gradient-to-t from-[#f0a bdc] to-[#88a ae5]">
    <div className="py-2">
      <h1 className="w-fit flex font-bold px-2">
        <AtSign className="w-4" />
        <span className="mt-[-0.2rem]"> {userProfile?.username}</span>{' '}
      </h1>
      <div className="grid grid-cols-1">
        <img 
          src= {userProfile?.bannerPicture || "https://www.google.com/url?sa=i&url=https%3A%2F%2F4kwallpapers.com%2Fgames%2Fmarvels-spider-man-2-playstation-5-2021-games-1585.html&psig=AOvVaw14yr1qrth9KFezzKxzbWbZ&ust=1737495296409000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCy69WghYsDFQAAAAAdAAAAABAR"}
          alt="img"
          className="w-full h-20"
        />
        <div className="flex gap-2 px-2">
          <Avatar className="w-28 h-28 border border-2 border-gray-500 mt-[-3rem]">
            <AvatarImage
              src={
                userProfile?.profilePicture ||
                "https://i.pinimg.com/474x/07/cf/97/07cf97356d99cb99415c8ad31cc417bf.jpg"
              }
              alt="profilephoto"
            />
            <AvatarFallback><img src="https://i.pinimg.com/474x/07/cf/97/07cf97356d99cb99415c8ad31cc417bf.jpg" alt="" className="" /></AvatarFallback>
          </Avatar>
          <div className="grid grid-cols-3 gap-2 my-2">
            <h1 className="font-bold font-serif text-sm">
              {userProfile?.posts?.length}
              <h1>posts</h1>
            </h1>
            <h1 className="font-bold font-serif text-sm">
              {userProfile?.followers?.length}
              <h1>followers</h1>
            </h1>
            <h1 className="font-bold font-serif text-sm">
              {userProfile?.following?.length}
              <h1>following</h1>
            </h1>
          </div>
        </div>
      </div>
        <div className="flex flex-col gap-5 px-2">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold font-sans">
              {userProfile?.name || ''}
            </h1>
            <h1 className="text-gray-600 font-mono text-xs flex"><h1>Birthday: </h1>{userProfile?.birthday?.slice(0, 10)?.split('-')?.reverse()?.join('-')  || ''}</h1>
            <h1 className="w-1/2 text-sm font-semibold">
              {userProfile?.bio?.slice(0, 160)?.match(/.{1,30}/g)?.slice(0, 20)?.join('\n') || ''}
            </h1>
          </div>
          <div className="">
            {isLoggedInUserProfile ? (
              <div className="flex gap-2">
                <Link to="/account/edit">
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/account/edit')}
                    className="font-semibold px-8"
                  >
                    Edit profile
                  </Button>
                </Link>
                <Button variant="secondary" className="font-semibold px-8">
                  Message
                </Button>
                <Button variant="secondary" className="w-fit font-semibold">
                  <UserPlus />
                </Button>
              </div>
            ) : isFollowing ? (
              <>
                <Button variant="secondary" className="h-8">
                  Unfollow
                </Button>
                <Button variant="secondary" className="h-8">
                  Message
                </Button>
              </>
            ) : (
              <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8">
                Follow
              </Button>
            )}
          </div>
        </div>
    </div>
    <div className="border-t border-t-gray-200">
      <div className="flex items-center justify-center gap-10 text-sm">
        <span
          className={`py-3 cursor-pointer ${
            activeTab === 'posts' ? 'font-bold' : ''
          }`}
          onClick={() => handleTabChange('posts')}
        >
          POSTS
        </span>
        <span
          className={`py-3 cursor-pointer ${
            activeTab === 'saved' ? 'font-bold' : ''
          }`}
          onClick={() => handleTabChange('saved')}
        >
          SAVED
        </span>
        {/* <span className="py-3 cursor-pointer">REELS</span> */}
        {/* <span className="py-3 cursor-pointer">TAGS</span> */}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {displayedPost?.map((post) => {
          return (
            <div key={post?._id} className="relative group cursor-pointer">
              <img
                src={post.image}
                alt="postimage"
                className="rounded-sm w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center text-white space-x-4">
                  <button className="flex items-center gap-2 hover:text-gray-300">
                    <Heart />
                    <span>{post?.likes?.length}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-gray-300">
                    <MessageCircle />
                    <span>{post?.comments?.length}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default Profile;