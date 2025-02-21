import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Followers = ({ userId }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`/api/v1/user/${userId}/followers`);
        setFollowers(response.data.followers);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, [userId]);

  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>
            <img src={follower.profilePicture} alt={follower.name} />
            <span>{follower.name}</span>
            <span>{follower.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;