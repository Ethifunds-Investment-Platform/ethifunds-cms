import * as React from "react";
import ListingDetailsDialog from "./listing-details-dialog";
import CounterOfferDialog from "./counter-offer-dialog";
import RejectOfferDialog from "./reject-offer-dialog";

export default function ListingDialogs() {
	return (
		<React.Fragment>
			<ListingDetailsDialog />
			<CounterOfferDialog />
			<RejectOfferDialog />
		</React.Fragment>
	);
}
