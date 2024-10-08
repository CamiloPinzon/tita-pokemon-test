import {
	fetchPokemonDescription,
	fetchPokemonImage,
	fetchPokemonLargeImage,
} from "../store/pokemonSlice";
import { IPokemon, IGraphQLResponse } from "../types/types";

export const fetchAllPokemons = async (): Promise<IPokemon[]> => {
	const items = 150;
	const query = `
    query MyQuery {
      pokemon_v2_pokemon ${items > 0 && `(limit: ${items})`} {
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

	try {
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

		const pokemonsWithDetails = await Promise.all(
			result.data.pokemon_v2_pokemon.map(async (pokemon) => {
				const id = pokemon.id;

				const description = await fetchPokemonDescription(id).catch((error) => {
					console.error(
						`Error fetching description for Pokémon ID ${id}:`,
						error
					);
					return "No description available"; // Fallback if description fails
				});

				const imageUrl = await fetchPokemonImage(id).catch((error) => {
					console.error(`Error fetching image for Pokémon ID ${id}:`, error);
					return ""; // Fallback if image fails
				});

				const largeImageUrl = await fetchPokemonLargeImage(id).catch(
					(error) => {
						console.error(
							`Error fetching large image for Pokémon ID ${id}:`,
							error
						);
						return ""; // Fallback if large image fails
					}
				);

				return {
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
					description, // Add the description
					imageUrl, // Add the image URL
					largeImageUrl, // Add the large image URL
				};
			})
		);

		return pokemonsWithDetails;
	} catch (error) {
		console.error("Error in fetching all Pokémon:", error);
		return []; // Return an empty array or handle the error as needed
	}
};
