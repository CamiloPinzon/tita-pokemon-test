import { useState } from "react";
import PokemonList from "../../organisms/pokemonList/pokemonList";
import Text from "../../atoms/text/text";
import FilterBar from "../../organisms/filterBar/filterBar";
import Pokeball from "../../../assets/pokeball.svg";

import Sort from "../../molecules/sort/sort";
import "./homePage.scss";

const HomePage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("name");

	const handleSearch = (searchTerm: string) => {
		setSearchTerm(searchTerm);
	};

	const handleSortChange = (sortCriterion: string) => {
		setSortBy(sortCriterion);
	};

	return (
		<div className="home-page">
			<header className="home-page__header">
				<img src={Pokeball} alt="PokeAPI Logo" />
				<Text text="Pokédex" type="headline" color="white" />
			</header>
			<section className="home-page__filters">
				<FilterBar onSearch={handleSearch} />
				<Sort onSortChange={handleSortChange} />{" "}
			</section>
			<section className="home-page__list">
				<PokemonList searchTerm={searchTerm} sortBy={sortBy} />
			</section>
		</div>
	);
};

export default HomePage;
