import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPokemon } from "../../../types/types";
import Text from "../../atoms/text/text";
import PlaceHolderImage from "../../../assets/placeholderImage.svg";

import "./pokemonItem.scss";

interface PokemonItemProps {
	pokemon: IPokemon;
}

const PokemonItem = ({ pokemon }: PokemonItemProps) => {
	const [imageUrl, setImageUrl] = useState(PlaceHolderImage);
	const navigate = useNavigate();

	const formattedId = String(pokemon.id).padStart(3, "0");

	useEffect(() => {
		console.log('image');
		
		setImageUrl(pokemon.imageUrl);
	}, [pokemon]);

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
