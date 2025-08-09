import Metrics from "../../metrics";
import SavingsWithdrawals from "../../savings-withdrawals";
import TabContainer from "../tab-container";
import * as React from "react";

export default React.memo(function Overview() {
	return (
		<TabContainer value="overview" className="space-y-5">
			<Metrics />
			<SavingsWithdrawals />
		</TabContainer>
	);
});
