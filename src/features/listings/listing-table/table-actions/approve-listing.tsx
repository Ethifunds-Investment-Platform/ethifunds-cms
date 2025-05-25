import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useActions from "@/store/actions";
import { CheckCircle } from "lucide-react";

type ApproveListingProps = {
	id: string;
};
export default function ApproveListing(props: ApproveListingProps) {
	const { ui } = useActions();

	const approve = () => {
		ui.changeDialog({
			show: true,
			type: "approve_listing",
			id: props.id,
		});
	};

	return (
		<DropdownMenuItem>
			<button onClick={approve} className="flex items-center gap-2">
				<CheckCircle className="text-primary" />
				Approve Listing
			</button>
		</DropdownMenuItem>
	);
}
