import * as React from "react";
import ListingDialogs from "./listing-dialogs";
import SuccessDialog from "./success-dialog";
import NewAdminDialog from "./new-admin-dialog";

export default React.memo(function Dialogs() {
	return (
		<React.Fragment>
			<SuccessDialog />
			<ListingDialogs />
			<NewAdminDialog />
		</React.Fragment>
	);
});
