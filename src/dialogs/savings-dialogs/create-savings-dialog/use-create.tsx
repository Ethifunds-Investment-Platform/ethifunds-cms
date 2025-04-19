import ensureError from "@/lib/ensure-error";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";
import createSavings from "@/services/savings/create-savings";

const validation = z.object({
	start_date: z.string().min(1, "Start date is required"),
	created_by: z.number().positive("Created by must be a positive number"),
	roi: z.string().min(1, "ROI is required"),
	min_amount: z.string().min(1, "Minimum amount is required"),
	max_amount: z.string().min(1, "Maximum amount is required"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	start_date: "",
	created_by: 0,
	roi: "",
	min_amount: "",
	max_amount: "",
};

export default function useCreate() {
	const { account } = useAppSelectors("account");
	const { dialog } = useAppSelectors("ui");
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState(init);

	const { ui } = useActions();

	const open = React.useMemo(
		() => dialog.show && dialog.type === "create_savings",
		[dialog.show, dialog.type]
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
		setIsLoading(true);
		try {
			const formValues = validation.parse({
				...formData,
				created_by: account.id,
			});
			await createSavings(formValues);
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
			title: "Savings Created!",
			subtitle: "Savings has been created successfully",
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
		formData,
		updateForm,
		closeDrawer,
		toggleDrawer,
		submit,
	};
}
