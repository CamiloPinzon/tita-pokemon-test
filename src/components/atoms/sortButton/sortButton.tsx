import Tag from "../../../assets/tag.svg";
import TextIcon from "../../../assets/text_format.svg";
import { ISortButtonProps } from "../../../types/types";
import "./sortButton.scss";

const SortButton = ({ onClick, selectedSort }: ISortButtonProps) => {
	return (
		<div className="sort-button" onClick={onClick}>
			<img
				src={selectedSort === "name" ? TextIcon : Tag}
				className="sort-button__icon"
				alt="Select sort button"
			/>
		</div>
	);
};

export default SortButton;
