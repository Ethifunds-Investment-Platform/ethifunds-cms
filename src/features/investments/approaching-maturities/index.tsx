import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { amountSeparator } from "@/lib/amount-separator";
import getApproachingMaturities from "@/services/investments/get-approaching-maturities";
import EmptyData from "@/components/empty-data";
import Render from "@/components/render";

const urgencyStyles = {
	critical: "bg-red-100 text-red-700 border-red-300",
	warning: "bg-amber-100 text-amber-700 border-amber-300",
	info: "bg-blue-100 text-blue-700 border-blue-300",
};

const urgencyLabels = {
	critical: "\u2264 7 days",
	warning: "\u2264 30 days",
	info: "\u2264 90 days",
};

export default React.memo(function ApproachingMaturities() {
	const { data, isFetching, isError, error } = useQuery(
		["approaching-maturities"],
		() => getApproachingMaturities({ days: 90 }),
	);

	if (!isFetching && (!data || data.length === 0)) return null;

	return (
		<div className="space-y-3">
			<h2 className="content-accent">Approaching Maturities</h2>
			<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
				<div className="border rounded-lg overflow-auto">
					<Table>
						<TableHeader className="!bg-neutral-100/50">
							<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
								<TableHead>Product</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Maturity Date</TableHead>
								<TableHead>Days Left</TableHead>
								<TableHead>Subscribers</TableHead>
								<TableHead>Total Value</TableHead>
								<TableHead>Urgency</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((item) => (
								<TableRow
									key={item.product_id}
									className="caption-standard whitespace-nowrap text-center !text-neutral-700"
								>
									<TableCell>{item.product_name}</TableCell>
									<TableCell>{item.category_name}</TableCell>
									<TableCell>{item.earliest_maturity_date}</TableCell>
									<TableCell>{item.days_remaining}</TableCell>
									<TableCell>{item.total_subscribers}</TableCell>
									<TableCell>{amountSeparator(item.total_value)}</TableCell>
									<TableCell>
										<span className={`text-xs px-2 py-1 rounded-full border ${urgencyStyles[item.urgency]}`}>
											{urgencyLabels[item.urgency]}
										</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</Render>
		</div>
	);
});
