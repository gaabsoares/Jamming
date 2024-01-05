import React, { useState, useCallback } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback((term) => {
    Spotify.search(term).then((results) => {
      const filteredResults = results.filter((result) => {
        return !playlistTracks.some((playlistTrack) => playlistTrack.id === result.id);
      });
      setSearchResults(filteredResults);
    });
  }, [playlistTracks]);

  const addTrack = useCallback((track) => {
    if (playlistTracks.find((clickedTrack) => clickedTrack.id === track.id)) {
      return;
    } else {
      setPlaylistTracks(prev => [track, ...prev]);
      setSearchResults(searchResults.filter((clickedTrack) => clickedTrack.id !== track.id));
    }
  }, [playlistTracks, searchResults]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks(playlistTracks.filter((clickedTrack) => clickedTrack.id !== track.id));
    setSearchResults(prev => [track, ...prev]);
  }, [playlistTracks]
  );

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    setIsLoading(true);
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      setIsLoading(false);
    });
  }, [playlistName, playlistTracks]);

  function renderAction() {
    if(isLoading) {
        return (
        <div className="Playlist-container">
          <h3>Saving Playlist...</h3>
        </div>)
    } else {
        return (<Playlist 
          playlistName={playlistName} 
          playlistTracks={playlistTracks} 
          onRemove={removeTrack} 
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />)
    }
  };

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults 
          searchResults={searchResults} 
          onAdd={addTrack} 
          />
          {renderAction()}
        </div>
      </div>
    </div>
  );
};

export default App;
