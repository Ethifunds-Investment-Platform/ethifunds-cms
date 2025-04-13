import Counters from "./counters";
import { ListingByUnits } from "./listing-by-units";
import ListingTrends from "./listing-trends";

export default function Metrics() {
	return (
		<div className="space-y-5">
			<Counters />
			<div className="flex justify-between gap-5 flex-wrap lg:flex-nowrap">
				<div className="lg:w-3/5  w-full">
					<ListingByUnits />
				</div>
				<div className="lg:w-2/5 w-full">
					<ListingTrends />
				</div>
			</div>
		</div>
	);
}
