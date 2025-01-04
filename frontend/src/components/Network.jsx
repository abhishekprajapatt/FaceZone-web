import React from 'react'
import { useSelector } from 'react-redux'
import {Link}  from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { AtSign } from 'lucide-react';

const Network = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    return (
        <div className='my-10 px-4'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>People you may know from FaceZone</h1>
            </div>
            {
                suggestedUsers.map((user) => {
                        return (
                        <div key={user._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/prof ile/${user?._id}`}>
                                <Avatar>
                                    <AvatarImage src={user?.profilePicture} alt="post_image" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                </Link>
                            <div>
                            <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
                        <span className='text-gray-600 text-sm flex'><AtSign size={15} className="mt-1" />{user?.username || 'username'}</span>
                        </div>
                    </div>
                    {/* <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span> */}
                </div>
                )
            })
        }
        </div>
    )
}

export default Network;