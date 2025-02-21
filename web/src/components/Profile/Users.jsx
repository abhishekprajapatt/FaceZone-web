import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSuggestedUsers } from '@/redux/authSlice';

const Users = ({ userId }) => {
  const [following, setFollowing] = useState([]);
  const { suggestedUsers } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFollowing = async ({userId}) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${userId}/following`);
        setFollowing(response.data.following);
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    };

    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/suggested`,
            { withCredentials: true }
          );
        dispatch(setSuggestedUsers(response.data.users)); // Update Redux store with suggested users
      } catch (error) {
        console.error('Error fetching suggested users:', error);
      }
    };

    fetchFollowing();
    fetchSuggestedUsers();
  }, [userId, dispatch]);

  const handleUnfollow = async (targetUserId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/unfollow/${targetUserId}`);
      setFollowing((prev) => prev.filter((user) => user.id !== targetUserId));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleFollow = async (targetUserId) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/follow/${targetUserId}`);
      const followedUser = suggestedUsers.find(
        (user) => user._id === targetUserId
      );
      if (followedUser) {
        setFollowing((prev) => [...prev, followedUser]);
        dispatch(
          setSuggestedUsers((prev) =>
            prev.filter((user) => user._id !== targetUserId)
          )
        ); // Update Redux store
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <div>
      <h2>Following</h2>
      <ul>
        {following?.map((followedUser) => (
          <li key={followedUser?.id}>
            <img src={followedUser?.profilePicture} alt={followedUser?.name} />
            <span>{followedUser?.name}</span>
            <span>{followedUser?.username}</span>
            <button onClick={() => handleUnfollow(followedUser?.id)}>
              Unfollow
            </button>
          </li>
        ))}
      </ul>

      <h2>Suggested Users</h2>
      <ul>
     
        { !user?._id && suggestedUsers?.map((suggestedUser) => (
          <li key={suggestedUser?._id}>
            <img
              src={suggestedUser?.profilePicture}
              alt={suggestedUser?.name}
            />
            <span>{suggestedUser?.name}</span>
            <span>{suggestedUser?.username}</span>
            <button onClick={() => handleFollow(suggestedUser?._id)}>
              Follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
