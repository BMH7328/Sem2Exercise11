import { useState, useEffect, useMemo } from "react";
import { pokemonData } from "./data/pokemon";

const PokemonList = () => {
  /* 
    instruction: set up the following states
    - pokemons: array of pokemons. use pokemonData as initial value
    - searchTerm: search term for pokemon's name
    - sort: sort by title or rating
  */
  const [pokemons, setPokemons] = useState(pokemonData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const types = useMemo(() => {
    let options = [];
    // instruction: get all types from pokemoneData
    if (pokemons && pokemons.length > 0) {
      pokemons.forEach((pokemon) => {
        if (!options.includes(pokemon.type)) {
          options.push(pokemon.type);
        }
      });
    }
    return options;
  }, [pokemonData]);

  useEffect(() => {
    let newPokemons = [...pokemonData];

    // instruction: do title search using the searchTerm state

    // instruction: do type filter using the selectedType state
    if (selectedType !== "") {
      newPokemons = newPokemons.filter((p) => p.type === selectedType);
    }
    // instruction: sort by name or level

    //sorting
    switch (sort) {
      case "name":
        newPokemons = newPokemons.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "level":
        newPokemons = newPokemons.sort((a, b) => {
          return a.level - b.level;
        });
        break;
    }
    setPokemons(newPokemons);
    // instruction: set pokemons state with newPokemons variable
  }, [pokemonData, selectedType, sort]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-6">
          <input
            type="text"
            placeholder="Search"
            // instruction: assign searchTerm state to value

            onChange={(e) => {
              // instruction: set searchTerm state
            }}
          />
        </div>
        <div className="col-6 text-end mb-3">
          <select
            className="me-1 mb-1"
            // instruction: assign sort state to value
            value={sort}
            onChange={(e) => {
              // instruction: set sort state
              setSort(e.target.value);
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="level">Sort by Level</option>
          </select>

          <select
            className="me-1 mb-1"
            // instruction: assign selectedType state to value
            value={selectedType}
            onChange={(e) => {
              // instruction: set selectedType state
              setSelectedType(e.target.value);
            }}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* 
        instruction: 
        - display the pokemons here
        - responsive layout: 1 column for mobile, 2 columns for tablet, 3 columns for desktop
      */}
      <div className="row">
        {/* instruction: list books using .map() */}
        {pokemons.map((pokemon) => {
          return (
            <div
              className="col-lg-4 col-md-6 col-sm-12 my-3"
              key={pokemon.name}
            >
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">{pokemon.name}</h2>
                  <p className="card-text">{pokemon.type}</p>
                  <p className="card-text">Level: {pokemon.level}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
