import { Badge } from "@/components/ui/badge";
import { amountSeparator } from "@/lib/amount-separator";
import { TopInvestment } from "@/types/investment.types";

export default function TopInvestmentCard(props: TopInvestment) {
	return (
		<div className="flex justify-between [&_span]:content-standard capitalize">
			<span>
				{" "}
				{props.name} <Badge className="text-xs bg-primary-500 text-white">{props.category_name} </Badge>{" "}
			</span>
			<span> {amountSeparator(props.value)} </span>
		</div>
	);
}
