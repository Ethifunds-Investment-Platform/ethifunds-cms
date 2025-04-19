import Notifications from "@/features/notifications";
import useSeo from "@/hooks/use-seo";

export default function NotificationsPage() {
	useSeo({ pageTitle: "Notifications" });
	return <Notifications />;
}
