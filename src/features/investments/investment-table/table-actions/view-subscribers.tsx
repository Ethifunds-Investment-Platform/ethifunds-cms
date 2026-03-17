import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useCustomNavigation from "@/hooks/use-navigation";
import { Users } from "lucide-react";

type ViewSubscribersProps = {
	id: string;
};
export default function ViewSubscribers(props: ViewSubscribersProps) {
	const { navigate } = useCustomNavigation();

	const handleClick = () => {
		navigate(`/investments/${props.id}/subscribers`);
	};

	return (
		<DropdownMenuItem>
			<button onClick={handleClick} className="flex items-center gap-2">
				<Users /> View Subscribers
			</button>
		</DropdownMenuItem>
	);
}
