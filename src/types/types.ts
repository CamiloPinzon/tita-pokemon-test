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