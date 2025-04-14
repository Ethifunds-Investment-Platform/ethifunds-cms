import AppContainer from "@/components/container/container";                                                                                                                                                                                                                                                                                                                                                                                                                                                
import useUi from "@/hooks/use-ui";
import * as React from "react";
import useDetails from "./use-details";
import { Skeleton } from "@/components/ui/skeleton";
import Render from "@/components/render";
import { TransactionHeader } from "./transaction-header";
import { TransactionInformation } from "./transaction-information";

export default function TransactionDetails() {
	const { changeBackBtn } = useUi({});

	const { isFetching, isError, error, data } = useDetails();

	React.useLayoutEffect(() => {
		changeBackBtn({
			show: true,
		});

		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);
	return (
		<AppContainer>
			<h1 className="highlight-accent">Transaction Summary</h1>
			<div className="mt-5 rounded-lg border  space-y-5 p-5">
				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingComponent={LoadingComponent}
				>
					{data && (
						<React.Fragment>
							<TransactionHeader status={data.status} amount={data.amount} />
							<h3 className="border-b pb-2 highlight-accent">Transaction Information</h3>

							<TransactionInformation {...data} />
						</React.Fragment>
					)}
				</Render>
			</div>
		</AppContainer>
	);
}

function LoadingComponent() {
	return (
		<div className="space-y-5">
			<Skeleton className="h-20" />

			<Skeleton className="h-60" />
		</div>
	);
}
