import Counters from "./counters";
import { UsersByMonth } from "./users-by-month";

export default function Metrics() {
	return (
		<div className="space-y-5">
			<Counters />
			<div className="lg:w-3/5">
				<UsersByMonth />
			</div>
		</div>
	);
}
