import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';

const VideoPlayer = ({ videoUrl, captions }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      preload: 'auto',
      width: 640,
      height: 264,
    });

    player.src({ src: videoUrl, type: getVideoType(videoUrl) });

    if (captions.length > 0) {
      const track = player.addRemoteTextTrack({ kind: 'captions', language: 'en', label: 'English' }, false);
      const vtt = generateVtt(captions);
      const blob = new Blob([vtt], { type: 'text/vtt' });
      const url = URL.createObjectURL(blob);
      track.src = url;
      track.track.mode = 'showing';
    }

    player.on('error', () => {
      const error = player.error();
      console.error('VideoJS Error:', error);
      alert(`Error: ${error.message}`);
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [videoUrl, captions]);

  const getVideoType = (url) => {
    const ext = url.split('.').pop();
    if (ext === 'mp4') return 'video/mp4';
    if (ext === 'webm') return 'video/webm';
    if (ext === 'ogg') return 'video/ogg';
    return '';
  };

  const generateVtt = (captions) => {
    let vtt = "WEBVTT\n\n";
    captions.forEach(({ start, end, text }) => {
      vtt += `${start} --> ${end}\n${text}\n\n`;
    });
    return vtt;
  };

  const downloadVideo = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'video_with_captions.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin" />
      <button onClick={downloadVideo}>Download Video</button>
    </div>
  );
};

export default VideoPlayer;
