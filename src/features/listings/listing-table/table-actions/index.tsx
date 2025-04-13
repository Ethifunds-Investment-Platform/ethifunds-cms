import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assets } from "@/constants";

import { SaleOption } from "@/types/listing.types";
import ViewDetails from "./view-details";
import CounterOffer from "./counter-offer";
import ApproveOffer from "./approve-offer";
import RejectOffer from "./reject-offer";
import Spinner from "@/components/spinner";

type TableActionsProps = {
	id: string;
	sale_option: SaleOption;
};
export default React.memo(function TableActions(props: TableActionsProps) {
	const [isLoading, setIsLoading] = React.useState(false)

	if(isLoading) return <Spinner/>

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="!outline-non">
				<img src={assets.option_icon_01} alt="" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2">
				<ViewDetails id={props.id} />
				{props.sale_option === "ethifunds" && <CounterOffer id={props.id} />}
				<ApproveOffer id={props.id} setIsLoading={ setIsLoading} />
				<RejectOffer id={props.id } />
			</DropdownMenuContent>
		</DropdownMenu>
	);
});
