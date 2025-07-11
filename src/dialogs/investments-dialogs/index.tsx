import * as React from "react";
import InvestmentDetailsDialog from "./investment-details-dialog";
import EditInvestmentDialog from "./edit-investment-dialog";
import PreviewInvestmentDialog from "./preview-investment-dialog";
import NewInvestmentDialog from "./new-investment-dialog";
import DisburseDividendDialog from "./disburse-dividend-dialog";

export default function InvestmentsDialogs() {
	return (
		<React.Fragment>
			<InvestmentDetailsDialog />
			<EditInvestmentDialog />
			<PreviewInvestmentDialog />
			<NewInvestmentDialog />
			<DisburseDividendDialog />
		</React.Fragment>
	);
}
