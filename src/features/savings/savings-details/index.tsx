import AppContainer from "@/components/container/container";
import RecentSavingsTransactions from "./recent-savings-transactions";
import { useQuery } from "react-query";
import useCustomNavigation from "@/hooks/use-navigation";
import getSavingsDetails from "@/services/savings/get-savings-details";
import Render from "@/components/render";
import SavingsInfo from "./savings-info";
import * as React from "react";
import useUi from "@/hooks/use-ui";

export default function SavingsDetails() {
	const { changeBackBtn, } = useUi({ title: "Savings Details" });

	React.useLayoutEffect(() => {
		changeBackBtn({
			show: true,
		});

		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);
	const { params } = useCustomNavigation();

	const savings_id = params.savings_id ?? "";
	const { isFetching, isError, error, data } = useQuery(["savings-details", savings_id], () =>
		getSavingsDetails({ savings_id })
	);

	return (
		<AppContainer className="space-y-5">
			<SavingsInfo isFetching={isFetching} isError={isError} error={error} data={data} />

			<Render isLoading={isFetching} isError={isError} error={error}>
				<RecentSavingsTransactions data={data?.recent_transactions ?? []} />
			</Render>
		</AppContainer>
	);
}
