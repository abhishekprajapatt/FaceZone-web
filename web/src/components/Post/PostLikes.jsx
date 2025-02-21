import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { useSelector } from 'react-redux';
import { Badge } from '../ui/badge';
import { IoSearch } from 'react-icons/io5';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';

const PostLikes = ({ isLikesOpen, setIsLikesOpen, post }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [height, setHeight] = useState(450);
  const { user } = useSelector((state) => state.auth);

  const filteredLikes = post.likes.filter((likedUser) =>
    likedUser?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Bottom Sheet */}
      <motion.div
        drag="y"
        dragConstraints={{ top: -400, bottom: 0 }}
        onDragEnd={(event, info) => {
          if (info.velocity.y > 20 || info.point.y > 300) {
            setIsLikesOpen(false); // Close on slight downward drag
          } else {
            setHeight(info.point.y < 200 ? 400 : 250); // Adjust height dynamically
          }
        }}
        initial={{ y: 600 }}
        animate={{ y: isLikesOpen ? 0 : 600 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-4 z-20"
        style={{ height: `${height}px` }}
      >
        {/* Drag Handle */}
        <div className="bg-white">
          <div className="w-12 h-1 bg-gray-500 rounded-full mx-auto mb-2" />
          <p className="text-md font-bold text-center border-b">Likes</p>
        </div>
        {/* <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto mb-2"></div> */}

        {/* serach section */}
        <div className="px-2 my-2">
          <input
            type="text"
            placeholder={`${(<Search />)} Search...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border bg-gray-50 rounded px-2 py-1 w-full rounded-md text-sm"
          />
        </div>

        {/* Comments Section */}
        <div className="overflow-auto h-full">
          <div className="mt-2 space-y-3">
            {searchQuery ? (
              <>
                {filteredLikes.map((likedUser) => (
                  <>
                    {/* <div key={likedUser.id} className="flex gap-2 items-center">
                          <Avatar>
                            <AvatarImage
                              src={
                                likedUser.profilePicture ||
                                'https://example.com/default-avatar.png'
                              }
                              alt={likedUser.username || 'username'}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span className="font-bold text-sm">
                            {likedUser.username}
                          </span>
                          <h1 className="text-xs text-gray-500 dark:text-white">
                            {likedUser.bio}
                          </h1>
                        </div> */}

                    <div
                      key={likedUser.id}
                      className="flex items-center gap-2 px-2"
                    >
                      <img
                        src={
                          likedUser?.profilePicture ||
                          'https://cdn1.epicgames.com/offer/f696430be718494fac1d6542cfb22542/EGS_MarvelsSpiderManMilesMorales_InsomniacGamesNixxesSoftware_S1_2560x1440-a0518b9f9f36a05294e37448df8a27a0'
                        }
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h1 className="flex gap-12 font-semibold text-gray-800 dark:text-white">
                          {likedUser?.username}{' '}
                          {user?._id === post.author?._id && (
                            <Badge
                              variant="secondary"
                              className="text-xs font-thin"
                            >
                              Author
                            </Badge>
                          )}
                        </h1>
                        <h1 className="text-xs text-gray-400">
                          {`${likedUser?.bio?.slice(0, 25) || ''}...`}
                        </h1>
                      </div>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <>
                {post.likes.map((likedUser) => (
                  <>
                    {/* <div key={likedUser.id} className="flex gap-2 items-center">
                          <Avatar>
                            <AvatarImage
                              src={
                                likedUser.profilePicture ||
                                'https://example.com/default-avatar.png'
                              }
                              alt={likedUser.username || 'username'}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span className="font-bold text-sm">
                            {likedUser.username}
                          </span>
                          <h1 className="text-xs text-gray-500 dark:text-white">
                            {likedUser.bio}
                          </h1>
                        </div> */}

                    <div
                      key={likedUser.id}
                      className="flex items-center gap-2 px-2"
                    >
                      <img
                        src={
                          likedUser?.profilePicture ||
                          'https://cdn1.epicgames.com/offer/f696430be718494fac1d6542cfb22542/EGS_MarvelsSpiderManMilesMorales_InsomniacGamesNixxesSoftware_S1_2560x1440-a0518b9f9f36a05294e37448df8a27a0'
                        }
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h1 className="flex gap-8 font-semibold text-gray-800 dark:text-white">
                          {likedUser?.username}{' '}
                          {user?._id === post.author?._id && (
                            <>
                              <Badge
                                variant="outli"
                                className="text-xs font-thin"
                              >
                                Author
                              </Badge>
                            </>
                          )}
                          <Button variant="outline" size={30} className="rounded-xl p-1 text-xs">ZoneUp</Button>
                        </h1>
                        <h1 className="text-xs text-gray-400">
                          {`${likedUser?.bio?.slice(0, 25) || ''}...`}
                        </h1>
                      </div>
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PostLikes;
