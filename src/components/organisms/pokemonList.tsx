import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
	fetchPokemons,
	setCurrentPage,
} from "../../features/pokemon/pokemonSlice";

import "./pokemonList.scss";

const PokemonList = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { pokemons, currentPage, totalPages, status } = useSelector(
		(state: RootState) => state.pokemon
	);

	useEffect(() => {
		dispatch(fetchPokemons({ page: currentPage, limit: 20 }));
	}, [dispatch, currentPage]);

	const handlePageChange = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	return (
		<div className="pokemon-list">
			{status === "loading" && <p>Loading...</p>}
			{status === "failed" && <p>Failed to load Pokémon.</p>}
			{status === "succeeded" && (
				<>
					<ul>
						{pokemons[currentPage]?.map((pokemon) => (
							<li key={pokemon.id} className="pokemon-item">
								<img
									src={pokemon.image}
									alt={pokemon.name}
									className="pokemon-thumbnail"
								/>
								<span className="pokemon-info">
									<strong>{pokemon.name}</strong> - #{pokemon.id}
								</span>
							</li>
						))}
					</ul>

					<div>
						<button
							disabled={currentPage === 1}
							onClick={() => handlePageChange(currentPage - 1)}
						>
							Previous
						</button>
						<span>
							{currentPage} of {totalPages}
						</span>
						<button
							disabled={currentPage === totalPages}
							onClick={() => handlePageChange(currentPage + 1)}
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default PokemonList;
