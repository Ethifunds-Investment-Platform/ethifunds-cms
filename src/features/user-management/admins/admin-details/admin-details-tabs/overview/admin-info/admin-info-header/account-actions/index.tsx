import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assets } from "@/constants";
import SuspendUser from "./suspend-user-status";
import Spinner from "@/components/spinner";
import { User } from "@/types/user.types";

type AccountActionsProps = {
	id: User["id"];
	status: User["status"];
};
export default React.memo(function AccountActions(props: AccountActionsProps) {
	const [isLoading, setIsLoading] = React.useState(false);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="!outline-non">
				{isLoading ? <Spinner /> : <img src={assets.option_icon_01} alt=""  className="rotate-90"/>}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2">
				<SuspendUser id={props.id.toString()} setIsLoading={setIsLoading} status={props.status} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
});
