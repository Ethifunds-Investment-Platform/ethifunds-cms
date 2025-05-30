import { Notification } from "@/types/notification.types";
import NotificationCard from "./notification-card";
import classNames from "classnames";
import * as React from "react";
import { NotificationViewProps } from "..";

export default React.memo(function NotificationList(
	props: NotificationViewProps & { onSelect: (data: Notification) => void; activeId: string }
) {
	const cn = classNames("flex flex-col gap-3 p-3 border rounded-lg");

	return (
		<div className={cn}>
			<div className="space-y-3 w-full overflow-auto">
				{props.data.map((item) => (
					<NotificationCard
						key={item.id}
						{...item}
						onSelect={props.onSelect}
						isActive={props.activeId === item.id.toString()}
					/>
				))}
			</div>
			{/* {props.pagination && <ListPagination {...props.pagination} />} */}
		</div>
	);
});
