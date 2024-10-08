import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPokemon } from "../../../types/types";
import { fetchPokemonImage } from "../../../store/pokemonSlice";
import Text from "../../atoms/text/text";

import "./pokemonItem.scss";

interface PokemonItemProps {
	pokemon: IPokemon;
}

const PokemonItem = ({ pokemon }: PokemonItemProps) => {
	const [imageUrl, setImageUrl] = useState("");
	const navigate = useNavigate();

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

	const handleClick = () => {
		navigate(`/pokemon/${pokemon.id}`);
	};

	return (
		<div className="pokemon-item" onClick={handleClick}>
			<div className="pokemon-item__number">
				<Text text={`#${formattedId}`} type="caption" color="medium" />
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
