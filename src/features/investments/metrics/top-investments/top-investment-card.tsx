import { Badge } from "@/components/ui/badge";
import { amountSeparator } from "@/lib/amount-separator";
import { TopInvestment } from "@/types/investment.types";

export default function TopInvestmentCard(props: TopInvestment) {
	return (
		<div className="flex justify-between capitalize">
			<div className="space-x-1">
				{" "}
				<span className="!text-sm font-medium">{props.name}</span>
				
				<Badge className="text-[10px] px-1 text-white bg-primary-500 ">{props.category_name.toLowerCase().replace("investment", "")} </Badge>{" "}
			</div>
			<span> {amountSeparator(props.value)} </span>
		</div>
	);
}
