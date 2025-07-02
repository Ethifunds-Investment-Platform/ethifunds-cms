import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import useOverview from "./use-overview";
import UserRecentTransactions from "./user-recent-transactions";
import TabContainer from "../../tab-container";
import UserInfo from "./user-info";
export default React.memo(function Overview() {
	const { isFetching, isError, error, user, recentTransaction } = useOverview();

	return (
		<TabContainer value={"overview"}>
			<div className="p-5 space-y-5">
				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingComponent={LoadingComponent}
				>
					{user && <UserInfo {...user} />}
					<UserRecentTransactions data={recentTransaction?.slice(0, 20) ?? []} />
				</Render>
			</div>
		</TabContainer>
	);
});

function LoadingComponent() {
	return (
		<div className="space-y-5">
			<Skeleton className="h-80" />

			<Skeleton className="h-60" />
		</div>
	);
}
