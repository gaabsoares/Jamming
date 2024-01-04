import React from 'react';
import './Tracklist.css';

import Track from '../Track/Track';

function Tracklist(props) {
    return (
        <div className="TrackList">
            {      
                props.tracks.map((track) => {
                    return <Track track={track} key={track.id} />
                })
            }
        </div>
    );
};

export default Tracklist;