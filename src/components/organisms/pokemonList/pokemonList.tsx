// src/components/organisms/PokemonList.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonsThunk } from "../../../store/pokemonSlice";
import { RootState, AppDispatch } from "../../../store/store";
import PokemonItem from "../../molecules/pokemonItem/PokemonItem";

import "./pokemonList.scss";

const PokemonList = () => {
	const dispatch: AppDispatch = useDispatch(); // Correctly typed dispatch

	// Select data from Redux store
	const { pokemons, loading, error } = useSelector(
		(state: RootState) => state.pokemon
	);

	useEffect(() => {
		dispatch(fetchPokemonsThunk()); // No more type issues
	}, [dispatch]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="pokemon-container">
			{pokemons.map((pokemon) => (
				<PokemonItem key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
};

export default PokemonList;
