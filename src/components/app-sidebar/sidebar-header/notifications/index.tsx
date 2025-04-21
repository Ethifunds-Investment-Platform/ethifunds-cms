import { Badge } from "@/components/ui/badge";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import { BellPlus } from "lucide-react";

import * as React from "react";

export default React.memo(function Notifications() {
	const { notifications } = useAppSelectors("notification");
	const [showIndicator, setShowIndicator] = React.useState(false);

	const { ui } = useActions();

	const createNotification = () => {
		ui.changeDialog({ show: true, type: "new_notification" });
	};

	React.useMemo(() => {
		setShowIndicator(notifications.some((item) => !item.read_at));
	}, [notifications]);

	return (
		<button
			onClick={createNotification}
			className="button-ghost relative flex size-10 items-center justify-center rounded-full bg-primary-100 p-2.5"
		>
			{showIndicator && (
				<Badge className="absolute right-0 top-0 !size-2.5 rounded-full bg-error-200 p-0" />
			)}
			<BellPlus className="text-primary-600" />
		</button>
	);
});
