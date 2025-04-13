import { amountSeparator } from "@/lib/amount-separator";
import { ListingTrends } from "@/types/listing.types";

export default function ListingTrendCard(props: ListingTrends) {
	return (
		<div className="flex justify-between [&_span]:content-standard capitalize">
			<span>
				{" "}
				{props.username} ({props.listed_units})
			</span>
			<span> {amountSeparator(props.valued_at)} </span>
		</div>
	);
}
