import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assets } from "@/constants";
import ViewDetails from "./view-details";
import UpdateUserStatus from "./update-user-status";
import Spinner from "@/components/spinner";
import { User } from "@/types/user.types";

type TableActionsProps = {
	id: string;
	status: User["status"];
};
export default React.memo(function TableActions(props: TableActionsProps) {
	const [isLoading, setIsLoading] = React.useState(false);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="!outline-non">
				{isLoading ? <Spinner /> : <img src={assets.option_icon_01} alt="" />}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2">
				<ViewDetails id={props.id} />
				<UpdateUserStatus id={props.id} setIsLoading={setIsLoading} status={props.status} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
});
