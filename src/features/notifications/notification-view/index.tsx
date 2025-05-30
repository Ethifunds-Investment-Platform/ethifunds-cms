import { PaginatedResponse } from "@/types/global.types";
import NotificationList from "./notification-list";
import { Notification } from "@/types/notification.types";
import NotificationDetails from "./notification-details";
import * as React from "react";
import classNames from "classnames";

export type NotificationViewProps = {
	data: Notification[];
	pagination?: PaginatedResponse<Notification>;
	className?: string;
};

export default function NotificationView(props: NotificationViewProps) {
	const [details, setDetails] = React.useState<Notification | null>(null);
	const [activeId, setActiveId] = React.useState("");


	const onSelect = (data: Notification) => {
		setDetails(data);
		setActiveId(data?.id?.toString() ?? "");
	};

	const cn = classNames(
		"flex gap-5 w-full  [&_div]:first:w-2/5  [&_div]:last:w-full h-96",
		props.className
	);
	return (
		<div className={cn}>
			<NotificationList {...props} onSelect={onSelect} activeId={activeId}  />
			<NotificationDetails details={details} />
		</div>
	);
}
