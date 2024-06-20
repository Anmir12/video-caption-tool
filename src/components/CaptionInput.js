import React, { useState } from 'react';

const CaptionInput = ({ setCaptions }) => {
  const [captionsText, setCaptionsText] = useState('');
  const [timestamps, setTimestamps] = useState('');
  const [savedCaptions, setSavedCaptions] = useState([]);
  const [error, setError] = useState('');

  const sampleCaptionsText = `Hello, welcome to our video.
In this video, we will show you how to add captions.
First, you need to enter the video URL.
Next, you add your captions and timestamps.
Finally, you can view your video with the added captions.`;

  const sampleTimestamps = `00:00-00:05,00:06-00:10,00:11-00:15,00:16-00:20,00:21-00:25`;

  const handleAddCaptions = () => {
    const captionsArray = sampleCaptionsText.split('\n');
    const timestampsArray = sampleTimestamps.split(',');

    if (captionsArray.length !== timestampsArray.length) {
      setError('The number of captions and timestamps must be equal.');
      return;
    }

    try {
      const formattedCaptions = captionsArray.map((caption, index) => {
        const [start, end] = timestampsArray[index].split('-');
        if (!start || !end) {
          throw new Error('Invalid timestamp format.');
        }
        return { start, end, text: caption };
      });
      setError('');
      setCaptions(formattedCaptions);
      setSavedCaptions(formattedCaptions);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleLoadSavedCaptions = () => {
    setCaptions(savedCaptions);
  };

  return (
    <div>
      <label htmlFor="captions">Captions:</label>
      <textarea
        id="captions"
        value={captionsText}
        onChange={(e) => setCaptionsText(e.target.value)}
        placeholder="Enter captions"
      ></textarea>
      <label htmlFor="timestamps">Timestamps (format: start-end):</label>
      <input
        type="text"
        id="timestamps"
        value={timestamps}
        onChange={(e) => setTimestamps(e.target.value)}
        placeholder="00:00-00:05,00:10-00:15"
      />
      <button onClick={handleAddCaptions}>Add Captions</button>
      <button onClick={handleLoadSavedCaptions}>Load Saved Captions</button>
      {error && <p className="error">{error}</p>}
      <div className="caption-preview">
        <h3>Caption Preview:</h3>
        {sampleCaptionsText.split('\n').map((caption, index) => (
          <p key={index}>{caption}</p>
        ))}
      </div>
    </div>
  );
};

export default CaptionInput;
