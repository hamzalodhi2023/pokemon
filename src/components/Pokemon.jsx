// Import necessary hooks from React
import { useEffect, useState } from "react";

// Import CSS file for styling
import "./pokemon.css";

// Import PokemonCards component
import PokemonCards from "./PokemonCards";

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=100";
  const fetchPokemons = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemon = data.results.map(async (item) => {
        const res = await fetch(item.url);
        const data = await res.json();
        return data;
      });
      const detailedRes = await Promise.all(detailedPokemon);
      setPokemon(detailedRes);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  // Search Functionality

  const searchData = pokemon.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  if (loading) {
    return (
      <>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-zinc-900">
          <h1 className="m-5 text-5xl text-white">Loading...</h1>
          <div className="flex items-center justify-center">
            <br />
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-zinc-900">
          <h1 className="m-5 text-5xl text-white">Error</h1>
          <p className="text-white">
            An error occurred while fetching the data. Please try again later.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen w-full bg-zinc-800 text-white">
        <h1 className="py-4 text-center text-4xl font-bold">
          Let&#39; s Catch Pikachu
        </h1>
        <form className="flex w-full items-center justify-center">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="border-b-2 bg-transparent px-2 text-center outline-none"
          />
        </form>
        <div className="flex min-h-screen w-full flex-wrap items-start justify-evenly px-3 py-5">
          <PokemonCards pokemon={searchData} />
        </div>
      </div>
    </>
  );
}

// Export the Pokemon component as default
export default Pokemon;
