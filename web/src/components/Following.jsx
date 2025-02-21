import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFollowing } from '../redux/slices/followSlice';

const Following = ({ userId }) => {
  const dispatch = useDispatch();
  const { following, loading, error } = useSelector((state) => state?.follow);

  useEffect(() => {
    dispatch(fetchFollowing(userId));
  }, [dispatch, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Following</h1>
      {following.map((follow) => (
        <div key={follow.id}>
          <img src={follow.profilePicture} alt={follow.username} />
          <p>{follow.name}</p>
          <p>@{follow.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Following;
