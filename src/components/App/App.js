import React, { useState, useCallback } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  const [searchResults, setSearchResults] = useState([
      {name: 'name1', artist: 'artist1', album: 'album1', id: 1}, 
      {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
      {name: 'name3', artist: 'artist3', album: 'album3', id: 3},
      {name: 'name4', artist: 'artist4', album: 'album4', id: 4}
  ]);
  const [playlistTracks, setPlaylistTracks] = useState([
      {name: 'name5', artist: 'artist5', album: 'album5', id: 5}, 
      {name: 'name6', artist: 'artist6', album: 'album6', id: 6},
      {name: 'name7', artist: 'artist7', album: 'album7', id: 7}
  ]);
  const [playlistName, setPlaylistName] = useState('Example Playlist');

  const addTrack = useCallback((track) => {
    if (playlistTracks.find((clickedTrack) => clickedTrack.id === track.id)) {
      return;
    } else {
      setPlaylistTracks(prev => [track, ...prev])
    }
  }, [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks(playlistTracks.filter((clickedTrack) => clickedTrack.id !== track.id));
  }, [playlistTracks]
  );

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, [playlistName]
  );

  const savePlaylist = useCallback(() => {
    const trackURIs = playlistTracks.map((track) => track.uri);

  }, [playlistTracks]
  );

  const search = useCallback((term) => {
     alert(term);
  });

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
          <Playlist 
          playlistName={playlistName} 
          playlistTracks={playlistTracks} 
          onRemove={removeTrack} 
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
