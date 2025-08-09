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
import { SavingsWithdrawal } from "@/types/savings.types";
import EmptyData from "@/components/empty-data";

type TableProps = {
	data: SavingsWithdrawal[];
	sign?: string;
	isEmpty: boolean;
};
export default function SavingsWithdrawalTable(props: TableProps) {
	if (props.isEmpty)
		return (
			<EmptyData
				title="No savings withdrawal record yet"
				text="all savings withdrawal record will appear here"
			/>
		);

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Date & Time </TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>User Account</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const date = new Date(item.requested_at);
					const statusClx = classNames("capitalize", {
						"text-yellow-500": item.status === "pending",
						"text-success-200": item.status !== "pending",
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
								{props.sign} {amountSeparator(item.amount)}
							</TableCell>
							<TableCell>{item.user.name}</TableCell>

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
