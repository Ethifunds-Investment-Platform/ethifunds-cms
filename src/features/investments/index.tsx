import AppContainer from "@/components/container/container";
import InvestmentsTabs from "./investment-tabs";
import AppButton from "@/components/app-button";
import useActions from "@/store/actions";

export default function Investments() {
	const { ui } = useActions();

	const click = () => {
		ui.changeDialog({
			show: true,
			type: "create_investment",
		});
	};
	return (
		<AppContainer className="relative">
			<AppButton variant="primary" className="absolute -top-8 right-6" onClick={click}>
				Create New Investment
			</AppButton>
			<InvestmentsTabs />
		</AppContainer>
	);
}


