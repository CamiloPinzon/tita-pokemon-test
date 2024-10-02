import { useEffect } from "react";
import { fetchAllPokemons } from "./api/fetchPokemon";
import HomePage from "./components/pages/homePage/homePage";

import "./app.scss";

const App = () => {
	useEffect(() => {
		fetchAllPokemons();
	}, []);

	return (
		<div className="app-container">
			<HomePage />
		</div>
	);
};

export default App;
