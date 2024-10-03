import Tag from "../../../assets/tag.svg";
import { ISortButtonProps } from "../../../types/types";
import "./sortButton.scss";

const SortButton = ({ onClick }: ISortButtonProps) => {
	return (
		<div className="sort-button" onClick={onClick}>
			<img src={Tag} className="sort-button__icon" alt="#" />
		</div>
	);
};

export default SortButton;
