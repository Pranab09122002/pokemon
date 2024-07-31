import React from "react";

export const PokemonCards = ({ pokeData }) => {
  return (
    <li className="pokemon-card ">
      <figure>
        <img
          src={pokeData.sprites.other.dream_world.front_default}
          alt={pokeData.name}
          className="pokemon-image"
        />
      </figure>
      <h1 className="pokemon-name">{pokeData.name}</h1>
      <div className="pokemon-info pokemon-highlight">
        <p>{pokeData.types.map((curtype) => curtype.type.name).join(", ")}</p>
      </div>
      <div className="grid-three-cols">
        <p className="pokemon-info">
          Height: <span>{pokeData.height}</span>
        </p>
        <p className="pokemon-info">
          Weight: <span>{pokeData.weight}</span>
        </p>
        <p className="pokemon-info">
          Speed: <span>{pokeData.stats[5].base_stat}</span>
        </p>
      </div>
      <div className="grid-three-cols">
        <div className="pokemon-info">
          <p>
            {pokeData.base_experience}
          </p>
          <span>Experience:</span>
        </div>
        <div className="pokemon-info">
          <p>
            {pokeData.stats[1].base_stat}
          </p>
          <span>Attack:</span>
        </div>
        <div className="pokemon-info">
          <p>
            {pokeData.abilities.map((abilityInfo)=> abilityInfo.ability.name).slice(0, 1)
            .join(", ")}
          </p>
          <span>Abilities:</span>
        </div>
      </div>
    </li>
  );
};
