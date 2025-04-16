import AllUsers from "@/features/user-management/users/all-users";
import useSeo from "@/hooks/use-seo";

export default function AllUsersPage() {
	useSeo({ pageTitle: "All Users" });
	return <AllUsers />;
}
