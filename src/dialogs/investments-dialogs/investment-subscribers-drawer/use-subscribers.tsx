import getInvestmentSubscribers from "@/services/investments/get-investment-subscribers";
import useAppSelectors from "@/store/use-app-selectors";
import useActions from "@/store/actions";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";

export default function useSubscribers() {
	const { dialog } = useAppSelectors("ui");
	const { currency } = useAppSelectors("account");
	const { ui } = useActions();

	const open = React.useMemo(
		() => dialog.show && dialog.type === "view_investment_subscribers",
		[dialog.show, dialog.type]
	);

	const { isFetching, isError, error, data: subscribers } = useQuery(
		["investment-subscribers", dialog.id],
		() => getInvestmentSubscribers({ id: dialog.id }),
		{
			enabled: open,
		}
	);

	const toggleDrawer = (value: boolean) => {
		ui.changeDialog({
			show: value,
			type: "",
		});
	};

	const closeDrawer = () => {
		toggleDrawer(false);
	};

	return {
		open,
		isFetching,
		isError,
		error,
		subscribers,
		sign: currency.sign,
		toggleDrawer,
		closeDrawer,
	};
}
