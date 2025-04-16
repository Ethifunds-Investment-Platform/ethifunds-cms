import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ActivityLog } from "@/types/user.types";
import EmptyData from "@/components/empty-data";

type TableProps = {
	data: ActivityLog[];
	sign?: string;
	isEmpty: boolean;
};
export default function ActivityLogTable(props: TableProps) {
	if (props.isEmpty)
		return (
			<EmptyData
				title="No Activity Log"
				text="No User activity yet, all user activities will be logged here."
			/>
		);

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Date & Time </TableHead>
					<TableHead>Activity Type</TableHead>
					<TableHead>Status Code</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const date = new Date(item.activity_date);

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
							<TableCell className="capitalize">{item.activity_type}</TableCell>
							<TableCell className="capitalize">{item.status_code}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
