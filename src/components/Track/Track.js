import React, { useCallback } from 'react';
import './Track.css';

function Track(props) {
    const addTrack = useCallback(
        (event) => {
        props.onAdd(props.track);
        },
        [props.onAdd, props.track]
    );

    const removeTrack = useCallback(
        (event) => {
            props.onRemove(props.track);
        },
        [props.onRemove, props.track]
    );

    function renderAction() {
        if(props.isRemoval) {
            return <button onClick={removeTrack} className="Track-action">-</button>
        } else {
            return <button onClick={addTrack} className="Track-action">+</button>
        }
    };

    function renderPreview() {
        if(props.preview && props.track.previewUrl) {
            return (<audio className="Mini-player" controls>
                        <source src={props.track.previewUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
        )} else {
            return
        }
    };

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            <div className="Track-actions">
                {renderPreview()}
                {renderAction()}
            </div>
        </div>
    );
};

export default Track;