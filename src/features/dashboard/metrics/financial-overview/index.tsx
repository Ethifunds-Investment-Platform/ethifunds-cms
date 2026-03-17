import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { amountSeparator } from "@/lib/amount-separator";
import getFinancialOverview from "@/services/dashboard/financial-overview";
import useCustomNavigation from "@/hooks/use-navigation";
import Render from "@/components/render";

function MetricCard({ label, value }: { label: string; value: string | number }) {
	return (
		<div className="p-4 border rounded-lg bg-white space-y-1">
			<p className="caption-standard text-neutral-500 capitalize">{label.split("_").join(" ")}</p>
			<p className="content-accent">{typeof value === "number" ? amountSeparator(value) : value}</p>
		</div>
	);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="space-y-3">
			<h3 className="text-sm font-semibold text-neutral-700">{title}</h3>
			<div className="grid grid-cols-2 lg:grid-cols-3 gap-3">{children}</div>
		</div>
	);
}

export default React.memo(function FinancialOverview() {
	const { queryParams } = useCustomNavigation();
	const period = queryParams.get("period") ?? undefined;

	const { data, isFetching, isError, error } = useQuery(
		["financial-overview", period],
		() => getFinancialOverview({ period }),
	);

	return (
		<div className="space-y-5">
			<h2 className="content-accent">Financial Overview</h2>
			<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
				{data && (
					<div className="space-y-5">
						<Section title="Assets Under Management">
							<MetricCard label="Total AUM" value={data.assets_under_management.total} />
							<MetricCard label="Investments" value={data.assets_under_management.investments} />
							<MetricCard label="Savings" value={data.assets_under_management.savings} />
						</Section>

						<Section title="Wallet Balances">
							{Object.entries(data.wallet_balances).map(([key, value]) => (
								<MetricCard key={key} label={key} value={value} />
							))}
						</Section>

						<Section title="Transaction Volume">
							<MetricCard label="Total Credits" value={data.transaction_volume.total_credits} />
							<MetricCard label="Total Debits" value={data.transaction_volume.total_debits} />
							<MetricCard label="Net Flow" value={data.transaction_volume.net_flow} />
							<MetricCard label="Transaction Count" value={data.transaction_volume.count.toLocaleString()} />
						</Section>

						<Section title="Dividends Paid">
							<MetricCard label="Ethivest Dividends" value={data.dividends.ethivest} />
							<MetricCard label="Ethicoop Dividends" value={data.dividends.ethicoop} />
							<MetricCard label="Total Dividends" value={data.dividends.total} />
						</Section>

						<Section title="Investment Performance">
							<MetricCard label="Total Invested" value={data.investment_performance.total_invested} />
							<MetricCard label="Profit Withdrawn" value={data.investment_performance.total_profit_withdrawn} />
							<MetricCard label="Interest Accrued" value={data.investment_performance.total_interest_accrued} />
						</Section>
					</div>
				)}
			</Render>
		</div>
	);
});
