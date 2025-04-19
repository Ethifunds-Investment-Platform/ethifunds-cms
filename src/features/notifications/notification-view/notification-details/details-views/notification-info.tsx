import * as React from "react";
import ErrorBoundary from "@/components/error-boundary";
import { Notification } from "@/types/notification.types";

export default React.memo(function NotificationInfo(data: Notification) {
	const info = data.data;

	if (!info) return;

	return (
		<ErrorBoundary>
			<div className="space-y-5">
				<p className="content-standard text-neutral-700">{info.message}</p>
			</div>
		</ErrorBoundary>
	);
});
