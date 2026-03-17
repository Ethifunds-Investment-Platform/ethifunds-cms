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
import { EthicoopQuarterSummary } from "@/types/dividend.types";

type Props = {
	data: EthicoopQuarterSummary[];
	isEmpty: boolean;
};

export default function EthicoopSummaryTable(props: Props) {
	if (props.isEmpty)
		return (
			<EmptyData
				title="No Dividend Records"
				text="No ethicoop dividends have been disbursed yet"
			/>
		);

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Quarter</TableHead>
					<TableHead>Period</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>ROI %</TableHead>
					<TableHead>Recipients</TableHead>
					<TableHead>Total Disbursed</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const statusClx = classNames("capitalize", {
						"text-success-200": item.status === "closed",
						"text-primary-500": item.status === "open",
					});

					return (
						<TableRow
							key={item.quarter_id}
							className="caption-standard whitespace-nowrap text-center !text-neutral-700"
						>
							<TableCell className="font-medium">{item.label}</TableCell>
							<TableCell>
								{item.start_date && item.end_date
									? `${new Date(item.start_date).toLocaleDateString("en-us", { dateStyle: "medium" })} - ${new Date(item.end_date).toLocaleDateString("en-us", { dateStyle: "medium" })}`
									: "N/A"}
							</TableCell>
							<TableCell className={statusClx}>{item.status}</TableCell>
							<TableCell>{item.roi_percent}%</TableCell>
							<TableCell>{amountSeparator(item.recipients)}</TableCell>
							<TableCell>{amountSeparator(item.total_disbursed.toFixed(2))}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
