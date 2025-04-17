import * as React from "react";
import TabContainer from "../tab-container";
import Metrics from "../../metrics";
import RecentInvestments from "../../recent-investments";

type CategoryProps = {
	category_id: string;
};

{
	/* This  is a dynamic layout for the different investment categories */
}
export default React.memo(function Category(props: CategoryProps) {
	return (
		<TabContainer value={props.category_id}>
			<div className="p-5 space-y-5">
				<Metrics />

				<RecentInvestments />
			</div>
		</TabContainer>
	);
});
