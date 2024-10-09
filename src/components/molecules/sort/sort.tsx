import { useState } from "react";
import { ISortProps } from "../../../types/types";
import SortCard from "../sortCard/sortCard";
import SortButton from "../../atoms/sortButton/sortButton";

import "./sort.scss";

const Sort = ({ onSortChange }: ISortProps) => {
	const [showSortOptions, setShowSortOptions] = useState(false);
	const [selectedSort, setSelectedSort] = useState("name");

	const toggleSortOptions = () => {
		setShowSortOptions((prev) => !prev);
	};

	const handleSortChange = (sortCriterion: string) => {
		setSelectedSort(sortCriterion);
		onSortChange(sortCriterion);
		setShowSortOptions(false);
	};

	return (
		<div className="sort-container">
			<div className="sort-container__button">
				<SortButton onClick={toggleSortOptions} selectedSort={selectedSort} />
			</div>
			{showSortOptions && (
				<SortCard onSortChange={handleSortChange} selectedSort={selectedSort} />
			)}
		</div>
	);
};

export default Sort;
