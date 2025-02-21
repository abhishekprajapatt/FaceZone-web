import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Status = () => {
  const { userProfile} = useSelector(store => store.auth);
  const { suggestedUsers } = useSelector(store => store.auth);

  return (
    <div className="flex items-center justify-center gap-4">
      <Link to={`/profile/${userProfile?._id}`} className='flex-col items-center justify-center border-4 w-20 h-20 border-[#23384e] rounded-full'>
        <Avatar className='h-16 w-16 m-1'>
          <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className='text-gray-600 text-sm font-serif' >{userProfile?.username.length[10]}...</p>
      </Link>
      <div>{
        suggestedUsers.map((user) => {
          return (
            <div key={user._id} className='flex items-center justify-between my-5'>
              <Link to={`/profile/${user?._id}`} className='flex-col items-center justify-center border-4 w-20 h-20 border-[#23384e] rounded-full'>
                <Avatar className='h-16 w-16 m-1'>
                  <AvatarImage src={user?.profilePicture} alt="profilephoto" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className='text-gray-600 text-sm font-serif' >{user?.username.length[10]}...</p>
              </Link>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Status;