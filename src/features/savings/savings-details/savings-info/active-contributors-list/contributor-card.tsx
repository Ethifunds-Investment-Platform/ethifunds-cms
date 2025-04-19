import { amountSeparator } from "@/lib/amount-separator";

import { SavingsContributor } from "@/types/savings.types";

export default function ContributorCard(props: SavingsContributor) {
	return (
		<div className="flex justify-between [&_span]:content-standard capitalize">
			<span> {props.username} </span>
			<span>
				{" "}
				{amountSeparator(props.amount_raised)}/{amountSeparator(props.target_amount)}{" "}
			</span>
		</div>
	);
}
