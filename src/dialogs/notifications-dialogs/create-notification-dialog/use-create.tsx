import ensureError from "@/lib/ensure-error";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { NotificationAudiences } from "@/types/notification.types";
import createNotification from "@/services/notifications/create-notification";

const validation = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	audience: z.enum(NotificationAudiences, { message: "invalid notification audience" }),
	schedule_for: z.string().nullable(),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	title: "",
	description: "",
	audience: "email",
	schedule_for: null,
};

export default function useCreate() {
	const { account } = useAppSelectors("account");
	const { dialog } = useAppSelectors("ui");
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState(init);

	const { ui } = useActions();

	const open = React.useMemo(
		() => dialog.show && dialog.type === "new_notification",
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
			await createNotification(formValues);
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
			title: "Notification Created!",
			subtitle: "Notification has been created successfully",
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
