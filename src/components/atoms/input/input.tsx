import { IInput } from "../../../types/types";
import "./input.scss";

const Input = ({ placeholder, value, onChange }: IInput) => {
	return (
		<input
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className="input"
		/>
	);
};

export default Input;
