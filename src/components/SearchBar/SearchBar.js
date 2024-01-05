import React, { useState, useCallback } from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const [term, setTerm] = useState('');

    const handleTermChange = useCallback((e) => {
        setTerm(e.target.value);
    }, []);

    const search = useCallback(() => {
        props.onSearch(term)
        }, [props.onSearch, term]
    );

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            search();
        }
    }, [search]);

    return (
        <div className="SearchBar">
            <input placeholder='Enter a Song, Album or Artist' onKeyDown={handleKeyPress} onChange={handleTermChange} />
            <button className="SearchButton" onClick={search} >Search</button>
        </div>
    );
};

export default SearchBar;