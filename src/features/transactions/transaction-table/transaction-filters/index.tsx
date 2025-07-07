import ExportFilter from "@/components/table-filters/export-filter";
import { DateFilter } from "@/components/table-filters/date-filter";
import StatusFilter from "@/components/table-filters/status-filter";
import TransactionTypeFilter from "@/components/table-filters/transaction-type-filter";

export type FilterProps = {
  disabled: boolean;
};
export default function TransactionFilters(props: FilterProps) {
	const statusList = [
		{
			name: "all",
			path: "all",
		},
		{
			name: "completed",
			path: "success",
		},
		{
			name: "pending",
			path: "pending",
		},
		{
			name: "failed",
			path: "failed",
		},
	];

	return (
		<div className="flex overflow-auto gap-3 items-center py-1">
			<TransactionTypeFilter {...props} />
			{/* <CurrencyFilter {...props} /> */}
			<StatusFilter {...props} statusList={statusList} />
			<ExportFilter {...props} url="/transactions/export" />
			<DateFilter {...props} />
		</div>
	);
}
