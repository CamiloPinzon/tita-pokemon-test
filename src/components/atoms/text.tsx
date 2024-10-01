import { IText } from "../../types/types";

const Text = ({ text, type, color }: IText) => (
	<p className={`text-${type}`} style={{ color: color }}>
		{text}
	</p>
);

export default Text;
