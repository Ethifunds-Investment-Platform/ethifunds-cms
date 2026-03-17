import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import DividendMetrics from "./metrics";
import DividendTabs from "./dividend-tabs";

export default function Dividends() {
	useUi({ title: "Dividends" });

	return (
		<AppContainer className="space-y-5">
			<DividendMetrics />
			<DividendTabs />
		</AppContainer>
	);
}
