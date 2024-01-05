import React, { useState, useEffect, useCallback } from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const [term, setTerm] = useState('');

    const handleTermChange = useCallback((e) => {
        setTerm(e.target.value);
    }, []);

    const search = useCallback(() => {
        if (props.onSearch && typeof props.onSearch === 'function') {
            props.onSearch(term);
            localStorage.setItem('searchItem', term);
        }
    }, [props.onSearch, term]);

    // const handleKeyPress = useCallback((e) => {
    //     if (e.key === 'Enter') {
    //         search();
    //     }
    // }, [search]);

    useEffect(() => {
        const storedSearchTerm = localStorage.getItem('searchItem');
        if (storedSearchTerm) {
            setTerm(storedSearchTerm);
        }
    }, []);

    useEffect(() => {
        if (term) {
            search();
        } else {
            search();
        }
    }, [term, search]);    

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            localStorage.removeItem('searchItem');
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);   

    return (
        <div className="SearchBar">
            <input
                placeholder='Enter a Song, Album or Artist'
                value={term}
                // onKeyDown={handleKeyPress}
                onChange={handleTermChange}
            />
            {/* <button className="SearchButton" onClick={search}>Search</button> */}
        </div>
    );
}

export default SearchBar;
