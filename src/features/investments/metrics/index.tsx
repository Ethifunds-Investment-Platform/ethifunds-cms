import Counters from "./counters";

import { InvestmentByUnits } from "./investment-by-units";
import TopInvestments from "./top-investments";

export default function Metrics() {
	return (
		<div className="space-y-5">
			<Counters />
			<div className="flex flex-wrap justify-between gap-5 lg:flex-nowrap">
				<div className="w-full lg:w-3/5">
					<InvestmentByUnits />
				</div>
				<div className="w-full lg:w-2/5">
					<TopInvestments />
				</div>
			</div>
		</div>
	);
}
