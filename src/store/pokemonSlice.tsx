import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IPokemonState } from "../types/types";
import { fetchAllPokemons } from "../api/fetchPokemon";

const initialState: IPokemonState = {
	loading: false,
	pokemons: [],
	filteredPokemons: [],
	error: null,
};

export const fetchPokemonsThunk = createAsyncThunk(
	"pokemon/fetchAllPokemons",
	async () => {
		const pokemons = await fetchAllPokemons();
		return pokemons;
	}
);

export const pokemonSlice = createSlice({
	name: "pokemon",
	initialState,
	reducers: {
		filterPokemons: (state, action) => {
			const searchTerm = action.payload.toLowerCase();
			if (searchTerm === "") {
				state.filteredPokemons = state.pokemons;
			} else {
				// Filter based on name or ID
				state.filteredPokemons = state.pokemons.filter(
					(pokemon) =>
						pokemon.name.toLowerCase().includes(searchTerm) ||
						pokemon.id.toString().includes(searchTerm)
				);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPokemonsThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPokemonsThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.pokemons = action.payload;
			})
			.addCase(fetchPokemonsThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch Pokémon data";
			});
	},
});

export const fetchPokemonImage = async (id: number): Promise<string> => {
	const pokemonResponse = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${id}`
	);
	const pokemonData = await pokemonResponse.json();
	return pokemonData.sprites.front_default;
};

export const fetchPokemonDescription = async (id: number): Promise<string> => {
	try {
		const pokemonResponse = await fetch(
			`https://pokeapi.co/api/v2/pokemon-species/${id}`
		);

		// Check if the response is okay
		if (!pokemonResponse.ok) {
			throw new Error(
				`Error fetching species data: ${pokemonResponse.statusText}`
			);
		}

		const pokemonData = await pokemonResponse.json();

		// Find the first English flavor text entry
		const englishFlavorTextEntry = pokemonData.flavor_text_entries.find(
			(entry: { language: { name: string }; flavor_text: string }) =>
				entry.language.name === "en"
		);

		// Return the flavor text or a fallback message if not found
		return englishFlavorTextEntry
			? englishFlavorTextEntry.flavor_text.replace(/[\f\n\r\t]/g, " ") // Replace newlines and other whitespace
			: "No description available";
	} catch (error) {
		console.error("Error fetching Pokémon description:", error);
		return "No description available";
	}
};

export const { filterPokemons } = pokemonSlice.actions;

export default pokemonSlice.reducer;
