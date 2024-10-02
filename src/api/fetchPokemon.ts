import { IPokemon, IGraphQLResponse } from "../types/types";

export const fetchAllPokemons = async (): Promise<IPokemon[]> => {
	const items = 10;
	const query = `
    query MyQuery {
      pokemon_v2_pokemon (limit: ${items}) {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        weight
        height
        pokemon_v2_pokemonmoves(limit: 2) {
          pokemon_v2_move {
            name
          }
          pokemon_v2_pokemon {
            pokemon_v2_pokemonstats {
              base_stat
              pokemon_v2_stat {
                name
              }
            }
          }
        }
      }
    }
  `;

	const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
	});

	if (!response.ok) {
		throw new Error(`Error fetching Pokémon data: ${response.statusText}`);
	}

	const result: IGraphQLResponse = await response.json();

	const pokemons: IPokemon[] = result.data.pokemon_v2_pokemon.map(
		(pokemon) => ({
			id: pokemon.id,
			name: pokemon.name,
			types: pokemon.pokemon_v2_pokemontypes.map(
				(type) => type.pokemon_v2_type
			),
			weight: pokemon.weight,
			height: pokemon.height,
			moves: pokemon.pokemon_v2_pokemonmoves.map((move) => ({
				move: move.pokemon_v2_move,
				stats: move.pokemon_v2_pokemon.pokemon_v2_pokemonstats,
			})),
		})
	);

	return pokemons;
};
