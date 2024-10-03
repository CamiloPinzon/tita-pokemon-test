import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IPokemon } from "../../../types/types";
import Text from "../../atoms/text/text";
import ArrowBack from "../../../assets/arrow_back.svg";
import Chevron from "../../../assets/chevron.svg";
import { fetchPokemonLargeImage } from "../../../store/pokemonSlice";
import WhiteCardContainer from "../../atoms/whiteCardContainer/whiteCardContainer";
import TypePill from "../../atoms/typePill/typeFill";

import "./PokemonDetail.scss";

const PokemonDetail = () => {
	const [imageUrl, setImageUrl] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();
	const { pokemons } = useSelector((state: RootState) => state.pokemon);
	const pokemonId = id ? parseInt(id, 10) : undefined;
	const pokemon =
		pokemonId !== undefined
			? pokemons.find((p: IPokemon) => p.id === pokemonId)
			: undefined;

	const formattedId = String(pokemonId).padStart(3, "0");

	console.log(pokemon);
	const color = pokemon!.types[0].name;

	useEffect(() => {
		const getImage = async () => {
			if (pokemonId !== undefined) {
				try {
					const image = await fetchPokemonLargeImage(pokemonId);
					setImageUrl(image);
				} catch (error) {
					console.error("Error fetching image:", error);
				}
			}
		};

		getImage();
	}, [pokemonId]);

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
				</WhiteCardContainer>
			</section>
		</div>
	);
};

export default PokemonDetail;
