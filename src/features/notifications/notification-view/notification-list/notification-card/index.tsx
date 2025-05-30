import { Notification } from "@/types/notification.types";
import classNames from "classnames";

type NotificationCardProps = Notification & {
	onSelect: (data: Notification) => void;
	isActive: boolean;
};
export default function NotificationCard(props: NotificationCardProps) {
	const isActive = props.isActive;
	const cn = classNames(
		"flex flex-col gap-3 rounded-lg p-2 border cursor-pointer hover:bg-primary-100/30 transition-colors",
		{
			"bg-primary-100/30": isActive,
		}
	);

	const click = () => {
		props.onSelect(props);
	};

	return (
		<div onClick={click} className={cn}>
			<div className="flex justify-between items-start">
				<h1 className="capitalize content-accent">
					{props?.data?.type?.toLowerCase()?.split("_")?.join(" ")}{" "}
				</h1>
				<span>
					{new Date(props.created_at).toLocaleDateString("en-us", {
						dateStyle: "medium",
					})}
				</span>
			</div>

			<div>
				<p className="caption-standard text-neutral-700 line-clamp-2">{props?.data?.message}</p>
			</div>
		</div>
	);
}
