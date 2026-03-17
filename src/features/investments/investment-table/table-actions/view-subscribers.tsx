import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useActions from "@/store/actions";
import { Users } from "lucide-react";

type ViewSubscribersProps = {
	id: string;
};
export default function ViewSubscribers(props: ViewSubscribersProps) {
	const { ui } = useActions();

	const toggleShow = () => {
		ui.changeDialog({
			show: true,
			type: "view_investment_subscribers",
			id: props.id,
		});
	};

	return (
		<DropdownMenuItem>
			<button onClick={toggleShow} className="flex items-center gap-2">
				<Users /> View Subscribers
			</button>
		</DropdownMenuItem>
	);
}
