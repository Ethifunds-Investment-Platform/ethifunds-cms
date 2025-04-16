import Pagination from "@/components/ui/pagination";
import { PaginatedResponse } from "@/types/global.types";

export default function TablePagination<T>(props: PaginatedResponse<T>) {
	return (
		<div className="flex justify-center pt-3">
			<Pagination {...props} />
		</div>
	);
}
