import * as React from "react";

import AppContainer from "@/components/container/container";
import Metrics from "./metrics";
import useUi from "@/hooks/use-ui";
import RecentNotifications from "./recent-notifications";
import useActions from "@/store/actions";
import AppButton from "@/components/app-button";

export default React.memo(function Notifications() {
	useUi({ title: "Notifications" });

	const { ui } = useActions();

	const click = () => {
		ui.changeDialog({
			show: true,
			type: "new_notification",
		});
	};

	return (
		<AppContainer className="space-y-5 relative">
			<AppButton variant="primary" className="absolute -top-8 right-6" onClick={click}>
				Create New Notification
			</AppButton>
			<Metrics />
			<RecentNotifications />
		</AppContainer>
	);
});
