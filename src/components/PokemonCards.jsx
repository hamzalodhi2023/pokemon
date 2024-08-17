import React from "react";
function PokemonCards({ pokemon }) {
  console.log(pokemon);
  return (
    <>
      {pokemon.map((item) => {
        return (
          <div
            key={item.id}
            className="card m-5 flex h-[350px] w-[300px] cursor-pointer flex-col items-center justify-evenly rounded-3xl bg-[#151515] pb-1"
          >
            <div className="z-[2] flex h-full w-full flex-col items-center justify-evenly">
              <img
                src={item.sprites.other.dream_world.front_default}
                alt={item.name}
                className="w-[150px]"
              />
              <h1 className="text-center text-3xl">{item.name}</h1>
              <button className="button flex gap-3 rounded-full px-4 py-1 text-black">
                {item.types.map((item) => item.type.name).join(", ")}
              </button>
              <div className="flex w-full items-center justify-evenly">
                <span>
                  Height: <span>{item.height}</span>
                </span>
                <span>
                  Weight: <span>{item.weight}</span>
                </span>
                <span>
                  Speed: <span>{item.stats[5].base_stat}</span>
                </span>
              </div>
              <div className="flex w-full items-center justify-evenly">
                <span className="flex flex-col items-center justify-center">
                  Experience: <span>{item.base_experience}</span>
                </span>
                <span className="flex flex-col items-center justify-center">
                  Attack: <span>{item.stats[1].base_stat}</span>
                </span>
                <span className="flex flex-col items-center justify-center">
                  Abilities: <span>{item.abilities[0].ability.name}</span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PokemonCards;
