import AllNotifications from "@/features/notifications/all-notifications";
import useSeo from "@/hooks/use-seo";

export default function AllNotificationsPage() {
	useSeo({ pageTitle: "All Notifications" });
	return <AllNotifications />;
}
