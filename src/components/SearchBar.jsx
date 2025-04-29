import React from 'react'

function SearchBar({searchTerm, setSearchTerm }) {
    return (

        <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="search-input"
        />

    )
}

export default SearchBar