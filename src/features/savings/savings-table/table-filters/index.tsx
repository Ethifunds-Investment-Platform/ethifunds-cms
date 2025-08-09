// import ExportFilter from "@/components/table-filters/export-filter";
import { DateFilter } from "@/components/table-filters/date-filter";
import StatusFilter from "@/components/table-filters/status-filter";

export type FilterProps = {
	disabled: boolean;
};

export default function TableFilters(props: FilterProps) {
	const statusList = [
		{
			name: "all",
			path: "all",
		},
		{
			name: "Active",
			path: "active",
		},
		{
			name: "completed",
			path: "completed",
		},
	];
	return (
		<div className="flex overflow-auto gap-3 items-center py-1">
			<StatusFilter {...props} statusList={statusList} />
			{/* <ExportFilter {...props} url="" /> */}
			<DateFilter {...props} />
		</div>
	);
}
