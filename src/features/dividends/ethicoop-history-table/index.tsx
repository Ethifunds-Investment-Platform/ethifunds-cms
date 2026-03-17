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
import { EthicoopDividendRecord } from "@/types/dividend.types";

type Props = {
	data: EthicoopDividendRecord[];
	isEmpty: boolean;
};

function getUserName(record: EthicoopDividendRecord): string {
	const profile = record.user?.user_profile;
	if (profile) return `${profile.first_name} ${profile.last_name}`;
	return record.user?.email ?? "N/A";
}

export default function EthicoopHistoryTable(props: Props) {
	if (props.isEmpty)
		return (
			<EmptyData
				title="No Dividend Records"
				text="No ethicoop dividend records found for this filter"
			/>
		);

	return (
		<Table>
			<TableHeader className="!bg-neutral-100/50">
				<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
					<TableHead>Date</TableHead>
					<TableHead>User</TableHead>
					<TableHead>Quarter</TableHead>
					<TableHead>Capital Start</TableHead>
					<TableHead>Capital End</TableHead>
					<TableHead>ROI %</TableHead>
					<TableHead>Dividend</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const date = new Date(item.paid_at);
					const quarterLabel = item.quarter
						? `${item.quarter.year} Q${item.quarter.quarter}`
						: "N/A";

					return (
						<TableRow
							key={item.id}
							className="caption-standard whitespace-nowrap text-center !text-neutral-700"
						>
							<TableCell>
								{date.toLocaleDateString("en-us", { dateStyle: "medium" })}
							</TableCell>
							<TableCell className="capitalize">{getUserName(item)}</TableCell>
							<TableCell>{quarterLabel}</TableCell>
							<TableCell>{amountSeparator(item.capital_start)}</TableCell>
							<TableCell>{amountSeparator(item.capital_end)}</TableCell>
							<TableCell>{item.roi_percent}%</TableCell>
							<TableCell>{amountSeparator(item.dividend_amount)}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
