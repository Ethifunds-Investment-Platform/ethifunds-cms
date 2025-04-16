import { FORM_FIELDS } from "@/components/ui/form-input/form.types";
import { AdminRoles } from "@/types/admin.types";

export const formFields: FORM_FIELDS[] = [
	{
		name: "first_name",
		type: "text",
		label: "First Name",
		placeholder: "Enter First Name",
		required: true,
	},
	{
		name: "last_name",
		type: "text",
		label: "Last Name",
		placeholder: "Enter Last Name",
		required: true,
	},
	{
		name: "email",
		type: "email",
		label: "Email",
		placeholder: "Enter Email",
		required: true,
	},

	{
		name: "phone_number",
		type: "text",
		label: "Phone Number",
		placeholder: "Enter Phone Number",
		required: true,
	},
	{
		name: "password",
		type: "password",
		label: "Password",
		placeholder: "Enter Password",
		required: true,
	},
	{
		name: "role",
		type: "select",
		label: "Role",
		placeholder: "Select Role",
		required: true,
		options: AdminRoles.map((item) => ({
			title: item,
			value: item,
		})),
	},
];
