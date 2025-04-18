import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import TableActions from "./table-actions";
import classNames from "classnames";
import { Admin } from "@/types/admin.types";
import EmptyData from "@/components/empty-data";

type TableProps = {
	data: Admin[];
	isEmpty: boolean;
};
export default function AdminsTable(props: TableProps) {
	if (props.isEmpty) return <EmptyData title="No admin added yet"  />;

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Date & Time </TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Phone</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const date = new Date(item.created_at);
					const statusClx = classNames("capitalize", {
						"text-success-200": item.status === "active",
						"text-primary-500": item.status === "inactive",
						"text-error-200": item.status === "suspended",
					});
					const name = `${item.first_name} ${item.last_name}`;
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
							<TableCell className="capitalize">{name}</TableCell>
							<TableCell className="capitalize">{item.email}</TableCell>
							<TableCell className="capitalize">{item.phone_number}</TableCell>
							<TableCell className="capitalize">{item.role}</TableCell>
							<TableCell className={statusClx}>{item.status}</TableCell>
							<TableCell>
								<TableActions id={item.id.toString()} status={item.status} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
