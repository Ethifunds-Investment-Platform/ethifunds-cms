import ensureError from "@/lib/ensure-error";
import updateAccount from "@/services/account/update-account";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
	first_name: z
		.string({ message: "First Name is Required" })
		.trim()
		.min(3, "First name must be at least 3 characters long"),
	last_name: z
		.string({ message: "Last name is Required" })
		.trim()
		.min(3, "Last name must be at least 3 characters long"),
	phone_number: z.string().trim().min(5, "Enter a valid Phone number"),
});

type FormData = z.infer<typeof validation>;

export default function useForm() {
	const { account } = useAppSelector((state) => state.account);
	const init: FormData & { email: string; role: string } = {
		first_name: account?.first_name ?? "",
		last_name: account?.last_name ?? "",
		phone_number: account.phone_number ?? "",
		email: account.email,
		role: account.role,
	};

	const [formData, setFormData] = React.useState(init);
	const [isLoading, setIsLoading] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState("");
	const [edit, setEdit] = React.useState(false);
	const { account: accountActions } = useActions();

	const reset = () => {
		if (isLoading) return;
		setFormData(init);
		setEdit(false);
	};

	const editForm = () => {
		setEdit(true);
	};

	const updateForm = (
		name: keyof typeof formData,
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
	) => {
		if (typeof e === "string") {
			return setFormData((prev) => ({
				...prev,
				[name]: e,
			}));
		}

		return setFormData((prev) => ({
			...prev,
			[name]: e.target.value,
		}));
	};

	const submit = async () => {
		setIsLoading(true);

		try {
			const formValues = validation.parse(formData);

			const response = await updateAccount({
				...formValues,
			});

			accountActions.updateAccount({
				...account,
				...response,
			});
			toast.success("Account Updated successfully");
			setEdit(false);
		} catch (e) {
			const errMsg = ensureError(e).message;
			toast.error(errMsg);
			setErrorMsg(errMsg);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		edit,
		isLoading,
		formData,
		errorMsg,
		editForm,
		reset,
		updateForm,
		submit,
	};
}
