import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import Metrics from "./metrics";

export default function Dashboard() {
	useUi({ title: "Overview" });

	return (
		<AppContainer>
			<Metrics />
		</AppContainer>
	);
}
