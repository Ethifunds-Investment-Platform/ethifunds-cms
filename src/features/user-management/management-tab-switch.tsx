import { Switch } from "@/components/ui/switch";
import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";

export default function ManagementTabSwitch() {
	const { queryParams } = useCustomNavigation();

	const checked = React.useMemo(() => queryParams.has("section", "admins"), [queryParams]);

	const change = () => {
		if (checked) return queryParams.delete("section");
		queryParams.set("section", "admins");
	};
	return (
		<div className="flex items-center gap-3 absolute -top-8 right-6 highlight-bold">
			<small>Users</small>
			<Switch checked={checked} onCheckedChange={change} />
			<small>Admins</small>
		</div>
	);
}
