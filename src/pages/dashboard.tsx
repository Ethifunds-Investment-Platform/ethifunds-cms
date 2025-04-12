import Dashboard from "@/features/dashboard";
import useSeo from "@/hooks/use-seo";

export default function DashboardPage() {
	useSeo({ pageTitle: "Dashboard" });
	return <Dashboard />;
}
