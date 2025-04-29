import React from 'react'

function PokemonCard({ pokemon }) {
    return (

        <div className="pokemon-card">
            <img src={pokemon.sprite} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>ID: #{pokemon.id}</p>
            <div className="types">
                {pokemon.types.map((type) => (
                    <span key={type} className={`type ${type}`}>
                        {type}
                    </span>
                ))}
            </div>
        </div>

    )
}

export default PokemonCard