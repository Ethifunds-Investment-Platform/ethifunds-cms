import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";
import useRecentUsers from "./use-recent-users";
import Render from "@/components/render";
import UsersTable from "../users-table";

export default function RecentUsers() {
	const { isFetching, isError, error, data } = useRecentUsers();

	return (
		<div className="space-y-5">
			<ErrorBoundary>
				<div className="flex items-center justify-between px-1">
					<h1 className="highlight-accent text-neutral-1000">Recent Users</h1>
					{data && data?.length > 0 && (
						<Link to={`/users/all-users`} className="text-primary underline">
							View All
						</Link>
					)}
				</div>

				<div className="h-full max-h-96 min-h-60 overflow-auto">
					<Render isLoading={isFetching} isError={isError} error={error}>
						<UsersTable data={data ?? []} isEmpty={!data?.length} />
					</Render>
				</div>
			</ErrorBoundary>
		</div>
	);
}
