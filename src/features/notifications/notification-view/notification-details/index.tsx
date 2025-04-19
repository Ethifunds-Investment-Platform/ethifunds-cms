type NotificationDetailsProps = {
	details: Notification | null;
};

import EmptyData from "@/components/empty-data";
import { Notification } from "@/types/notification.types";

import DetailsViews from "./details-views";
import NotificationHeader from "./notification-header";

export default function NotificationDetails(props: NotificationDetailsProps) {
	return (
		<div className="rounded-lg border p-4 flex overflow-auto">
			{!props.details ? (
				<EmptyData title="No record selected" text="Select a record to view details" />
			) : (
				<div className="space-y-3">
					<NotificationHeader type={props.details.data.type} date={props.details.created_at} />
					<DetailsViews {...props.details} />
					<div className="py-3" />
				</div>
			)}
		</div>
	);
}
