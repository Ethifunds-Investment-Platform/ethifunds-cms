import { amountSeparator } from "@/lib/amount-separator";
import ensureError from "@/lib/ensure-error";
import counterOffer from "@/services/listing/counter-offer";
import getListingDetails from "@/services/listing/get-listing-details";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

export default function useCounterOffer() {
	const [isLoading, setIsLoading] = React.useState(false);
	const [counterPrice, setCounterPrice] = React.useState("");
	const { currency } = useAppSelector((state) => state.account);
	const { dialog } = useAppSelector((state) => state.ui);
	const id = dialog.id;

	const queryClient = useQueryClient();
	const { ui } = useActions();

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "counter_offer";
	}, [dialog.show, dialog.type]);

	const { isFetching, isError, error, data } = useQuery(
		["counter_listing-details", id],
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
		if (isLoading) return;
		toggleShow(false);
		setCounterPrice("");
	};

	const reset = () => {
		close();
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
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCounterPrice(e.target.value);
	};

	const submit = async () => {
		if (!counterPrice.trim() || !data) return toast.error("counter price required");
		setIsLoading(true);
		try {
			await counterOffer({
				listing_id: data.id,
				counter_price_per_unit: counterPrice,
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
			"You have successfully Placed an counter offer for this Listing, parties involved would be notified shortly.";

		const data = {
			title: "Congratulations!!!",
			subtitle: text,
		};

		const dismiss = () => {
			queryClient.invalidateQueries(["listings"]);
		};
		ui.changeDialog({
			show: true,
			type: "success_dialog",
			data,
			dismiss: dismiss,
		});
	};
	return {
		open,
		isFetching,
		isError,
		error,
		isLoading,
		currency,
		data,
		counterPrice,
		details,
		reset,
		onChange,
		submit,
	};
}
