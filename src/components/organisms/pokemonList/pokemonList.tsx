// src/components/organisms/PokemonList.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonsThunk } from "../../../store/pokemonSlice";
import { RootState, AppDispatch } from "../../../store/store";
import PokemonItem from "../../molecules/pokemonItem/PokemonItem";
import WhiteCardContainer from "../../atoms/whiteCardContainer/whiteCardContainer";
import { IPokemonListProps, IPokemon } from "../../../types/types";
import Loader from "../../atoms/loader/loader";

import "./pokemonList.scss";

const PokemonList = ({ searchTerm, sortBy }: IPokemonListProps) => {
	const dispatch: AppDispatch = useDispatch();

	const { pokemons, loading, error } = useSelector(
		(state: RootState) => state.pokemon
	);

	useEffect(() => {
		if (pokemons.length === 0) {
			dispatch(fetchPokemonsThunk());
		}
	}, [dispatch, pokemons.length]);

	if (loading)
		return (
			<div className="loader-container">
				<Loader />
			</div>
		);
	if (error) return <div>Error: {error}</div>;

	const isNumeric = (term: string) => {
		return /^\d+$/.test(term);
	};

	const removeLeadingZeros = (term: string) => {
		return term.replace(/^0+/, "");
	};

	const filteredPokemons: IPokemon[] = searchTerm
		? pokemons.filter((pokemon) => {
				const searchTermLower = searchTerm.trim().toLowerCase();

				if (isNumeric(searchTermLower)) {
					const searchNumber = removeLeadingZeros(searchTermLower);
					return pokemon.id === parseInt(searchNumber, 10);
				}

				return pokemon.name.toLowerCase().includes(searchTermLower);
		  })
		: pokemons;

	const sortedPokemons: IPokemon[] = [...filteredPokemons].sort((a, b) => {
		if (sortBy === "name") {
			return a.name.localeCompare(b.name);
		}
		return a.id - b.id;
	});

	return (
		<WhiteCardContainer>
			<div className="list-container">
				{sortedPokemons.map((pokemon) => (
					<PokemonItem key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
		</WhiteCardContainer>
	);
};

export default PokemonList;
