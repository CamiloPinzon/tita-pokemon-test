import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchAllPokemons } from "./api/fetchPokemon";
import HomePage from "./components/pages/homePage/homePage";
import PokemonDetail from "./components/pages/pokemonDetail/PokemonDetail";

import "./app.scss";

const App = () => {
	useEffect(() => {
		fetchAllPokemons();
	}, []);

	return (
		<div className="app-container">
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/pokemon/:id" element={<PokemonDetail />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
