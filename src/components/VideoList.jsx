//VideoList.jsx
import React from 'react';

const VideoList = ({ videos, selectedVideo, handleVideoClick, handleAddToWatchLater }) => {
  return (
    <div className="videos-container">
      {videos.map((video) => (
        <div key={video.id.videoId} className="video-item" onClick={() => handleVideoClick(video)}>
          <h2>{video.snippet.title}</h2>
          <div className="video-options">
            <button onClick={(e) => { e.stopPropagation(); handleAddToWatchLater(video); }}>
              Assistir mais tarde
            </button>
          </div>
          {selectedVideo === video ? (
            <iframe
              title={video.snippet.title}
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              allowFullScreen
              width="100%"
              height="315"
            ></iframe>
          ) : (
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoList;
