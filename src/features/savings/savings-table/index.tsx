import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { amountSeparator } from "@/lib/amount-separator";
import TableActions from "./table-actions";
import classNames from "classnames";
import { Savings } from "@/types/savings.types";
import EmptyData from "@/components/empty-data";

type TableProps = {
	data: Savings[];
	sign?: string;
	isEmpty: boolean;
};
export default function SavingsTable(props: TableProps) {
	if (props.isEmpty)
		return <EmptyData title="No savings record yet" text="all savings record will appear here" />;

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Date & Time </TableHead>
					<TableHead>Amount Raised</TableHead>
					<TableHead>Target Amount</TableHead>
					<TableHead>Rio%</TableHead>
					<TableHead>Contributors</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const date = new Date(item.start_date);
					const statusClx = classNames("capitalize", {
						"text-success-200": item.status === "active",
						"text-neutral-500": item.status !== "active",
					});
					return (
						<TableRow
							key={item.id}
							className="caption-standard whitespace-nowrap text-center !text-neutral-700"
						>
							<TableCell>
								{date.toLocaleDateString("en-us", {
									dateStyle: "medium",
								})}{" "}
								{date.toLocaleTimeString("en-us", {
									timeStyle: "short",
								})}
							</TableCell>
							<TableCell>
								{props.sign} {amountSeparator(item.amount_raised)}
							</TableCell>
							<TableCell>
								{props.sign} {amountSeparator(item.target_amount)}
							</TableCell>
							<TableCell>{item.roi}</TableCell>

							<TableCell>{amountSeparator(item.total_contributors)}</TableCell>

							<TableCell className={statusClx}>{item.status}</TableCell>
							<TableCell>
								<TableActions id={item.id.toString()} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
