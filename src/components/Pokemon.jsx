import "../Pokemon.css";
import React, { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const API = "https://pokeapi.co/api/v2/pokemon?limit=136";
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchpokemon = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      const detailedpokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        if (!res.ok) {
          throw new Error(`Failed to fetch data for ${curPokemon.name}`);
        }
        const data = await res.json();
        return data;
      });
      const detailapiData = await Promise.all(detailedpokemonData);
      setPokemon(detailapiData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pokemon data:", error);
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchpokemon();
  }, []);

  const searchData = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error: {error}</h1>
      </div>
    );
  }

  return (
    <section className="container cursor-pointer ">
      <header>
        <h1 className="text-4xl font-semibold">Let's Catch Pokemon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <ul className="cards">
          {searchData.map((currPokemon) => {
            return <PokemonCards key={currPokemon.id} pokeData={currPokemon} />;
          })}
        </ul>
      </div>
    </section>
  );
};
