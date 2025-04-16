import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";
import Admins from "./admins";
import Users from "./users";

export default function UsersManagement() {
	const { queryParams } = useCustomNavigation();

	const isAdmin = React.useMemo(() => queryParams.has("section", "admins"), [queryParams]);

	if (isAdmin) return <Admins />;
	return <Users />;
}
