import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import Metrics from "./metrics";
import RecentUsers from "./recent-users";

export default function Users() {
	useUi({ title: "Users" });

	return (
		<AppContainer className="space-y-5">
			<Metrics />
			<RecentUsers />
		</AppContainer>
	);
}
