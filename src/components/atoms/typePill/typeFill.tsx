import { ITypePillProps } from "../../../types/types";
import Text from "../text/text";

import "./typeFill.scss";

const TypePill = ({ type, children }: ITypePillProps) => {
	const content = String(children);
	return (
		<div className={`type-pill bg-${type}`}>
			<Text text={content} type="subtitle3" color="white" />
		</div>
	);
};

export default TypePill;
