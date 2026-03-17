import Render from "@/components/render";
import TabContainer from "../../tab-container";
import useCustomNavigation from "@/hooks/use-navigation";
import getUserInvestments, { UserInvestment } from "@/services/users/get-user-investments";
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
import useAppSelectors from "@/store/use-app-selectors";
import EmptyData from "@/components/empty-data";

export default function UserInvestmentsTab() {
	const { params } = useCustomNavigation();
	const user_id = params.user_id ?? "";
	const { currency } = useAppSelectors("account");

	const { isFetching, isError, error, data } = useQuery(
		["user-investments", user_id],
		() => getUserInvestments({ user_id })
	);

	return (
		<TabContainer value={"investments"}>
			<div className="p-5">
				<Render isLoading={isFetching} isError={isError} error={error}>
					{data && data.length > 0 ? (
						<div className="border rounded-lg overflow-auto">
							<Table>
								<TableHeader className="!bg-neutral-100/50">
									<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
										<TableHead>Product</TableHead>
										<TableHead>Category</TableHead>
										<TableHead>Invested</TableHead>
										<TableHead>Units</TableHead>
										<TableHead>ROI</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Date</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data.map((item: UserInvestment) => (
										<TableRow
											key={item.id}
											className="caption-standard whitespace-nowrap text-center !text-neutral-700"
										>
											<TableCell className="capitalize">{item.product_name}</TableCell>
											<TableCell className="capitalize">{item.category_name}</TableCell>
											<TableCell>
												{currency.sign} {amountSeparator(item.total_invested)}
											</TableCell>
											<TableCell>{item.units_purchased}</TableCell>
											<TableCell>{amountSeparator(item.total_roi)}</TableCell>
											<TableCell>
												<span
													className={`capitalize text-xs px-2 py-1 rounded-full ${
														item.status === "active" || item.status === "Active"
															? "bg-success-100 text-success-300"
															: item.status === "completed" || item.status === "Completed"
																? "bg-primary-100 text-primary"
																: "bg-neutral-100 text-neutral-500"
													}`}
												>
													{item.status}
												</span>
											</TableCell>
											<TableCell>
												{item.created_at
													? new Date(item.created_at).toLocaleDateString("en-us", {
															dateStyle: "medium",
														})
													: "N/A"}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					) : (
						<EmptyData
							title="No Investments"
							text="This user has no investment records"
						/>
					)}
				</Render>
			</div>
		</TabContainer>
	);
}
