import AppContainer from "@/components/container/container";
import CreateSavingsButton from "./create-savings-button";
import useUi from "@/hooks/use-ui";
import SavingsWithdrawals from "./savings-withdrawals";
import Metrics from "./metrics";

export default function Savings() {
	useUi({ title: "Savings" });

	return (
		<AppContainer className="relative space-y-20">
			<Metrics />
			<CreateSavingsButton />
			<SavingsWithdrawals />
		</AppContainer>
	);
}
