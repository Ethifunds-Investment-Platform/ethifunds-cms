import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";

import useActions from "@/store/actions";
import { PopupModal } from "@/components/ui/modal";
import { X } from "lucide-react";
import Render from "@/components/render";
import { amountSeparator } from "@/lib/amount-separator";
import ErrorBoundary from "@/components/error-boundary";
import getListingDetails from "@/services/listing/get-listing-details";
import { Badge } from "@/components/ui/badge";

export default React.memo(function ListingDetailsDialog() {
	const { currency } = useAppSelector((state) => state.account);
	const { dialog } = useAppSelector((state) => state.ui);
	const id = dialog.id;

	const { ui } = useActions();

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "listing_details";
	}, [dialog.show, dialog.type]);

	const { isFetching, isError, error, data } = useQuery(
		["listing-details", id],
		() =>
			getListingDetails({
				id,
			}),
		{
			enabled: open,
		}
	);

	const toggleShow = (val: boolean) => {
		ui.changeDialog({ show: val, type: "", id: "" });
	};

	const close = () => {
		toggleShow(false);
	};

	const getDate = (date: string) =>
		new Date(date).toLocaleDateString("en-us", {
			dateStyle: "full",
		});

	const details = {
		date: getDate(data?.created_at ?? ""),
		seller_name: data?.seller_info.name,
		name: data?.product.name,
		units: ` ${amountSeparator(data?.units ?? "")}`,
		sale_price: `${currency.sign} ${amountSeparator(data?.final_price_per_unit ?? "")}`,
		asking_price_per_unit: `${currency.sign} ${amountSeparator(data?.asking_price_per_unit ?? "")}`,
		interest_rate: `${data?.product.expected_roi}%`,
		status: <Badge className="bg-primary-500"> {data?.status} </Badge>,
	};

	return (
		<PopupModal handleClose={close} open={open} className="relative w-full lg:w-1/2 h-96 p-8">
			<ErrorBoundary>
				<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
					<button
						onClick={close}
						className="absolute top-0 right-0 lg:-top-8 lg:-right-8 flex items-center justify-center size-8 p-2 rounded-full bg-white"
					>
						<X color="#908b8b" />
					</button>
					<div className="flex flex-col gap-10">
						<h1 className="highlight-standard text-neutral-1000">Listing Details</h1>

						<div className="space-y-5 rounded-lg border bg-neutral-50 p-3">
							{Object.entries(details).map(([key, value]) => {
								return (
									<div
										key={key}
										className="caption-standard flex items-center justify-between capitalize text-neutral-700"
									>
										<span className="w-full">{key.split("_").join(" ")} </span>
										<span className="w-full">{value}</span>
									</div>
								);
							})}
						</div>
					</div>
				</Render>
			</ErrorBoundary>
		</PopupModal>
	);
});
