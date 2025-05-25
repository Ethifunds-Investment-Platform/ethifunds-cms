import * as React from "react";
import ListingDetailsDialog from "./listing-details-dialog";
import CounterOfferDialog from "./counter-offer-dialog";
import RejectOfferDialog from "./reject-offer-dialog";
import RejectListingDialog from "./reject-listing-dialog";
import ApproveOfferDialog from "./approve-offer-dialog";
import ApproveListingDialog from "./approve-listing-dialog";
export default function ListingDialogs() {
	return (
		<React.Fragment>
			<ListingDetailsDialog />
			<CounterOfferDialog />
			<RejectOfferDialog />
			<ApproveOfferDialog />
			<ApproveListingDialog />
			<RejectListingDialog />
		</React.Fragment>
	);
}
