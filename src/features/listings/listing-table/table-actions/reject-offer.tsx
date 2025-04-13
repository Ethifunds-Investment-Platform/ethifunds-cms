import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useActions from "@/store/actions";
import { XCircle } from "lucide-react";

type ViewDetailsProps = {
	id: string;
};
export default function RejectOffer(props: ViewDetailsProps) {
	const { ui } = useActions();

	const toggleShow = () => {
		ui.changeDialog({
			show: true,
			type: "reject_offer",
			id: props.id,
		});
	};

	return (
		<DropdownMenuItem>
			<button onClick={toggleShow} className="flex items-center gap-2">
				<XCircle className="text-error-200" />
				Reject Offer
			</button>
		</DropdownMenuItem>
	);
}
