type textTypes =
	| "headline"
	| "subtitle1"
	| "subtitle2"
	| "subtitle3"
	| "body1"
	| "body2"
	| "body3"
	| "regular";

export interface IText {
	text: string;
	type: textTypes;
	color: string;
}

export interface IInput {
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ISearchBarProps {
	onSearch: (searchTerm: string) => void;
}

interface IPokemonType {
	name: string;
}

interface IPokemonMove {
	name: string;
}

interface IPokemonStat {
	base_stat: number;
	pokemon_v2_stat: {
		name: string;
	};
}

export interface IPokemon {
	id: number;
	name: string;
	types: IPokemonType[];
	weight: number;
	height: number;
	moves: {
		move: IPokemonMove;
		stats: IPokemonStat[];
	}[];
}

export interface IGraphQLResponse {
	data: {
		pokemon_v2_pokemon: {
			id: number;
			name: string;
			pokemon_v2_pokemontypes: {
				pokemon_v2_type: IPokemonType;
			}[];
			weight: number;
			height: number;
			pokemon_v2_pokemonmoves: {
				pokemon_v2_move: IPokemonMove;
				pokemon_v2_pokemon: {
					pokemon_v2_pokemonstats: IPokemonStat[];
				};
			}[];
		}[];
	};
}

export interface IPokemonState {
	loading: boolean;
	pokemons: IPokemon[];
	filteredPokemons: IPokemon[];
	error: string | null;
}

export interface IPokemonDetails {
	imageUrl: string;
	description: string;
}

export interface IFlavorTextEntry {
	flavor_text: string;
	language: {
		name: string;
	};
}

export interface IPokemonListProps {
	searchTerm: string;
	sortBy: string;
}

export interface IFilterBarProps {
	onSearch: (searchTerm: string) => void;
}

export interface ISortCardProps {
	onSortChange: (sortCriterion: string) => void;
	selectedSort: string;
}

export interface ISortProps {
	onSortChange: (sortCriterion: string) => void;
}

export interface ISortButtonProps {
	onClick: () => void;
}

export interface ITypePillProps {
	type: string;
	children: React.ReactNode;
}