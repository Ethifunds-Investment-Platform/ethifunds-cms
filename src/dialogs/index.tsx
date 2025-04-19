import * as React from "react";
import ListingDialogs from "./listing-dialogs";
import SuccessDialog from "./success-dialog";
import NewAdminDialog from "./new-admin-dialog";
import InvestmentsDialogs from "./investments-dialogs";
import useActions from "@/store/actions";
import SavingsDialogs from "./savings-dialogs";
import NotificationDialogs from "./notifications-dialogs";

export default React.memo(function Dialogs() {
	const { ui } = useActions();

	React.useEffect(() => {
		return () => {
			ui.resetDialog();
		};
	}, []);

	return (
		<React.Fragment>
			<SuccessDialog />
			<ListingDialogs />
			<NewAdminDialog />
			<InvestmentsDialogs />
			<SavingsDialogs />
			<NotificationDialogs />
		</React.Fragment>
	);
});
