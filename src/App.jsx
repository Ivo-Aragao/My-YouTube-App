import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { supabase } from './services/supabase.js';
import YouTubeSearch from './components/YouTubeSearch';
import Login from './components/Login.jsx';
import { RiYoutubeFill } from 'react-icons/ri';
import './css/App.css';
import { Redirect } from 'react-router-dom';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authListener, setAuthListener] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function fetchSession() {
      try {
        const { data: session, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        console.log('Sessão obtida:', session);
        setSession(session);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar a sessão:', error.message);
        setLoading(false);
      }
    }

    fetchSession();

    const listener = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Alteração na sessão:', session);
      setSession(session);
    });

    setAuthListener(listener);

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      history.push('/login'); // Redireciona para a rota de login após o logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Router>
      <div className="App">
        <div className="header">
          <h1><RiYoutubeFill className="youtube-icon" /> Buscador de Vídeos do YouTube</h1>
          {session && session.user ? (
            <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
          ) : null}
        </div>
        <div className="videos-container">
          <Switch>
            <Route exact path="/" render={() => (
              session && session.user ? <YouTubeSearch redirectTo="/youtube" /> : <Login />
            )} />
            <Route path="/login" render={() => (
              session && session.user ? <YouTubeSearch redirectTo="/youtube" /> : <Login />
            )} />
            <Route path="/youtube" component={YouTubeSearch} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
