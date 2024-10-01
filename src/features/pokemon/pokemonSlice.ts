import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IPokemonState } from "../../types/types";
import {
	fetchPokemonsAPI,
	fetchPokemonCountAPI,
} from "../../services/pokemonService";
import { RootState } from "../../store/store";

const initialState: IPokemonState = {
	pokemons: {},
	currentPage: 1,
	totalPages: 0,
	status: "idle",
	error: null,
	totalCount: 0,
};

export const fetchTotalPokemonsCount = createAsyncThunk(
	"pokemon/fetchTotalPokemonsCount",
	async () => {
		const response = await fetchPokemonCountAPI();
		return response.count;
	}
);

export const fetchPokemons = createAsyncThunk(
	"pokemon/fetchPokemons",
	async ({ page, limit }: { page: number; limit: number }, { getState }) => {
		const offset = (page - 1) * limit;
		const state = getState() as RootState;
		const { pokemons } = state.pokemon;

		if (pokemons[page]) {
			return { page, pokemons: pokemons[page] };
		}

		const data = await fetchPokemonsAPI(limit, offset);

		return { page, pokemons: data.results };
	}
);

const pokemonSlice = createSlice({
	name: "pokemon",
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTotalPokemonsCount.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchTotalPokemonsCount.fulfilled, (state, action) => {
				state.totalCount = action.payload;
				state.totalPages = Math.ceil(state.totalCount / 20);
				state.status = "succeeded";
			})
			.addCase(fetchTotalPokemonsCount.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || null;
			})
			.addCase(fetchPokemons.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPokemons.fulfilled, (state, action) => {
				const { page, pokemons } = action.payload;
				state.pokemons[page] = pokemons;
				state.status = "succeeded";
			})
			.addCase(fetchPokemons.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || null;
			});
	},
});

export const { setCurrentPage } = pokemonSlice.actions;

export default pokemonSlice.reducer;
