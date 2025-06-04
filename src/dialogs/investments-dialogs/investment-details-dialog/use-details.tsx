import { Badge } from "@/components/ui/badge";
import { amountSeparator } from "@/lib/amount-separator";
import getInvestmentDetails from "@/services/investments/get-investment-details";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import classNames from "classnames";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";

export default function useDetails() {
	const { dialog } = useAppSelectors("ui");
	const { currency } = useAppSelectors("account");

	const { ui } = useActions();

	const open = React.useMemo(
		() => dialog.show && dialog.type === "investment_details",
		[dialog.show, dialog.type]
	);

	const { isFetching, isError, error, data } = useQuery(
		["investment-details", dialog.id],
		() => getInvestmentDetails({ id: dialog.id }),
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

	const info = React.useMemo(() => {
		if (!data) return {};
		const statusClx = classNames("capitalize text-md px-4", {
			"bg-success-100 text-success-300 border-success-300": data.status === "active",
			"bg-warning-100 text-warning-300 border-warning-300": data.status === "inactive",
			"bg-neutral-100 text-neutral-300 border-neutral-300": data.status === "draft",
		});
		const infoData =
		 {
			category: data.category.name,
			unit_price: `${currency.sign} ${amountSeparator(data.unit_price)}`,
			total_units: amountSeparator(data.total_units),
			units_sold: amountSeparator(data.units_sold),
			RIO: data.expected_roi,
			tenor: `${data.tenor_value} ${data.tenor_unit}`,
			label: data?.product_label?.name,
			section: data?.product_section?.name,
			status: <Badge className={statusClx}>{data.status}</Badge>,
			funding_goal: `${currency.sign} ${amountSeparator(data.funding_goal)}`,
			amount_raised: `${currency.sign} ${amountSeparator(data.amount_raised)}`,
		};
		return Object.fromEntries(
			Object.entries(infoData).filter((entries) => entries[1] !== undefined)
		);
	}, [currency.sign, data]);

	const edit = () => {
		ui.changeDialog({
			show: true,
			type: "edit_investment",
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
		data,
		info,
		toggleDrawer,
		edit,
		closeDrawer,
	};
}
