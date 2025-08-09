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
import { SavingsContributor } from "@/types/savings.types";
import EmptyData from "@/components/empty-data";

type TableProps = {
	data: SavingsContributor[];
	sign?: string;
	isEmpty: boolean;
};
export default function ContributorsTable(props: TableProps) {
	if (props.isEmpty)
		return <EmptyData title="No contributors yet" text="all contributors will appear here" />;

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Date & Time </TableHead>
					<TableHead>Username</TableHead>
					<TableHead>Amount Contributed</TableHead>
					<TableHead>Last Contributed</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const date = new Date(item.created_at);
					const lastContributionDate = new Date(item.last_contribution_date);
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
							<TableCell>{item.user.username}</TableCell>
							<TableCell>
								{props.sign} {amountSeparator(item.amount_contributed)}
							</TableCell>
							<TableCell>
								{" "}
								{lastContributionDate.toLocaleDateString("en-us", {
									dateStyle: "medium",
								})}{" "}
								{lastContributionDate.toLocaleTimeString("en-us", {
									timeStyle: "short",
								})}
							</TableCell>
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
