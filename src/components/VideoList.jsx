import React from 'react';
import '../css/styles.css';

const VideoList = ({ videos, selectedVideo, handleVideoClick }) => {
  return (
    <div className="videos-container">
      {videos.map((video) => (
        <div key={video.id.videoId || video.id} className="video-item" onClick={() => handleVideoClick(video)}>
          <h2>{video.snippet.title}</h2>
          <div className="video-thumbnail">
            {selectedVideo === video ? (
              <iframe
                title={video.snippet.title}
                src={`https://www.youtube.com/embed/${video.id.videoId || video.id}`}
                allowFullScreen
                width="100%"
                height="315"
              ></iframe>
            ) : (
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
