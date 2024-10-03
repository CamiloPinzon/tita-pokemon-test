import { useState } from "react";
import { ISortProps } from "../../../types/types";
import SortCard from "../sortCard/sortCard";
import SortButton from "../../atoms/sortButton/sortButton";

import "./sort.scss";

const Sort = ({ onSortChange }: ISortProps) => {
	const [showSortOptions, setShowSortOptions] = useState(false);
	const [selectedSort, setSelectedSort] = useState("name"); // Store selected sort

	const toggleSortOptions = () => {
		setShowSortOptions((prev) => !prev);
	};

	const handleSortChange = (sortCriterion: string) => {
		setSelectedSort(sortCriterion); // Update the selected sort
		onSortChange(sortCriterion);
		setShowSortOptions(false);
	};

	return (
		<div className="sort-container">
			<div className="sort-container__button">
				<SortButton onClick={toggleSortOptions} />
			</div>
			{showSortOptions && (
				<SortCard
					onSortChange={handleSortChange}
					selectedSort={selectedSort} // Pass the selected sort to SortCard
				/>
			)}
		</div>
	);
};

export default Sort;
