import { DateFilter } from "@/components/table-filters/date-filter";
import StatusFilter from "@/components/table-filters/status-filter";
import TableSearchBar from "./table-search-bar";

export type FilterProps = {
	disabled: boolean;
};
export default function TableFilters(props: FilterProps) {
	const status = [
		{
			name: "all",
			path: "all",
		},
		{
			name: "active",
			path: "active",
		},
		{
			name: "inactive",
			path: "inactive",
		},
		{
			name: "suspended",
			path: "suspended",
		},
	];

	return (
		<div className="flex items-center gap-3 overflow-auto py-1">
			<TableSearchBar {...props} />
			<StatusFilter {...props} statusList={status} />
			<DateFilter {...props} />
		</div>
	);
}
