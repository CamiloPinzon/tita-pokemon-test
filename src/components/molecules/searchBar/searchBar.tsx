import { useState, useEffect } from "react";
import Input from "../../atoms/input/input";
import { ISearchBarProps } from "../../../types/types";
import SearchIcon from "../../../assets/search.svg";
import CloseIcon from "../../../assets/close.svg";

import "./searchBar.scss";

const SearchBar = ({ onSearch }: ISearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value.trim();
		setSearchTerm(input);
	};

	useEffect(() => {
		const isValid = searchTerm.length >= 3 && /^[a-zA-Z0-9]+$/.test(searchTerm);

		if (searchTerm.length === 0 || isValid) {
			onSearch(searchTerm);
		}
	}, [onSearch, searchTerm]);

	const handleClear = () => {
		setSearchTerm("");
	};

	return (
		<div className="search-bar">
			<div className="search-bar__search-logo">
				<img src={SearchIcon} alt="Search Icon" />
			</div>
			<Input value={searchTerm} onChange={handleChange} placeholder="Search" />
			<div className="search-bar__close-logo" onClick={handleClear}>
				<img src={CloseIcon} alt="Close Icon" />
			</div>
		</div>
	);
};

export default SearchBar;
