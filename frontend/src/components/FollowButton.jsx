import React, { useState } from 'react';

const CommentsSection = ({ open }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'John Doe',
      profile: 'J',
      text: 'This is an amazing feature!',
    },
    { id: 2, user: 'Jane Smith', profile: 'JS', text: 'Wow, I love the UI!' },
    {
      id: 3,
      user: 'Abhishek P.',
      profile: 'AP',
      text: 'Tailwind CSS is awesome!',
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newEntry = {
        id: comments.length + 1,
        user: 'Anonymous', // Default user name
        profile: 'A', // Default profile icon
        text: newComment,
      };
      setComments([...comments, newEntry]);
      setNewComment('');
    }
  };

  return (
    <>
      {open && (
        <div className="flex flex-col items-center w-[18rem] max-w-md mx-auto mt-5 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          {/* Comments List */}
          <div className="w-full h-72 overflow-y-scroll bg-white rounded-md shadow-inner p-2">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start gap-3 p-2 border-b last:border-none"
              >
                {/* User Profile */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                  {comment.profile}
                </div>

                {/* Comment Text */}
                <div className="flex-1">
                  <p className="text-sm font-medium">{comment.user}</p>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Section */}
          <div className="w-full mt-4">
            <textarea
              className="w-full h-20 p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              className="w-full mt-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsSection;
