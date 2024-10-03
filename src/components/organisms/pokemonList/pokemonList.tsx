// src/components/organisms/PokemonList.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonsThunk } from "../../../store/pokemonSlice";
import { RootState, AppDispatch } from "../../../store/store";
import PokemonItem from "../../molecules/pokemonItem/PokemonItem";
import WhiteCardContainer from "../../atoms/whiteCardContainer/whiteCardContainer";
import { IPokemonListProps } from "../../../types/types";

import "./pokemonList.scss";

const PokemonList = ({ searchTerm, sortBy }: IPokemonListProps) => {
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

	// Filter Pokémon based on the search term
	const filteredPokemons = searchTerm
		? pokemons.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: pokemons;
	
	const sortedPokemons = [...filteredPokemons].sort((a, b) => {
		if (sortBy === "name") {
			return a.name.localeCompare(b.name);
		}
		return a.id - b.id; // Sort by ID
	});

	return (
		<WhiteCardContainer>
			{sortedPokemons.map((pokemon) => (
				<PokemonItem key={pokemon.id} pokemon={pokemon} />
			))}
		</WhiteCardContainer>
	);
};

export default PokemonList;
