import { useQuery } from "@tanstack/react-query";
import useCustomNavigation from "@/hooks/use-navigation";
import getInvestmentSubscribers from "@/services/investments/get-investment-subscribers";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { amountSeparator } from "@/lib/amount-separator";
import Render from "@/components/render";
import classNames from "classnames";

export default function InvestmentSubscribers() {
	const { params } = useCustomNavigation();
	const id = params.investment_id ?? "";

	const { data, isFetching, isError, error } = useQuery(
		["investment-subscribers", id],
		() => getInvestmentSubscribers({ id }),
		{ enabled: !!id }
	);

	return (
		<div className="space-y-4">
			<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
				<div className="border rounded-lg overflow-auto">
					<Table>
						<TableHeader className="!bg-neutral-100/50">
							<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Capital Invested</TableHead>
								<TableHead>Units</TableHead>
								<TableHead>ROI Accrued</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Subscribed On</TableHead>
								<TableHead>Due Dividend Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((item) => {
								const statusClx = classNames("capitalize", {
									"text-success-200": item.status === "active",
									"text-error-200": item.status === "cancelled",
									"text-primary-500": item.status === "pending",
								});
								return (
									<TableRow
										key={item.id}
										className="caption-standard whitespace-nowrap text-center !text-neutral-700"
									>
										<TableCell>{item.username}</TableCell>
										<TableCell>{item.email}</TableCell>
										<TableCell>₦{amountSeparator(item.total_invested)}</TableCell>
										<TableCell>{item.units_purchased}</TableCell>
										<TableCell>₦{amountSeparator(item.interest_accrued)}</TableCell>
										<TableCell className={statusClx}>{item.status}</TableCell>
										<TableCell>
											{item.start_at
												? new Date(item.start_at).toLocaleDateString("en-us", { dateStyle: "medium" })
												: "—"}
										</TableCell>
										<TableCell>
											{item.next_payout_date
												? new Date(item.next_payout_date).toLocaleDateString("en-us", { dateStyle: "medium" })
												: "—"}
										</TableCell>
									</TableRow>
								);
							})}
							{!isFetching && (!data || data.length === 0) && (
								<TableRow>
									<TableCell colSpan={8} className="text-center text-neutral-400 py-8">
										No subscribers found.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</Render>
		</div>
	);
}
