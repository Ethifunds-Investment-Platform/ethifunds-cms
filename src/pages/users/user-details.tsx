import UserDetails from "@/features/users/user-details";
import useSeo from "@/hooks/use-seo";

export default function UserDetailsPage() {
	useSeo({ pageTitle: "User Details" });
	return <UserDetails />;
}
