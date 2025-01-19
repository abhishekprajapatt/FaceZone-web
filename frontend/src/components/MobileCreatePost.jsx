import React, { useEffect, useRef, useState } from 'react';

const InstagramCreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [caption, setCaption] = useState('');
  const imageInputRef = useRef(null);
  const songInputRef = useRef(null);

  // Automatically open the phone's gallery when the page loads
  useEffect(() => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const handleSongChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedSong(file.name);
    }
  };

  const handlePost = () => {
    if (selectedImage || selectedSong) {
      alert('Post Created Successfully!');
    } else {
      alert('Please select an image or song!');
    }
  };

  return (
    <div className="create-post-container p-4 max-w-lg mx-auto bg-gray-800 text-white rounded-lg">
      <h2 className="text-center font-semibold mb-4">Create New Post</h2>

      {/* Hidden file input for image selection */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {selectedImage ? (
        <div className="mb-4">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
      ) : (
        <p className="text-center text-gray-400 mb-4">
          Please select an image from your gallery.
        </p>
      )}

      <div className="mb-4">
        <button
          onClick={() => songInputRef.current.click()}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
        >
          Select Song from Phone Files
        </button>
        {/* Hidden file input for song selection */}
        <input
          ref={songInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleSongChange}
        />
      </div>

      {selectedSong && (
        <p className="text-sm mb-4 text-gray-300">
          Selected Song: <span className="font-semibold">{selectedSong}</span>
        </p>
      )}

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write a caption..."
        className="w-full p-2 rounded-md bg-gray-700 text-white mb-4"
      ></textarea>

      <button
        onClick={handlePost}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md"
      >
        Post
      </button>
    </div>
  );
};

export default InstagramCreatePost;
