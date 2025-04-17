import * as React from "react";
import TabContainer from "../tab-container";
import Metrics from "../../metrics";
import { InvestmentAllocation } from "../../metrics/investment-allocation";
import RecentInvestments from "../../recent-investments";

export default React.memo(function Overview() {
	return (
		<TabContainer value={"overview"}>
			<div className="p-5 space-y-5">
				<Metrics />
				<div className="lg:w-3/5 w-full">
					<InvestmentAllocation />
				</div>
				<RecentInvestments />
			</div>
		</TabContainer>
	);
});
