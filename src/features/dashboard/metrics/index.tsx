import { InvestmentAllocation } from "@/features/investments/metrics/investment-allocation";
import Counters from "./counters";
import TopInvestments from "@/features/investments/metrics/top-investments";
import RecentTransactions from "@/features/transactions/recent-transactions";

export default function Metrics() {
	return (
		<div className="space-y-5">
			<Counters />
			<div className="flex justify-between gap-5 flex-wrap lg:flex-nowrap">
				<div className="lg:w-3/5  w-full">
					<InvestmentAllocation />
				</div>
				<div className="lg:w-2/5 w-full">
					<TopInvestments />
				</div>
			</div>

			<RecentTransactions />
		</div>
	);
}
