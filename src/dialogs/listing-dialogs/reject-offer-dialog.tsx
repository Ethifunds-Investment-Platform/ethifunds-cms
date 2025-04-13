import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
import { Checkbox } from "@/components/ui/checkbox";
import Textarea from "@/components/ui/form-input/textarea";
import { PopupModal } from "@/components/ui/modal";
import ensureError from "@/lib/ensure-error";
import approveRejectListing from "@/services/listing/approve-reject-listing";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import { X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

export default React.memo(function RejectOfferDialog() {
	const { dialog } = useAppSelector((state) => state.ui);
	const [reason, setReasons] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [checked, setChecked] = React.useState(false);

	const { ui } = useActions();
	const id = dialog.id;

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "reject_offer";
	}, [dialog.show, dialog.type]);

	const toggleChecked = (val: boolean) => {
		setChecked(val);
	};
	const reset = () => {
		if (isLoading) return;
		setReasons("");
		setChecked(false);
		ui.resetDialog();
	};

	const updateReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReasons(e.target.value);
	};
	const submit = async () => {
		if (!id) return toast.error("Listing ID is required");
		setIsLoading(true);
		try {
			await approveRejectListing({
				listing_id: id,
				status: "rejected",
				reason: reason,
				flag_listing: checked,
			});
			toast.success("Offer rejected successfully, user would be notified shortly");
			reset();
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<PopupModal
			handleClose={close}
			open={open}
			className="relative w-full lg:w-1/2 h-96 p-8 overflow-auto"
		>
			<ErrorBoundary>
				<button
					onClick={close}
					className="absolute top-0 right-0 lg:-top-8 lg:-right-8 flex items-center justify-center size-8 p-2 rounded-full bg-white"
				>
					<X color="#908b8b" />
				</button>
				<div className="flex flex-col gap-3">
					<h1 className="feature-accent text-neutral-1000">Reason for Rejection</h1>

					<div className="space-y-5 p-3">
						<Textarea
							rows={5}
							placeholder="write reason for rejection"
							onChange={updateReason}
							disabled={isLoading}
						/>

						<div className="flex items-center gap-2">
							<Checkbox checked={checked} onCheckedChange={toggleChecked} disabled={isLoading} />
							<span className="caption-standard text-neutral-700">Flag Listing</span>
						</div>
					</div>

					<div className="w-full flex justify-center gap-10">
						<AppButton variant="outline" className="w-1/2" onClick={reset} disabled={isLoading}>
							Cancel
						</AppButton>
						<AppButton
							variant="destructive"
							className="w-1/2 text-white"
							onClick={submit}
							isLoading={isLoading}
						>
							Reject
						</AppButton>
					</div>
				</div>
			</ErrorBoundary>
		</PopupModal>
	);
});
