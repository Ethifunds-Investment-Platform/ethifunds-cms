import { useQuery } from "@tanstack/react-query";
import getDividendMetrics from "@/services/dividends/get-dividend-metrics";
import { amountSeparator } from "@/lib/amount-separator";
import Render from "@/components/render";
import { SkeletonList } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/error-boundary";

function MetricCard({ title, value }: { title: string; value: string | number }) {
	return (
		<div className="text-neutral-1000 space-y-3 h-24 w-full rounded-lg p-3 border capitalize">
			<h1 className="content-accent">{title}</h1>
			<p className="hero-accent">{typeof value === "number" ? amountSeparator(value) : value}</p>
		</div>
	);
}

export default function DividendMetrics() {
	const { data, isFetching, isError, error } = useQuery(["dividend-metrics"], () =>
		getDividendMetrics()
	);

	const cards = [
		{ title: "Total Disbursed", value: data?.combined.total_disbursed ?? 0 },
		{ title: "Total Records", value: data?.combined.total_records ?? 0 },
		{ title: "Ethivest Disbursed", value: data?.ethivest.total_disbursed ?? 0 },
		{ title: "Products Paid", value: data?.ethivest.products_paid ?? 0 },
		{ title: "Ethicoop Disbursed", value: data?.ethicoop.total_disbursed ?? 0 },
		{ title: "Quarters Paid", value: data?.ethicoop.quarters_paid ?? 0 },
	];

	return (
		<ErrorBoundary>
			<Render
				isLoading={isFetching}
				isError={isError}
				error={error}
				loadingComponent={<SkeletonList count={6} className="h-24" />}
			>
				<div className="grid grid-cols-3 gap-3">
					{cards.map((item, idx) => (
						<MetricCard key={idx} {...item} />
					))}
				</div>
			</Render>
		</ErrorBoundary>
	);
}
