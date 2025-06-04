import AppContainer from "@/components/container/container";
import SavingsTabs from "./savings-tabs";
import CreateSavingsButton from "./create-savings-button";
import useUi from "@/hooks/use-ui";

export default function Savings() {
	useUi({ title: "Savings" });
	
	return (
		<AppContainer className="space-y-5">
			<CreateSavingsButton />
			<SavingsTabs />
		</AppContainer>
	);
}
