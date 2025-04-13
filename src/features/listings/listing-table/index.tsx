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
import { Listing } from "@/types/listing.types";
import EmptyData from "@/components/empty-data";

type TableProps = {
	data: Listing[];
	sign?: string;
	isEmpty: boolean;
};
export default function ListingTable(props: TableProps) {
	if (props.isEmpty)
		return (
			<EmptyData
				title="No Listing Yet"
				text="All listing would be recorded here, come back later."
			/>
		);

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Date & Time </TableHead>
					<TableHead>Seller Name</TableHead>
					<TableHead>Units </TableHead>
					<TableHead>Product Name</TableHead>
					<TableHead>Sale price</TableHead>
					<TableHead>Asking Price</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const date = new Date(item.created_at);
					const statusClx = classNames("capitalize", {
						"text-success-200": item.status === "approved",
						"text-primary-500": item.status === "pending",
						"text-error-200": item.status === "rejected",
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
							<TableCell className="capitalize">{item?.seller_info?.name}</TableCell>
							<TableCell className="capitalize">{amountSeparator(item.units)}</TableCell>
							<TableCell className="capitalize">{item?.product?.name}</TableCell>

							<TableCell>
								{props.sign} {amountSeparator(item?.final_price_per_unit)}
							</TableCell>
							<TableCell>
								{props.sign} {amountSeparator(item?.asking_price_per_unit)}
							</TableCell>

							<TableCell className={statusClx}>{item.status}</TableCell>
							<TableCell>
								<TableActions id={item.id.toString()} sale_option={item.sale_option} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
