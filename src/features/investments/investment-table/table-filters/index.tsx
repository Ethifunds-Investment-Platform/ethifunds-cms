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
		{
			name: "Draft",
			path: "draft",
		},
	];

	return (
		<div className="flex overflow-auto gap-3 items-center py-1">
			{/* <TransactionTypeFilter {...props} /> */}
			{/* <CurrencyFilter {...props} /> */}
			<StatusFilter {...props} statusList={options} />
			{/* <ExportFilter {...props} url="" /> */}
			<DateFilter {...props} />
		</div>
	);
}
