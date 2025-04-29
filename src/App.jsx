import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonCard from './components/PokemonCard';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPokemon = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const data = await res.json();
      const details = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const poke = await res.json();
          return {
            id: poke.id,
            name: poke.name,
            sprite: poke.sprites.front_default,
            types: poke.types.map((t) => t.type.name),
          };
        })
      );
      setPokemonList(details);
      setFilteredPokemon(details);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList.filter((pokemon) =>
      pokemon.name.includes(searchTerm)
    );
    if (selectedType) {
      filtered = filtered.filter((p) => p.types.includes(selectedType));
    }
    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  const allTypes = [
    ...new Set(pokemonList.flatMap((p) => p.types)),
  ].sort();

  return (
    <div className="App">
      <Header />
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter
          types={allTypes}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>

      {loading && <p>Loading Pokémon...</p>}
      {error && <p>Something went wrong. Please try again later.</p>}
      {!loading && filteredPokemon.length === 0 && <p>No Pokémon found.</p>}

      <div className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
