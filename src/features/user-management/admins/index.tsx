import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import Metrics from "./metrics";
import ManagementTabSwitch from "../management-tab-switch";
import AllAdmins from "./all-admins";

export default function Admins() {
	useUi({ title: "Admins" });

	return (
		<AppContainer className="space-y-5 relative">
			<ManagementTabSwitch />
			<Metrics />
			<AllAdmins />
		</AppContainer>
	);
}
