import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoList from './VideoList';
import { Link, useHistory } from 'react-router-dom'; 
import '../css/YouTubeSearch.css'; 
import '../css/styles.css';

const YouTubeSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [channelResults, setChannelResults] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]); 
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageToken, setPageToken] = useState('');
  const [channelPageToken, setChannelPageToken] = useState('');
  const [channelId, setChannelId] = useState(null); 
  const history = useHistory();

  useEffect(() => {
    if (props.redirectTo) {
      history.push(props.redirectTo);
    }

    loadPopularVideos();
  }, [props.redirectTo]);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (searchTerm) {
          loadMoreSearchResults();
        } else if (channelId) { 
          loadMoreChannelVideos();
        } else {
          loadMorePopularVideos();
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchTerm, videos, channelVideos, channelId]);

  const loadPopularVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 2,
          key: 'AIzaSyCorVC8klBItYQ_kJ-bSjCgDAzgC6X3o0g',
        },
      });

      setVideos(response.data.items || []);
      setPageToken(response.data.nextPageToken || '');
    } catch (error) {
      console.error('Erro ao carregar vídeos em alta:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePopularVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 2,
          key: 'AIzaSyCorVC8klBItYQ_kJ-bSjCgDAzgC6X3o0g',

          pageToken: pageToken,
        },
      });

      setVideos([...videos, ...response.data.items || []]);
      setPageToken(response.data.nextPageToken || '');
    } catch (error) {
      console.error('Erro ao carregar mais vídeos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreSearchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 2,
          key: 'AIzaSyCorVC8klBItYQ_kJ-bSjCgDAzgC6X3o0g',

          q: searchTerm,
          type: 'video',
          pageToken: pageToken,
        },
      });

      setVideos([...videos, ...response.data.items || []]);
      setPageToken(response.data.nextPageToken || '');
    } catch (error) {
      console.error('Erro ao carregar mais vídeos de pesquisa:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchChannels = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 3,
          key: 'AIzaSyCorVC8klBItYQ_kJ-bSjCgDAzgC6X3o0g',

          q: query,
          type: 'channel',
        },
      });

      setChannelResults(response.data.items || []);
    } catch (error) {
      console.error('Erro ao buscar canais do YouTube:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 2,
          key: 'AIzaSyCorVC8klBItYQ_kJ-bSjCgDAzgC6X3o0g',

          q: searchTerm,
          type: 'video',
        },
      });

      setVideos(videoResponse.data.items || []);
      setPageToken(videoResponse.data.nextPageToken || '');

      await searchChannels(searchTerm);
    } catch (error) {
      console.error('Erro ao buscar vídeos do YouTube:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleChannelClick = async (channelId) => {
    try {
      setSearchTerm(''); 
      setLoading(true);
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 2,
          key: 'AIzaSyCorVC8klBItYQ_kJ-bSjCgDAzgC6X3o0g',

          channelId: channelId,
          type: 'video',
        },
      });

      setChannelId(channelId); 
      setChannelVideos(response.data.items || []); 
      setChannelPageToken(response.data.nextPageToken || ''); 
    } catch (error) {
      console.error('Erro ao buscar vídeos do canal:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreChannelVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 2,
          key: 'AIzaSyCorVC8klBItYQ_kJ-bSjCgDAzgC6X3o0g',

          channelId: channelId,
          type: 'video',
          pageToken: channelPageToken, 
        },
      });

      setChannelVideos([...channelVideos, ...response.data.items || []]);
      setChannelPageToken(response.data.nextPageToken || ''); 
    } catch (error) {
      console.error('Erro ao carregar mais vídeos do canal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o termo de pesquisa"
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      <div className="channel-results">
      <h2>Canais</h2>
      <div className="channel-list">
        {channelResults.map((channel) => (
          <Link to="/youtube-canais" key={channel.id.channelId}>
            <div
              className="channel-item"
              onClick={() => handleChannelClick(channel.id.channelId)}
              onMouseEnter={() => document.body.style.cursor = 'pointer'}
              onMouseLeave={() => document.body.style.cursor = 'default'}
            >
              <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} />
              <p>{channel.snippet.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

    <VideoList
      videos={channelId ? channelVideos : videos}
      selectedVideo={selectedVideo}
      handleVideoClick={handleVideoClick}
    />

    {loading && <div className="loading-spinner">Carregando...</div>}
  </div>
);
};

export default YouTubeSearch;
