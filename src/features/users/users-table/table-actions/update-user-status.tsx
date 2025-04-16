import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import updateUserStatus from "@/services/users/update-user-status";
import { User } from "@/types/user.types";
import { CheckSquare2, XSquare } from "lucide-react";
import { toast } from "sonner";

type SuspendUserProps = {
	id: string;
	setIsLoading(status: boolean): void;
	status: User["status"];
};
export default function UpdateUserStatus(props: SuspendUserProps) {
	const { queryParams } = useCustomNavigation();

	const toggleShow = async () => {
		props.setIsLoading(true);
		queryParams.set("status", "");
		try {
			await updateUserStatus({
				user_id: props.id,
				status: props.status === "suspended" ? "active" : "suspended",
			});
			queryParams.delete("status");
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			props.setIsLoading(false);
		}
	};

	return (
		<DropdownMenuItem>
			<button onClick={toggleShow} className="flex items-center gap-2">
				{props.status === "suspended" ? <CheckSquare2 /> : <XSquare />}
				{props.status === "active" || props.status === "inactive" ? "Suspend" : "Activate"} User
			</button>
		</DropdownMenuItem>
	);
}
