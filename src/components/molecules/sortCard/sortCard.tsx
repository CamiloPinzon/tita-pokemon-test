import WhiteCardContainer from "../../atoms/whiteCardContainer/whiteCardContainer";
import Text from "../../atoms/text/text";
import { ISortCardProps } from "../../../types/types";

import "./sortCard.scss";

const SortCard = ({ onSortChange, selectedSort }: ISortCardProps) => {
	const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onSortChange(event.target.value);
	};

	return (
		<div className="sort-card">
			<div className="sort-card__title">
				<Text text="Sort by:" type="subtitle2" color="white" />
			</div>
			<WhiteCardContainer>
				<div className="radio-container">
					<label>
						<input
							type="radio"
							name="sort"
							value="name"
							checked={selectedSort === "name"}
							onChange={handleSortChange}
						/>
						<span>Name</span>
					</label>
					<br />
					<label>
						<input
							type="radio"
							name="sort"
							value="id"
							checked={selectedSort === "id"}
							onChange={handleSortChange}
						/>
						<span>Number</span>
					</label>
				</div>
			</WhiteCardContainer>
		</div>
	);
};

export default SortCard;
