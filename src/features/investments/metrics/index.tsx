import Counters from "./counters";

import { InvestmentByUnits } from "./investment-by-units";
import TopInvestments from "./top-investments";

export default function Metrics() {
	return (
		<div className="space-y-5">
			<Counters />
			<div className="flex justify-between gap-5 flex-wrap lg:flex-nowrap">
				<div className="lg:w-3/5  w-full">
					<InvestmentByUnits />
				</div>
				<div className="lg:w-2/5 w-full">
					<TopInvestments />
				</div>
			</div>
		</div>
	);
}
