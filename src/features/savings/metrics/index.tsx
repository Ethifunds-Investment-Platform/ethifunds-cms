import Counters from "./counters";
import SavingsByAmount from "./savings-by-amount";

export default function Metrics() {
	return (
		<div className="space-y-5">
			<Counters />
			<SavingsByAmount />
		</div>
	);
}
