import { Switch } from "@/components/ui/switch";
import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";

export default function SaleOptionSwitch() {
	const { navigate, queryParams } = useCustomNavigation();

	const checked = React.useMemo(() => queryParams.has("sale_option"), [queryParams]);

	const change = () => {
		if (checked) {
			return navigate("");
		}
		navigate("?sale_option=ethifunds");
	};
	return (
		<div className="flex items-center gap-3">
			<small>All Listings</small>
			<Switch checked={checked} onCheckedChange={change} />
			<small>Ethifunds Listings</small>
		</div>
	);
}
