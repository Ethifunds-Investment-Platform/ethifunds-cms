import AppContainer from "@/components/container/container";
import CreateSavingsButton from "./create-savings-button";
import useUi from "@/hooks/use-ui";
import SavingsTabs from "./savings-tabs";

export default function Savings() {
	useUi({ title: "Savings" });

	return (
		<AppContainer className="relative">
			<CreateSavingsButton />

			<SavingsTabs />
		</AppContainer>
	);
}
