import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ArrowLeft, Volume2, VolumeOff } from 'lucide-react';

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [playingSong, setPlayingSong] = useState(null);
  const audioRefs = useRef({});

  const clientId = 'dacade3701884c079fc1d68541d0b16b';
  const clientSecret = '1abf3fa436764f73801986134ea08721';

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
          }
        );
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: searchTerm || 'top hits',
            type: 'track',
            limit: 50,
          },
        });
        setSongs(response.data.tracks.items);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, [accessToken, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const togglePlay = (songId, previewUrl) => {
    if (playingSong === songId) {
      audioRefs.current[songId].pause();
      setPlayingSong(null);
    } else {
      if (playingSong && audioRefs.current[playingSong]) {
        audioRefs.current[playingSong].pause();
      }
      if (previewUrl && audioRefs.current[songId]) {
        audioRefs.current[songId].play();
        setPlayingSong(songId);
      }
    }
    console.log(songs.previewUrl);
  };



  return (
    <div className="min-h-screen">
      <div className="flex gap-1 fixed top-0 flex justify-center bg-slate-50 py-4 px-4">
        <ArrowLeft className="text-black" size={30} />
        <input
          type="text"
          placeholder="Search Music..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="outline-none text-sm bg-gray-50 w-[16rem] text-black py-1 px-2 rounded-lg border border-gray-200"
        />
      </div>
      {songs.length === 0 && (
        <p className="text-center text-black">Loading songs...</p>
      )}

      <div className="grid grid-cols-1 gap-6 relative top-16 mx-1">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex gap-4 border border-gray-50 rounded-lg shadow-lg transition-transform"
          >
            <img
              src={song.album.images[0]?.url}
              className="rounded-md w-16 h-16"
              alt="Song Cover"
            />
            <div className="w-[12rem]">
              <h3 className="font-bold text-sm text-black">{`${song.name.slice(
                0,
                25
              )}...`}</h3>
              <p className="text-sm text-gray-400">
                {`${song.artists
                  .map((artist) => artist.name)
                  .join(', ')
                  .slice(0, 30)}...`}
              </p>
            </div>
            <div className="relative left-0 top-5">
              {song.preview_url ? (
                <>
                  <audio
                    ref={(ref) => (audioRefs.current[song.id] = ref)}
                    src={song.preview_url}
                  />
                  {playingSong === song.id ? (
                    <VolumeOff
                      size={25}
                      className="cursor-pointer bg-slate-100 rounded-full p-0.5"
                      onClick={() => togglePlay(song.id, song.preview_url)}
                    />
                  ) : (
                    <Volume2
                      className="cursor-pointer bg-slate-100 rounded-full p-0.5"
                      onClick={() => togglePlay(song.id, song.preview_url)}
                    />
                  )}
                </>
              ) : (
                <VolumeOff
                  size={20}
                  className="text-gray-400 cursor-pointer bg-slate-100 rounded-full p-0.5"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSongs;

