import ExportFilter from "@/components/table-filters/export-filter";
import { DateFilter } from "@/components/table-filters/date-filter";
import StatusFilter from "@/components/table-filters/status-filter";

export type FilterProps = {
	disabled: boolean;
};

export default function TableFilters(props: FilterProps) {
	return (
		<div className="flex items-center gap-3 overflow-auto py-1">
			<StatusFilter {...props} />
			<ExportFilter {...props} url="" />
			<DateFilter {...props} />
		</div>
	);
}
