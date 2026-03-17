import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import Metrics from "./metrics";
import PeriodSelector from "./period-selector";

export default function Dashboard() {
	useUi({ title: "Overview" });

	return (
		<AppContainer>
			<div className="space-y-5">
				<PeriodSelector />
				<Metrics />
			</div>
		</AppContainer>
	);
}
