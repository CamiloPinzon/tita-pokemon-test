import SearchBar from "../../molecules/searchBar/searchBar";

const FilterBar = () => {
	const handleSearch = (searchTerm: string) => {
		console.log("Searching for:", searchTerm);
		// Perform your search logic here (e.g., dispatching Redux action, etc.)
	};
	return (
		<div className="filter-bar">
			<SearchBar onSearch={handleSearch} />
		</div>
	);
};

export default FilterBar;
