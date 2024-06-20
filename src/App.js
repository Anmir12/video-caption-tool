import React, { useState } from 'react';
import VideoLoader from './components/VideoLoader';
import CaptionInput from './components/CaptionInput';
import VideoPlayer from './components/VideoPlayer';
import 'video.js/dist/video-js.css';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState([]);

  return (
    <div className="App">
      <h1>Video Caption Tool</h1>
      <VideoLoader setVideoUrl={setVideoUrl} />
      <CaptionInput setCaptions={setCaptions} />
      {videoUrl && <VideoPlayer videoUrl={videoUrl} captions={captions} />}
    </div>
  );
}

export default App;
