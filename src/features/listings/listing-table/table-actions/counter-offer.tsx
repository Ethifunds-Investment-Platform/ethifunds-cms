import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { assets } from "@/constants";
import useActions from "@/store/actions";

type CounterOfferProps = {
	id: string;
};
export default function CounterOffer(props: CounterOfferProps) {
	const { ui } = useActions();

	const toggleShow = () => {
		ui.changeDialog({
			show: true,
			type: "counter_offer",
			id: props.id,
		});
	};

	return (
		<DropdownMenuItem>
			<button onClick={toggleShow} className="flex items-center gap-2">
				<img src={assets.counter_offer_icon} /> Counter Offer
			</button>
		</DropdownMenuItem>
	);
}
