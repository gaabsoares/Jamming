import React from 'react';
import './Tracklist.css';

import Track from '../Track/Track';

function Tracklist(props) {
    return (
        <div className="TrackList">
            {      
                props.tracks.map((track) => {
                    return <Track 
                    track={track} 
                    onAdd={props.onAdd} 
                    onRemove={props.onRemove}
                    isRemoval={props.isRemoval}
                    key={track.id}
                    preview={props.preview} 
                    />
                })
            }
        </div>
    );
};

export default Tracklist;