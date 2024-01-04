import './Playlist.css';
import React from 'react';

import Tracklist from '../Tracklist/Tracklist';

function Playlist() {
    return (
        <div className="Playlist">
            <input defaultValue={'New Playlist'} />
            {/* <Tracklist /> */}
            <button className="Playlist-save">Save to Spotify</button>
        </div>
    );
};

export default Playlist;