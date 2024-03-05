//VideoItem.jsx
import React from 'react';
import ReactPlayer from 'react-player';
import WatchLaterButton from './WatchLaterButton'; 

const VideoItem = ({ video, selectedVideo, handleVideoClick }) => {
    return (
        <div className="video-item" onClick={() => handleVideoClick(video)}>
            <h2>{video.snippet.title}</h2>
            <div className="video-options">
                <WatchLaterButton video={video} />
            </div>
            {selectedVideo === video ? (
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    controls
                    width="100%"
                    height="70vh"
                    className="expanded-video"
                />
            ) : (
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            )}
        </div>
    );
};

export default VideoItem;
