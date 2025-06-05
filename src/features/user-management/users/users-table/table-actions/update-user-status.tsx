import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import ensureError from "@/lib/ensure-error";
import updateUserStatus from "@/services/users/update-user-status";
import { User } from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";
import { CheckSquare2, XSquare } from "lucide-react";
import { toast } from "sonner";

type SuspendUserProps = {
	id: string;
	setIsLoading(status: boolean): void;
	status: User["status"];
};
export default function UpdateUserStatus(props: SuspendUserProps) {


	const clientQuery = useQueryClient()

	const toggleShow = async () => {
		props.setIsLoading(true);
		try {
			await updateUserStatus({
				user_id: props.id,
				status: props.status === "suspended" ? "active" : "suspended",
			});
			clientQuery.invalidateQueries({ queryKey: ["users"] });
			
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
