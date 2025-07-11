import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useActions from "@/store/actions";
import { CheckCircle } from "lucide-react";

type ApproveOfferProps = {
	id: string;
	setIsLoading(state: boolean): void;
};
export default function ApproveOffer(props: ApproveOfferProps) {
	const { ui } = useActions();

	const approve = () => {
		ui.changeDialog({
			show: true,
			type: "approve_offer",
			id: props.id,
		});
	};

	return (
		<DropdownMenuItem>
			<button onClick={approve} className="flex items-center gap-2">
				<CheckCircle className="text-primary" />
				Approve Offer
			</button>
		</DropdownMenuItem>
	);
}
