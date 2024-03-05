import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoList from './VideoList';
import WatchLaterList from './WatchLaterList';
import '../css/YouTubeSearch.css'; 
import '../css/styles.css'
import { useHistory } from 'react-router-dom';

const YouTubeSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watchLater, setWatchLater] = useState([]); 
  const history = useHistory();

  useEffect(() => {
    if (props.redirectTo) {
      history.push(props.redirectTo);
    }
  }, [props.redirectTo]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 5,
          key: 'AIzaSyAXH5lUmmCYKufSNdfmWPD4nGyY2bSZF_Y',
          q: searchTerm,
        },
      });

      setVideos(response.data.items);
    } catch (error) {
      console.error('Erro ao buscar vídeos do YouTube:', error);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(selectedVideo === video ? null : video);
  };

  const handleAddToWatchLater = (video) => {
    setWatchLater([...watchLater, video]); 
  };

  const handleRemoveFromWatchLater = (videoToRemove) => {
    const updatedList = watchLater.filter((video) => video.id.videoId !== videoToRemove.id.videoId);
    setWatchLater(updatedList);
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o termo de pesquisa"
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      <VideoList
        videos={videos}
        selectedVideo={selectedVideo}
        handleVideoClick={handleVideoClick}
        handleAddToWatchLater={handleAddToWatchLater}
      />

      <WatchLaterList
        watchLaterVideos={watchLater}
        handleVideoClick={handleVideoClick}
        handleRemoveFromWatchLater={handleRemoveFromWatchLater}
      />
    </div>
  );
};

export default YouTubeSearch;
