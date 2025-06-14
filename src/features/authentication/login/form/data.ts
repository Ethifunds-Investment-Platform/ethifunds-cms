import { FORM_FIELDS } from "@/components/ui/form-input/form.types";

export const formFields: FORM_FIELDS[] = [
	{
		name: "email",
		type: "text",
		label: "email",
		placeholder: "Enter Email",
		required: true,
	},

	{
		name: "password",
		type: "password",
		label: "password",
		placeholder: "Enter Password",
		required: true,
	},
];
