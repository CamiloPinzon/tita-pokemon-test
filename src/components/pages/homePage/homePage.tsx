import PokemonList from "../../organisms/pokemonList/pokemonList";
import Text from "../../atoms/text/text";
import Pokeball from "../../../assets/pokeball.svg";

import './homePage.scss';

const HomePage = () => (
	<div className="home-page">
		<header className="header">
			<img src={Pokeball} alt="PokeAPI Logo"/>
			<Text text="Pokédex" type="headline" color="white" />
		</header>
		<section>
			<PokemonList />
		</section>
	</div>
);

export default HomePage;
