import * as React from "react";
import CreateSavingsDialog from "./create-savings-dialog";
import EditSavingsDialog from "./edit-savings-dialog";
import SavingsTransactionDetailsDialog from "./savings-transaction-details.dialog";

export default function SavingsDialogs() {
	return (
		<React.Fragment>
			<CreateSavingsDialog />
			<EditSavingsDialog />
			<SavingsTransactionDetailsDialog />
		</React.Fragment>
	);
}
