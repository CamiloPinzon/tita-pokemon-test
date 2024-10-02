import { IText } from "../../../types/types";

import "./text.scss";

const Text = ({ text, type, color }: IText) => {
	if (type === "headline") {
		return <h1 className={`text-headline ${color}`}>{text}</h1>;
	} else {
		return (
			<p className={`text-${type} ${color}`}>
				{text}
			</p>
		);
	}
};

export default Text;
