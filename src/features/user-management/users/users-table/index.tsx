import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import TableActions from "./table-actions";
import EmptyTransactions from "@/components/prompts/empty-transactions";
import classNames from "classnames";
import { User } from "@/types/user.types";

type TableProps = {
	data: User[];
	isEmpty: boolean;
};
export default function UsersTable(props: TableProps) {
	if (props.isEmpty) return <EmptyTransactions />;

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Date & Time </TableHead>
					<TableHead>Username</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Phone</TableHead>
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
							<TableCell className="">{item.email}</TableCell>
							<TableCell className="capitalize">{item.phone_number?item.phone_number:"N/A"}</TableCell>

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
