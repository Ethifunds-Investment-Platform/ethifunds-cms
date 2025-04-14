import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import Metrics from "./metrics";
import RecentTransactions from "./recent-transactions";

export default function Transactions() {
	useUi({ title: "Transactions" });

	return (
		<AppContainer className="space-y-5">
			<Metrics />
			<RecentTransactions />
		</AppContainer>
	);
}
