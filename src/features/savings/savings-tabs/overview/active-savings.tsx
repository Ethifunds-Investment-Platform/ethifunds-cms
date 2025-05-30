import { Skeleton } from "@/components/ui/skeleton";
import getActiveCycle from "@/services/savings/get-active-cycle";
import { useQuery } from "@tanstack/react-query";
import SavingsInfo from "@/features/savings/savings-details/savings-info";

export default function ActiveSavings() {
	const { isFetching, isError, error, data } = useQuery(["active-cycle"], () => getActiveCycle());

	return (
		<SavingsInfo
			isFetching={isFetching}
			isError={isError}
			error={error}
			data={data}
			loadingComponent={<LoadingComponent />}
		/>
	);
}

function LoadingComponent() {
	return (
		<div className="flex justify-between gap-5 flex-wrap lg:flex-nowrap">
			<Skeleton className="h-80 w-3/5" />
			<Skeleton className="h-60 w-2/5" />
		</div>
	);
}
