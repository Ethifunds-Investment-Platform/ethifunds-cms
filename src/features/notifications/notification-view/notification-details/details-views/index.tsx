import { Notification, NotificationDataTypes } from "@/types/notification.types";
import * as React from "react";
import NotificationListing from "./notification-listing";
import NotificationProduct from "./notification-product";
import NotificationUserInvestment from "./notification-user-investment";
import NotificationUserSavings from "./notification-user-savings";
import NotificationInfo from "./notification-info";

export default React.memo(function DetailsViews(props: Notification) {
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
