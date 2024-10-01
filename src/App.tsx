import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { fetchTotalPokemonsCount } from "./features/pokemon/pokemonSlice";
import PokemonList from "./components/organisms/pokemonList";

const App: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTotalPokemonsCount());
	}, [dispatch]);

	return (
    <>
      <h1>Pokédex</h1>
      <h2>search bar component</h2>
			<PokemonList />
		</>
	);
};

export default App;
