export interface IImage {
	url: string;
	altText: string;
	type: "thumbnail" | "fullsize";
}

export interface IText {
	text: string;
	type: "sm" | "md" | "lg";
	color?: string;
}

export interface IPokemon {
	id: number;
	name: string;
	url: string;
	image: string;
}

export interface IPokemonDetail {
	id: number;
	name: string;
	image: string;
	types: string[];
	height: number;
	weight: number;
}

export interface IPokemonState {
	pokemons: { [key: number]: IPokemonDetail[] };
	currentPage: number;
	totalPages: number;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	totalCount: number;
}
