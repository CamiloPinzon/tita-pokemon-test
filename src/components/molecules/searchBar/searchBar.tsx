import { useState } from "react";
import Input from "../../atoms/input/input";
import { ISearchBarProps } from "../../../types/types";
import SearchIcon from "../../../assets/search.svg";

import "./searchBar.scss";

const SearchBar = ({ onSearch }: ISearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value.trim();

		const isValid = input.length >= 3 && /^[a-zA-Z]+$/.test(input);

		setSearchTerm(input);

		if (input.length === 0 || isValid) {
			onSearch(input);
		}
	};

	return (
		<div className="search-bar">
			<div className="search-bar__search-logo">
				<img src={SearchIcon} alt="Search Icon" />
			</div>
			<Input value={searchTerm} onChange={handleChange} placeholder="Search" />
		</div>
	);
};

export default SearchBar;
