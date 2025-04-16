import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";
import AdminDetails from "./admins/admin-details";
import UserDetails from "./users/user-details";

export default function UserAccountDetails() {
	const { queryParams } = useCustomNavigation();

	const isAdmin = React.useMemo(() => queryParams.has("section", "admins"), [queryParams]);

	if (isAdmin) return <AdminDetails />;
	return <UserDetails />;
}
