import * as React from "react";
import ListingDialogs from "./listing-dialogs";
import SuccessDialog from "./success-dialog";

export default React.memo(function Dialogs() {
	return (
		<React.Fragment>
			<SuccessDialog />
			<ListingDialogs />
		</React.Fragment>
	);
});
