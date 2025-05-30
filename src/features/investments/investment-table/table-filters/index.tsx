import { DateFilter } from "@/components/table-filters/date-filter";
import StatusFilter from "@/components/table-filters/status-filter";

export type FilterProps = {
  disabled: boolean;
};
export default function TableFilters(props: FilterProps) {
  
  const options = [
		{
			name: "All",
			path: "all",
		},
		{
			name: "Active",
			path: "active",
		},
		{
			name: "Inactive",
			path: "inactive",
		},
	];

	return (
		<div className="flex items-center gap-3 py-1 overflow-auto">
			{/* <TransactionTypeFilter {...props} /> */}
			{/* <CurrencyFilter {...props} /> */}
			<StatusFilter {...props} statusList={options} />
			{/* <ExportFilter {...props} url="" /> */}
			<DateFilter {...props} />
		</div>
	);
}
