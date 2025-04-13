import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import approveRejectListing from "@/services/listing/approve-reject-listing";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

type ApproveOfferProps = {
	id: string;
	setIsLoading(state: boolean): void;
};
export default function ApproveOffer(props: ApproveOfferProps) {
	const { queryParams } = useCustomNavigation();
	const reset = () => {
		queryParams.delete("status");
	};
	const approve = async () => {
		queryParams.set("status", "");
		props.setIsLoading(true);
		try {
			await approveRejectListing({
				listing_id: props.id,
				status: "approved",
			});

			toast.success("Listing Approved Successfully, User would be notified shortly");
			reset();
		} catch (err) {
			const errMsg = ensureError(err).message;

			toast.error(errMsg);
		} finally {
			props.setIsLoading(false);
		}
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
