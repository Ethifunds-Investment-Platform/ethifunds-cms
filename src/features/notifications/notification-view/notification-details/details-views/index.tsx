import { Notification, NotificationDataTypes } from "@/types/notification.types";
import * as React from "react";
import NotificationListing from "./notification-listing";
import NotificationProduct from "./notification-product";
import NotificationUserInvestment from "./notification-user-investment";
import NotificationUserSavings from "./notification-user-savings";
import NotificationInfo from "./notification-info";
import EmptyData from "@/components/empty-data";

export default React.memo(function DetailsViews(props: Notification) {
	if (!props.data) {
		return (
			<div className="rounded-lg border p-4 flex overflow-auto">
				<EmptyData title="Nothing to see here" text="Some data anomalies occurred" />
			</div>
		);
	}
	// Find the key that corresponds to NotificationDataTypes
	const type = Object.keys(props.data).find((key): key is NotificationDataTypes =>
		["user_savings", "product", "listing", "user_investment"].includes(key)
	);
	const getView = () => {
		switch (type) {
			case "product":
				return <NotificationProduct {...props} />;

			case "listing":
				return <NotificationListing {...props} />;

			case "user_investment":
				return <NotificationUserInvestment {...props} />;

			case "user_savings":
				return <NotificationUserSavings {...props} />;
			default:
				return <NotificationInfo {...props} />;
		}
	};
	return getView();
});
