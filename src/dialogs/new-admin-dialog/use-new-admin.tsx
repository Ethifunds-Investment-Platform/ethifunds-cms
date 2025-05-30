import ensureError from "@/lib/ensure-error";
import createAdmin from "@/services/admins/create-admin";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import { AdminRoles } from "@/types/admin.types";
import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
	first_name: z.string().trim().min(3, "First Name must be at least 3 characters long"),
	last_name: z.string().trim().min(3, "Last Name must be at least 3 characters"),
	email: z.string().email("Email must be valid"),
	phone_number: z
		.string()
		.trim()
		.min(11, "Phone number must be at least 11 characters long")
		.max(15, "Phone number must be at most 15 characters long"),
	password: z.string().trim().min(8, "password is required"),

	role: z.enum(AdminRoles, { message: "role must be a valid role" }),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	email: "",
	first_name: "",
	last_name: "",
	phone_number: "",
	password: "$Default123",
	role: "admin",
};

export default function useNewAdmin() {
	const { dialog } = useAppSelectors("ui");
	const [formData, setFormData] = React.useState(init);
	const [isLoading, setIsLoading] = React.useState(false);

	const { ui } = useActions();
	const clientQuery = useQueryClient();
	const open = React.useMemo(
		() => dialog.show && dialog.type === "new_admin",
		[dialog.show, dialog.type]
	);

	const toggleDrawer = (value: boolean) => {
		reset();
		ui.changeDialog({
			show: value,
			type: "",
		});
	};

	const closeDrawer = () => {
		toggleDrawer(false);
	};
	const reset = () => {
		if (isLoading) return;
		setFormData(init);
	};

	const updateForm = (
		name: keyof typeof formData,
		e: React.ChangeEvent<HTMLInputElement> | string
	) => {
		setFormData((prev) => ({
			...prev,
			[name]: typeof e === "string" ? e : e.target.value,
		}));
	};

	const submit = async () => {
		setIsLoading(true);
		try {
			const formValues = validation.parse(formData);

			await createAdmin(formValues);
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
			"You have successfully created a new admin, login credentials would be sent to the admin shortly.";

		const data = {
			title: "Admin Created!!!",
			subtitle: text,
		};

		const dismiss = () => {
			ui.resetDialog();
			reset();
			clientQuery.invalidateQueries({ queryKey: ["admins"] });
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
