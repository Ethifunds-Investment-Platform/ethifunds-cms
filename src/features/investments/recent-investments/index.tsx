import InvestmentTable from "../investment-table";
import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";
import useRecentInvestment from "./use-recent-transactions";
import Render from "@/components/render";

export default function RecentInvestments() {
	const { isFetching, isError, error, data, category_id, sign } = useRecentInvestment();

	return (
		<div className="space-y-5 ">
			<ErrorBoundary>
				<div className="flex items-center justify-between px-1">
					<h1 className="highlight-accent text-neutral-1000">Recent Investments </h1>
					{data && data?.length > 0 && (
						<Link
							to={`/investments/all-investments${category_id && `?category_id=${category_id}`}`}
							className="text-primary underline"
						>
							View All
						</Link>
					)}
				</div>

				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="h-full max-h-96 min-h-60 overflow-auto">
						<InvestmentTable data={data ?? []} isEmpty={!data?.length} sign={sign} />
					</div>
				</Render>
			</ErrorBoundary>
		</div>
	);
}
