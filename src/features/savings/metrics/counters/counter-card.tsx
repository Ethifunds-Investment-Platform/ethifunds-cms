import { amountSeparator } from "@/lib/amount-separator";
import { Counter } from ".";

export default function CounterCard(props: Counter) {
	return (
		<div className="text-neutral-1000 space-y-3 h-24 w-full rounded-lg p-3 border capitalize">
			<h1 className="content-accent">{props.title}</h1>
			<p className="hero-accent"> {amountSeparator(props.count)}</p>
		</div>
	);
}
