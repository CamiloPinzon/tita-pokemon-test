import { useState } from "react";
import Input from "../../atoms/input/input";
import { ISearchBarProps } from "../../../types/types";

const SearchBar = ({ onSearch }: ISearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let input = e.target.value.trim();

		if (/^\d+$/.test(input)) {
			input = parseInt(input, 10).toString();
		}

		const isValid = input.length >= 3 && /^[a-zA-Z]+$/.test(input);

		setSearchTerm(input);

		if (isValid) {
			onSearch(input);
		}
	};

	return (
		<div className="search-bar">
			<Input
				value={searchTerm}
				onChange={handleChange}
				placeholder="Search by name or ID"
			/>
		</div>
	);
};

export default SearchBar;
