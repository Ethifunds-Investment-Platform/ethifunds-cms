import { amountSeparator } from "@/lib/amount-separator";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Counter } from ".";

export default function CounterCard(props: Counter) {
	return (
		<div className="text-neutral-1000 space-y-3 h-24 w-full rounded-lg p-3 border capitalize">
			<h1 className="content-accent">{props.title}</h1>
			<div className="flex items-center gap-2">
				<p className="hero-accent">{amountSeparator(props.count)}</p>
				{props.trend !== undefined && props.trend !== 0 && (
					<span
						className={`flex items-center gap-0.5 text-xs font-medium ${
							props.trend > 0 ? "text-success-300" : "text-red-500"
						}`}
					>
						{props.trend > 0 ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						{Math.abs(props.trend)}%
					</span>
				)}
			</div>
		</div>
	);
}
