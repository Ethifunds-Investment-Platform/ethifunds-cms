import Render from "@/components/render";
import useAccountBalances from "./use-account-balances";
import ErrorBoundary from "@/components/error-boundary";
import { SkeletonList } from "@/components/ui/skeleton";
import { amountSeparator } from "@/lib/amount-separator";

export default function AccountBalances() {
	const { isFetching, isError, error, sign, balances } = useAccountBalances();

	const data = Object.entries(balances).filter(item=>item[1]>0);

	return (
		<div className="grid grid-cols-4 gap-4">
			<ErrorBoundary>
				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingComponent={<SkeletonList className="h-10" count={data.length} />}
				>
					{data.map(([key, value], idx) => {
						return (
							<div key={idx}>
								<span className="capitalize caption-standard text-neutral-500">
									{key.split("_").join(" ")}
								</span>
								<h2 className="feature-bold">
									{" "}
									{sign} {amountSeparator(value)}
								</h2>
							</div>
						);
					})}
				</Render>
			</ErrorBoundary>
		</div>
	);
}
