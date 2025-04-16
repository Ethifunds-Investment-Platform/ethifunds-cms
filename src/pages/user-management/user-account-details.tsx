import UserAccountDetails from "@/features/user-management/user-account-details";
import useSeo from "@/hooks/use-seo";

export default function UserAccountDetailsPage() {
	useSeo({ pageTitle: "User Account Details" });
	return <UserAccountDetails />;
}
