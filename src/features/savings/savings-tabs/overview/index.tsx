import Metrics from "../../metrics";
import TabContainer from "../tab-container";
import ActiveSavings from "./active-savings";
import * as React from "react";

export default React.memo(function Overview() {

	return (
		<TabContainer value="overview" className="space-y-5">
			<Metrics />
			<ActiveSavings />
		</TabContainer>
	);
});
