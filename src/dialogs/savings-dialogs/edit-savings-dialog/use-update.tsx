import ensureError from "@/lib/ensure-error";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useQuery } from "react-query";
import getSavingsDetails from "@/services/savings/get-savings-details";
import updateSavings from "@/services/savings/update-savings";

const validation = z.object({
	start_date: z.string().min(1, "Start date is required"),
	roi: z.string().min(1, "ROI is required"),
	min_amount: z.string().min(1, "Minimum amount is required"),
	max_amount: z.string().min(1, "Maximum amount is required"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	start_date: "",
	roi: "",
	min_amount: "",
	max_amount: "",
};

export default function useUpdate() {
	const { dialog } = useAppSelectors("ui");
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState(init);

	const { ui } = useActions();

	const open = React.useMemo(
		() => dialog.show && dialog.type === "update_savings",
		[dialog.show, dialog.type]
	);

	const { isFetching, isError, error, data } = useQuery(
		["update-savings", dialog.id],
		() => getSavingsDetails({ savings_id: dialog.id }),
		{
			enabled: open,
			onSuccess(data) {
				console.log(data, data.roi.split("%")[0]);
				setFormData({
					start_date: data.start_date,
					roi: data.roi,
					min_amount: data.min_amount,
					max_amount: data.max_amount,
				});
			},
		}
	);

	const toggleDrawer = (value: boolean) => {
		if (isLoading) return;
		ui.changeDialog({
			show: value,
			type: "",
		});
		reset();
	};

	const reset = () => {
		setFormData(init);
	};
	const closeDrawer = () => {
		toggleDrawer(false);
	};

	const updateForm = (
		name: keyof typeof formData,
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
	) => {
		setFormData((prev) => ({
			...prev,
			[name]: typeof e === "string" ? e : e.target.value,
		}));
	};

	const submit = async () => {
		if (!dialog.id) return toast.error("savings id not found, try refreshing the page.");
		setIsLoading(true);
		try {
			const formValues = validation.parse({
				...formData,
			});
			await updateSavings({ ...formValues, savings_id: Number(dialog.id) });
			showSuccessDialog();
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			setIsLoading(false);
		}
	};

	const showSuccessDialog = () => {
		const data = {
			title: "Savings Updated!",
			subtitle: "Savings has been updated successfully",
		};

		const dismiss = () => {
			ui.resetDialog();
			reset();
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
		isLoading,
		isFetching,
		isError,
		error,
		data,
		formData,
		updateForm,
		closeDrawer,
		toggleDrawer,
		submit,
	};
}
