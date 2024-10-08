import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IPokemon } from "../../../types/types";
import Text from "../../atoms/text/text";
import ArrowBack from "../../../assets/arrow_back.svg";
import Chevron from "../../../assets/chevron.svg";
import WhiteCardContainer from "../../atoms/whiteCardContainer/whiteCardContainer";
import TypePill from "../../atoms/typePill/typeFill";
import WeightIcon from "../../../assets/weight.svg";
import HeightIcon from "../../../assets/height.svg";
import Pokeball from "../../../assets/pokeball.svg";
import PlaceholderImage from "../../../assets/placeholder.svg";

import "./PokemonDetail.scss";

const PokemonDetail = () => {
	const [imageUrl, setImageUrl] = useState(PlaceholderImage);
	const { id } = useParams();
	const navigate = useNavigate();
	const { pokemons } = useSelector((state: RootState) => state.pokemon);
	const pokemonId = id ? parseInt(id, 10) : undefined;
	const pokemon =
		pokemonId !== undefined
			? pokemons.find((p: IPokemon) => p.id === pokemonId)
			: undefined;

	const formattedId = String(pokemonId).padStart(3, "0");
	const color = pokemon!.types[0].name;

	useEffect(() => {
		setImageUrl(pokemon!.largeImageUrl);
	}, [pokemon]);

	const handleNext = () => {
		const nextPokemon = pokemons.find(
			(p: IPokemon) => p.id === (pokemonId ? pokemonId + 1 : undefined)
		);
		if (nextPokemon) {
			navigate(`/pokemon/${nextPokemon.id}`);
		}
	};

	const handlePrev = () => {
		const prevPokemon = pokemons.find(
			(p: IPokemon) => p.id === (pokemonId ? pokemonId - 1 : undefined)
		);
		if (prevPokemon) {
			navigate(`/pokemon/${prevPokemon.id}`);
		}
	};

	const handleBack = () => {
		navigate("/");
	};

	if (!pokemon) return <div>Pokémon not found.</div>;

	return (
		<div className={`pokemon-detail bg-${color}`}>
			<div className="pokeball-detail">
				<img src={Pokeball} alt="Pokeball" />
			</div>
			<header className="pokemon-detail__header">
				<div className="pokemon-detail__back-page-button" onClick={handleBack}>
					<img src={ArrowBack} alt="Arrow Back" />
				</div>
				<div className="pokemon-detail__title">
					<Text text={pokemon.name} type="headline" color="white" />
				</div>
				<Text text={`#${formattedId}`} type="subtitle2" color="white" />
			</header>
			<section className="pokemon-detail__image-container">
				<div
					onClick={handlePrev}
					className={`pokemon-detail__back-button ${
						pokemonId === 1 ? "disabled" : ""
					}`}
				>
					<img src={Chevron} alt="Chevron" />
				</div>
				<img src={imageUrl} alt={pokemon.name} width="200px" height="200px" />
				<div
					onClick={handleNext}
					className={`pokemon-detail__next-button ${
						pokemonId === pokemons.length ? "disabled" : ""
					}`}
				>
					<img src={Chevron} alt="Chevron" />
				</div>
			</section>
			<section className="pokemon-details-container">
				<WhiteCardContainer>
					<div className="pills-container">
						{pokemon.types.map((type, idx) => (
							<TypePill key={idx} type={type.name}>
								{type.name}
							</TypePill>
						))}
					</div>
					<div className="sub-title">
						<Text text="About" type="subtitle1" color={`${color}`} />
					</div>
					<div className="properties-container">
						<div className="property-container">
							<div className="property-container__property">
								<div className="property__icon">
									<img src={WeightIcon} alt="Weight Icon" />
								</div>
								<div className="property__value">
									<Text
										text={`${pokemon.weight}kg`}
										type="body3"
										color="darkcolor"
									/>
								</div>
							</div>
							<Text text="Weight" type="caption" color="medium" />
						</div>
						<div className="property-container">
							<div className="property-container__property">
								<div className="property__icon">
									<img src={HeightIcon} alt="Height Icon" />
								</div>
								<div className="property__value">
									<Text
										text={`${pokemon.height}m`}
										type="body3"
										color="darkcolor"
									/>
								</div>
							</div>
							<Text text="Height" type="caption" color="medium" />
						</div>
						<div className="property-container">
							<div className="moves">
								{pokemon.moves.map((move, idx) => {
									return (
										<Text
											key={idx}
											text={`${move.move.name}`}
											type="body3"
											color="darkcolor"
										/>
									);
								})}
							</div>
							<Text text="Moves" type="body3" color="medium" />
						</div>
					</div>
					<div className="description-container">
						<Text text={pokemon.description} type="body3" color="darkcolor" />
					</div>
					<div className="sub-title">
						<Text text="Base Stats" type="subtitle1" color={`${color}`} />
					</div>
					<div className="stats-container">
						{pokemon.moves[0].stats.map((stat, idx) => {
							let statName = "";
							switch (stat.pokemon_v2_stat.name) {
								case "attack":
									statName = "ATK";
									break;
								case "defense":
									statName = "DEF";
									break;
								case "special-attack":
									statName = "SATK";
									break;
								case "special-defense":
									statName = "SDEF";
									break;
								case "speed":
									statName = "SPD";
									break;
								default:
									statName = stat.pokemon_v2_stat.name.toUpperCase();
									break;
							}
							return (
								<div className="stat-container" key={idx}>
									<div className="stat-name">
										<Text text={statName} type="subtitle3" color={`${color}`} />
									</div>
									<div>
										<Text
											text={`${stat.base_stat}`}
											type="body3"
											color="darkcolor"
										/>
									</div>
									<div className={`bglg-${color} stat-bar`}>
										<div
											className={`stat-bar__fill bg-${color}`}
											style={{ width: `${(stat.base_stat * 100) / 255}%` }}
										></div>
									</div>
								</div>
							);
						})}
					</div>
				</WhiteCardContainer>
			</section>
		</div>
	);
};

export default PokemonDetail;
