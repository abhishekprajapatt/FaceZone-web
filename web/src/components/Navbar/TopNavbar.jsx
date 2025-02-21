import { BellRing, MessageSquareMore } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const navigate = useNavigate();
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
  return (
    <div>
      <div className="fixed top-0 border border-gray-200 shadow-sm shadow-gray-50 flex gap-2 bg-white dark:shadow-black dark:border-gray-800 dark:bg-black dark:text-white px-2 w-full">
        <h1 className="font-extrabold font-serif text-2xl my-2">FaceZone</h1>
        <div className="flex fixed top-4 right-2 gap-4">
          <>
            <BellRing onClick={() => navigate("/notifications")} />
            {likeNotification?.length > 0 && <p className="fixed right-11 px-1 text-white top-3 bg-blue-600 rounded-full text-xs">{likeNotification?.length}</p>}
          </>
          <MessageSquareMore onClick={() => navigate("/message")} />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
