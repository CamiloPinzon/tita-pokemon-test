export const fetchPokemonsAPI = async (limit: number, offset: number) => {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
	);
	const data = await response.json();
	return data;
};

export const fetchPokemonCountAPI = async (): Promise<{ count: number }> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
	if (!response.ok) {
		throw new Error("Failed to fetch total Pokémon count");
	}
	const data = await response.json();
	return { count: data.count };
};
