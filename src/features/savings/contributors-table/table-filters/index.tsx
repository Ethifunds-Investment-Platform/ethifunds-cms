import { DateFilter } from "@/components/table-filters/date-filter";
import TableSearchBar from "./table-search-bar";

export type FilterProps = {
	disabled: boolean;
};

export default function TableFilters(props: FilterProps) {
	return (
		<div className="flex overflow-auto gap-3 items-center py-1">
			<TableSearchBar {...props} />

			{/* <ExportFilter {...props} url="" /> */}
			<DateFilter {...props} />
		</div>
	);
}
