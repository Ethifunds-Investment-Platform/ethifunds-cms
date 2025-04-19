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
import { SavingsTransaction } from "@/types/savings.types";
import EmptyData from "@/components/empty-data";

type TableProps = {
	data: SavingsTransaction[];
	sign?: string;
	isEmpty: boolean;
};
export default function SavingsTransactionTable(props: TableProps) {
	if (props.isEmpty)
		return (
			<EmptyData
				title="No savings transactions record yet"
				text="all savings transactions record will appear here"
			/>
		);

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Date & Time </TableHead>
					<TableHead>Username</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Target Amount</TableHead>
					<TableHead>Amount Paid</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const date = new Date(item.transaction_date);
					const statusClx = classNames("capitalize", {
						"text-success-200": item.status === "success",
						"text-primary-500": item.status === "pending",
						"text-error-200": item.status === "failed",
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
							<TableCell className="capitalize">{item.username}</TableCell>
							<TableCell>
								{props.sign} {amountSeparator(item.amount)}
							</TableCell>
							<TableCell>
								{props.sign} {amountSeparator(item.target_amount)}
							</TableCell>
							<TableCell>
								{props.sign} {amountSeparator(item.amount_paid)}
							</TableCell>

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
