import * as React from "react";
import { amountSeparator } from "@/lib/amount-separator";
import ErrorBoundary from "@/components/error-boundary";
import useAppSelectors from "@/store/use-app-selectors";
import { InvestmentProductNotification, Notification } from "@/types/notification.types";

export default React.memo(function NotificationProduct(data: Notification) {
	const { currency } = useAppSelectors("account");

	const notificationData = data.data;

	if (!notificationData?.product) return;

	const details = notificationData.product as InvestmentProductNotification;

	const productDetails = {
		date: new Date(details?.created_at ?? "").toLocaleDateString("en-us", {
			dateStyle: "full",
		}),
		investment_type: details.category.display_title,
		investment_name: details.name,
		unit_price: `${currency.code} ${amountSeparator(details.unit_price)}`,
		RIO: details.expected_roi,
		available_units: `${currency.sign} ${details.total_units}`,
		created_by: details.custodian.name,
		status: details?.status || "",
	};

	return (
		<ErrorBoundary>
			<div className="flex flex-col gap-8">
				<p className="content-standard text-neutral-700">{data?.data?.message}</p>
				<div className="space-y-5 rounded-lg border bg-neutral-50 p-3">
					{Object.entries(productDetails).map(([key, value]) => {
						return (
							<div
								key={key}
								className="caption-standard flex justify-between capitalize text-neutral-700"
							>
								<span className="w-full">{key.replace("_", " ")} </span>
								<span className="w-full">{value}</span>
							</div>
						);
					})}
				</div>
			</div>
		</ErrorBoundary>
	);
});
