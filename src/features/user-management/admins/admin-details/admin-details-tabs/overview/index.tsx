import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import useOverview from "./use-overview";

import TabContainer from "../../tab-container";
import AdminInfo from "./admin-info";
export default React.memo(function Overview() {
	const { isFetching, isError, error, admin } = useOverview();

	return (
		<TabContainer value={"overview"}>
			<div className="p-5 space-y-5">
				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingComponent={LoadingComponent}
				>
					{admin && <AdminInfo {...admin} />}
				</Render>
			</div>
		</TabContainer>
	);
});

function LoadingComponent() {
	return (
		<div className="space-y-5">
			<Skeleton className="h-80" />
		</div>
	);
}
