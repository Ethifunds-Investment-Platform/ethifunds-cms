import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assets } from "@/constants";
import ViewDetails from "./view-details";
import DisburseDividend from "./disburse-dividend";

type TableActionsProps = {
	id: string;
	showDisbursement?: boolean;
};
export default React.memo(function TableActions(props: TableActionsProps) {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="!outline-non">
				<img src={assets.option_icon_01} alt="" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2">
				<ViewDetails id={props.id} />
				{props.showDisbursement && <DisburseDividend id={props.id} />}
			</DropdownMenuContent>
		</DropdownMenu>
	);
});
