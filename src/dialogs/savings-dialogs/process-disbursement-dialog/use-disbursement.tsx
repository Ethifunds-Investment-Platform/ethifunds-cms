import ensureError from "@/lib/ensure-error";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";
import getSavingsQuarters from "@/services/savings/get-savings-quarters";
import { useQuery } from "@tanstack/react-query";
import processSavingsDisbursement from "@/services/savings/process-savings-disbursement";

const validation = z.object({
	quarter_id: z.number().positive("Quarter is required"),
	roi_percent: z.number().positive("ROI must be a positive number"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	quarter_id: "" as any,
	roi_percent: 0,
};

export default function useDisbursement() {
	const { dialog } = useAppSelectors("ui");
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState(init);

	const { ui } = useActions();

	const open = React.useMemo(
		() => dialog.show && dialog.type === "process_savings_disbursement",
		[dialog.show, dialog.type]
	);

	const {
		isFetching,
		isError,
		error,
		data: quarters,
	} = useQuery(["quarters"], () => getSavingsQuarters(), {
		enabled: open,
	});

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
		setIsLoading(true);
		try {
			const formValues = validation.parse({
				...formData,
				quarter_id: Number(formData.quarter_id),
				roi_percent: Number(formData.roi_percent),
			});
			await processSavingsDisbursement(formValues);
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
			title: "Savings Disbursed!",
			subtitle:
				"Savings has been disbursed successfully, all contributors will be notified shortly",
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
		quarters,
		isFetching,
		isError,
		error,
		isLoading,
		formData,
		updateForm,
		closeDrawer,
		toggleDrawer,
		submit,
	};
}
