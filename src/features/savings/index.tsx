import AppContainer from "@/components/container/container";
import SavingsTabs from "./savings-tabs";
import CreateSavingsButton from "./create-savings-button";

export default function Savings() {
	return (
		<AppContainer className="space-y-5">
			<CreateSavingsButton />
			<SavingsTabs />
		</AppContainer>
	);
}
