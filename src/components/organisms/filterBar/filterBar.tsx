import SearchBar from "../../molecules/searchBar/searchBar";
import { IFilterBarProps } from "../../../types/types";

import "./filterBar.scss";

const FilterBar = ({ onSearch }: IFilterBarProps) => {
	const handleSearch = (searchTerm: string) => {
		onSearch(searchTerm);
	}

	return (
		<div className="filter-bar">
			<SearchBar onSearch={handleSearch} />
		</div>
	);
};

export default FilterBar;
