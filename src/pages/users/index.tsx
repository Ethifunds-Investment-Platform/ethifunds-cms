import Users from "@/features/users";
import useSeo from "@/hooks/use-seo";

export default function UsersPage() {
	useSeo({ pageTitle: "Users" });
	return <Users />;
}
