import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFollowers } from '../redux/slices/followSlice';

const Followers = ({ userId }) => {
  const dispatch = useDispatch();
  const { followers, loading, error } = useSelector((state) => state.follow);

  useEffect(() => {
    dispatch(fetchFollowers(userId));
  }, [dispatch, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Followers</h1>
      {followers.map((follower) => (
        <div key={follower.id}>
          <img src={follower.profilePicture} alt={follower.username} />
          <p>{follower.name}</p>
          <p>@{follower.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Followers;
