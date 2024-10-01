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
	name: string;
	url: string;
}

export interface IPokemonState {
	pokemons: Record<number, IPokemon[]>;
	currentPage: number;
	totalPages: number;
	status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    totalCount: number;
}