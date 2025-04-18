import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useActions from "@/store/actions";
import { EyeIcon } from "lucide-react";

type ViewDetailsProps = {
	id: string;
};
export default function ViewDetails(props: ViewDetailsProps) {
	const { ui } = useActions();

	const toggleShow = () => {
		ui.changeDialog({
			show: true,
			type: "investment_details",
			id: props.id,
		});
	};

	return (
		<DropdownMenuItem>
			<button onClick={toggleShow} className="flex items-center gap-2">
				<EyeIcon /> View Details
			</button>
		</DropdownMenuItem>
	);
}
