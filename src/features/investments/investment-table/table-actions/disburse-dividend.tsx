import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useActions from "@/store/actions";
import { Coins } from "lucide-react";

type Props = {
	id: string;
};
export default function DisburseDividend(props: Props) {
	const { ui } = useActions();

	const toggleShow = () => {
		ui.changeDialog({
			show: true,
			type: "process_investment_disbursement",
			id: props.id,
		});
	};

	return (
		<DropdownMenuItem>
			<button onClick={toggleShow} className="flex gap-2 items-center">
				<Coins /> Disburse Dividend
			</button>
		</DropdownMenuItem>
	);
}
