import { amountSeparator } from "@/lib/amount-separator";
import { Counter } from ".";

export default function CounterCard(props: Counter) {
	return (
		<div className="p-3 space-y-3 w-full h-24 capitalize rounded-lg border text-neutral-1000">
			<h1 className="content-accent">{props.title}</h1>
			<p className="hero-accent">{amountSeparator(props.count)}</p>
		</div>
	);
}
