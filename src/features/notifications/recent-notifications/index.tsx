import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";
import useRecentNotifications from "./use-recent-transactions";
import Render from "@/components/render";
import NotificationView from "../notification-view";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentNotifications() {
	const { isFetching, isError, error, data } = useRecentNotifications();

	return (
		<div className="space-y-5 ">
			<ErrorBoundary>
				<div className="flex items-center justify-between px-1">
					<h1 className="highlight-accent text-neutral-1000">Recent Notifications </h1>
					{data && data.docs?.length > 0 && (
						<Link to={`/notifications/all-notifications`} className="underline text-primary">
							View All
						</Link>
					)}
				</div>

				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingComponent={<LoadingComponent />}
				>
					<NotificationView data={data?.docs ?? []} className="" />
				</Render>
			</ErrorBoundary>
		</div>
	);
}

function LoadingComponent() {
	return (
		<div className="flex justify-between gap-5">
			<Skeleton className="w-full h-80" />
			<Skeleton className="w-full h-80" />
		</div>
	);
}
