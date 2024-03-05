//WatchLaterList.jsx
import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';

const WatchLaterList = ({ watchLaterVideos, handleRemoveFromWatchLater }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleList = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="watch-later-videos">
      <button onClick={toggleList} className="expand-button">
        {isExpanded ? <FaClock /> : <FaClock />} Vídeos para assistir mais tarde
      </button>
      {isExpanded && (
        <>
          <h2></h2>
          {watchLaterVideos.map((video) => (
            <div key={video.id.videoId} className="watch-later-item">
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
              <div>
                <h3>{video.snippet.title}</h3>
                <button onClick={(e) => { e.stopPropagation(); handleRemoveFromWatchLater(video); }}>Remover</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default WatchLaterList;
