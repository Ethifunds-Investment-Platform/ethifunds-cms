import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { Checkbox } from "@/components/ui/checkbox";
import Textarea from "@/components/ui/form-input/textarea";
import { PopupModal } from "@/components/ui/modal";
import ensureError from "@/lib/ensure-error";
import getListingDetails from "@/services/listing/get-listing-details";
import approveRejectListing from "@/services/listing/approve-reject-listing";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default React.memo(function RejectListingDialog() {
	const { dialog } = useAppSelector((state) => state.ui);
	const [reason, setReasons] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [checked, setChecked] = React.useState(false);
	const { currency } = useAppSelector((state) => state.account);

	const queryClient = useQueryClient();

	const { ui } = useActions();
	const id = dialog.id;

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "reject_listing";
	}, [dialog.show, dialog.type]);

	const { data, isFetching, isError, error } = useQuery(
		["reject-listing", id],
		() => getListingDetails({ id }),
		{
			enabled: open,
		}
	);

	const getDate = (date: string) =>
		new Date(date).toLocaleDateString("en-us", {
			dateStyle: "full",
		});

	const details = {
		date: getDate(data?.created_at ?? ""),
		seller_name: data?.seller_info.name,
		name: data?.product.name,
		units: ` ${Number(data?.units ?? "").toLocaleString()}`,
		sale_price: `${currency.sign} ${Number(data?.final_price_per_unit ?? "").toLocaleString()}`,
		asking_price_per_unit: `${currency.sign} ${Number(
			data?.asking_price_per_unit ?? ""
		).toLocaleString()}`,
		interest_rate: `${data?.product.expected_roi}%`,
	};

	const toggleChecked = (val: boolean) => {
		setChecked(val);
	};
	const close = () => {
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
			showSuccessDialog();
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			setIsLoading(false);
		}
	};

	const showSuccessDialog = () => {
		const text =
			"You have successfully rejected this offer, parties involved would be notified shortly.";

		const data = {
			title: "Congratulations!!!",
			subtitle: text,
		};

		ui.changeDialog({
			show: true,
			type: "success_dialog",
			data,
			dismiss: () => {
				queryClient.invalidateQueries({ queryKey: ["listings", "recent-listing"] });
			},
		});
	};

	return (
		<PopupModal
			handleClose={close}
			open={open}
			className="relative w-full h-full p-8 overflow-auto lg:w-1/2"
			showCloseBtn
		>
			<ErrorBoundary>
				<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
					<div className="flex flex-col gap-3">
						<h1 className="feature-accent text-neutral-1000">Listing Details</h1>

						<div className="p-3 space-y-5 border rounded-lg bg-neutral-50">
							{Object.entries(details).map(([key, value]) => {
								return (
									<div
										key={key}
										className="flex items-center justify-between capitalize caption-standard text-neutral-700"
									>
										<span className="w-full">{key.split("_").join(" ")} </span>
										<span className="w-full">{value}</span>
									</div>
								);
							})}
						</div>
						<h1 className="caption-accent text-neutral-1000">Reason for Rejection</h1>

						<div className="p-3 space-y-5">
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

						<div className="flex justify-center w-full gap-10">
							<AppButton variant="outline" className="w-1/2" onClick={close} disabled={isLoading}>
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
				</Render>
			</ErrorBoundary>
		</PopupModal>
	);
});
