import { Notification } from "@/types/notification.types";
import NotificationIcon from "./notification-icon";

type HeaderProps = {
	type: Notification["data"]["type"];
	date: string;
};

export default function NotificationHeader(props: HeaderProps) {
	return (
		<div className="flex items-center justify-between ">
			<div className="flex items-center gap-3 w-full">
				<NotificationIcon type={props.type} />

				<h1 className="capitalize content-accent">
					{props.type.toLowerCase().split("_").join(" ")}{" "}
				</h1>
			</div>
				<small className="content-accent text-neutral-700 w-1/3">
					{new Date(props.date).toLocaleDateString("en-us", {
						dateStyle: "medium",
					})}
				</small>
		</div>
	);
}
