import * as React from "react";
import ErrorBoundary from "@/components/error-boundary";
import useAppSelectors from "@/store/use-app-selectors";
import { Notification, SavingsNotification } from "@/types/notification.types";

export default React.memo(function NotificationUserSavings(data: Notification) {
	const { currency } = useAppSelectors("account");

	const notificationData = data.data;

	const getDate = (date: string) =>
		new Date(date).toLocaleDateString("en-us", {
			dateStyle: "full",
		});

	if (!notificationData?.user_savings) return;

	const details = notificationData?.user_savings as SavingsNotification;

	const productDetails = {
		title: details.ethicoop_cycle.title,
		contribution_amount: `${currency.sign} ${details.contribution_amount} (monthly)`,
		contribution_date: getDate(details.contribution_date),
		RIO: details.ethicoop_cycle.roi,
		funding_source: details.funding_source,
		funding_preference: details.funding_preference,
		start_date: getDate(details?.ethicoop_cycle?.start_date),
		end_date: getDate(details?.ethicoop_cycle?.end_date),
		status: details.status,
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
