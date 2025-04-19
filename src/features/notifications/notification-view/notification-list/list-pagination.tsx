import Pagination from "@/components/ui/pagination";
import { PaginatedResponse } from "@/types/global.types";

export default function ListPagination<T>(props: PaginatedResponse<T>) {
	return (
		<div className="flex justify-center p-3 border rounded-lg">
			<Pagination {...props} />
		</div>
	);
}
