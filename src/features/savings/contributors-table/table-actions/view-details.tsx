import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useCustomNavigation from "@/hooks/use-navigation";
import { EyeIcon } from "lucide-react";

type ViewDetailsProps = {
	id: string;
};
export default function ViewDetails(props: ViewDetailsProps) {
	const { navigate } = useCustomNavigation();

	const toggleShow = () => {
		navigate(`/savings/transactions?user_id=${props.id}`);
	};

	return (
		<DropdownMenuItem>
			<button onClick={toggleShow} className="flex gap-2 items-center">
				<EyeIcon /> View Transactions
			</button>
		</DropdownMenuItem>
	);
}
