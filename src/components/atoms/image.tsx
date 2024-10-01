import { IImage } from "../../types/types";

const Image = ({ url, altText, type }: IImage) => (
	<img src={url} alt={altText} className={`image-${type}`} />
);

export default Image;
