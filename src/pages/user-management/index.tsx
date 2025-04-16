import UsersManagement from "@/features/user-management";

import useSeo from "@/hooks/use-seo";

export default function UsersManagementPage() {
	useSeo({ pageTitle: "Users Management" });
	return <UsersManagement />;
}
