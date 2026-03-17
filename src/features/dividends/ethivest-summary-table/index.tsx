import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { amountSeparator } from "@/lib/amount-separator";
import EmptyData from "@/components/empty-data";
import classNames from "classnames";
import { EthivestProductSummary } from "@/types/dividend.types";
import { Link } from "react-router-dom";

type Props = {
	data: EthivestProductSummary[];
	isEmpty: boolean;
};

export default function EthivestSummaryTable(props: Props) {
	if (props.isEmpty)
		return (
			<EmptyData
				title="No Dividend Records"
				text="No ethivest dividends have been disbursed yet"
			/>
		);

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Product</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Expected ROI</TableHead>
					<TableHead>Payout Rounds</TableHead>
					<TableHead>Recipients</TableHead>
					<TableHead>Total Disbursed</TableHead>
					<TableHead>Last ROI %</TableHead>
					<TableHead>Last Paid</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const statusClx = classNames("capitalize", {
						"text-success-200": item.product_status === "active",
						"text-primary-500": item.product_status === "inactive",
						"text-neutral-500": item.product_status === "draft",
					});

					return (
						<TableRow
							key={item.product_id}
							className="caption-standard whitespace-nowrap text-center !text-neutral-700"
						>
							<TableCell className="capitalize">{item.product_name}</TableCell>
							<TableCell className={statusClx}>{item.product_status}</TableCell>
							<TableCell>{item.expected_roi}%</TableCell>
							<TableCell>{item.payout_rounds}</TableCell>
							<TableCell>{amountSeparator(item.total_recipients)}</TableCell>
							<TableCell>{amountSeparator(item.total_disbursed.toFixed(2))}</TableCell>
							<TableCell>{item.last_roi_percent}%</TableCell>
							<TableCell>
								{item.last_paid_at
									? new Date(item.last_paid_at).toLocaleDateString("en-us", {
											dateStyle: "medium",
										})
									: "N/A"}
							</TableCell>
							<TableCell>
								<Link
									to={`/dividends/product/${item.product_id}`}
									className="text-primary underline text-xs"
								>
									View History
								</Link>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
