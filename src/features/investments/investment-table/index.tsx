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
import EmptyData from "@/components/empty-data";
import { InvestmentProduct } from "@/types/investment.types";
import truncate from "@/lib/truncate";

type TableProps = {
	data: InvestmentProduct[];
	sign?: string;
	isEmpty: boolean;
};
export default function InvestmentTable(props: TableProps) {
	if (props.isEmpty)
		return (
			<EmptyData
				title="No Investment Record"
				text="No investment created yet, all investment created would appear here"
			/>
		);

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Date & Time </TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Category</TableHead>
					<TableHead>Available Units</TableHead>
					<TableHead>Units Sold</TableHead>
					<TableHead>Unit Price</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const date = new Date(item.created_at);
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
							<TableCell className="capitalize">{truncate(item.name)}</TableCell>
							<TableCell className="capitalize">{truncate(item.category.name)}</TableCell>
							<TableCell>{amountSeparator(item.total_units)}</TableCell>
							<TableCell>{amountSeparator(item.units_sold)}</TableCell>
							<TableCell>
								{props.sign} {amountSeparator(item.unit_price)}
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
