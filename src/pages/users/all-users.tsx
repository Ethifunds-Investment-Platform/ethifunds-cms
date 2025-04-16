import AllUsers from "@/features/users/all-users";
import useSeo from "@/hooks/use-seo";

export default function AllUsersPage() {
	useSeo({ pageTitle: "All Users" });
	return <AllUsers />;
}
