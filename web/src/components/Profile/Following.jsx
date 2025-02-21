import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Following = ({ userId }) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`/api/v1/user/${userId}/following`);
        setFollowing(response.data.following);
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    };

    fetchFollowing();
  }, [userId]);

  const handleUnfollow = async (targetUserId) => {
    try {
      await axios.delete(`/api/v1/user/unfollow/${targetUserId}`);
      setFollowing((prev) => prev.filter((user) => user.id !== targetUserId));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div>
      <h2>Following</h2>
      <ul>
        {following.map((followedUser ) => (
          <li key={followedUser.id}>
            <img src={followedUser.profilePicture} alt={followedUser.name} />
            <span>{followedUser.name}</span>
            <span>{followedUser.username}</span>
            <button onClick={() => handleUnfollow(followedUser.id)}>Unfollow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Following;