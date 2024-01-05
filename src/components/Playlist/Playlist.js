import React, { useCallback } from 'react';
import './Playlist.css';

import Tracklist from '../Tracklist/Tracklist';

function Playlist(props) {
    const handleNameChange = useCallback((e) => {
        props.onNameChange(e.target.value)
    }, [props.onNameChange]
    );

    return (
        <div className="Playlist" >
            <input onChange={handleNameChange} value={props.playlistName} />
            <Tracklist 
            tracks={props.playlistTracks} 
            onRemove={props.onRemove} 
            isRemoval={true}
            preview={false}
            />
            <button className="Playlist-save" onClick={props.onSave}>Save to Spotify</button>
        </div>
    );
};

export default Playlist;