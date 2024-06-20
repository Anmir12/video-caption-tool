import React, { useState } from 'react';

const VideoLoader = ({ setVideoUrl }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleLoadVideo = () => {
    if (isValidUrl(url)) {
      setError('');
      setVideoUrl(url);
    } else {
      setError('Invalid video URL. Please enter a valid URL.');
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div>
      <label htmlFor="video-url">Video URL:</label>
      <input
        type="text"
        id="video-url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter video URL"
      />
      <button onClick={handleLoadVideo}>Load Video</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VideoLoader;
