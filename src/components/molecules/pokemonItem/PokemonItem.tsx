import { useState, useEffect } from "react";
import { IPokemon } from "../../../types/types";
import { fetchPokemonImage } from "../../../store/pokemonSlice";
import Text from "../../atoms/text/text";

import "./pokemonItem.scss";

interface PokemonItemProps {
	pokemon: IPokemon;
}

const PokemonItem = ({ pokemon }: PokemonItemProps) => {
	const [imageUrl, setImageUrl] = useState<string>("");

	useEffect(() => {
		const getImageAndDescription = async () => {
			try {
				const image = await fetchPokemonImage(pokemon.id);
				setImageUrl(image);
			} catch (error) {
				console.error("Error fetching image or description:", error);
			}
		};

		getImageAndDescription();
	}, [pokemon.id]);

	const formattedId = String(pokemon.id).padStart(3, "0");

	return (
		<div className="pokemon-item">
			<div className="pokemon-item__number">
				<Text text={`#${formattedId}`} type="regular" color="medium" />
			</div>
			<img
				src={imageUrl}
				alt={pokemon.name}
				className="pokemon-item__image"
				width="72"
				height="72"
			/>
			<div className="pokemon-item__name-container">
				<div className="pokemon-item__name-container-name">
					<Text text={pokemon.name} type="body3" color="dark" />
				</div>
			</div>
		</div>
	);
};

export default PokemonItem;
