import { FORM_FIELDS } from "@/components/ui/form-input/form.types";

export const formFields: FORM_FIELDS[] = [
	{
		name: "first_name",
		type: "text",
		label: "First Name",
		placeholder: "enter first name",
		required: true,
		containerStyle: "col-span-2 lg:col-span-1",
	},
	{
		name: "last_name",
		type: "text",
		label: "Last Name",
		placeholder: "Enter last name",
		required: true,
		containerStyle: "col-span-2 lg:col-span-1",
	},

	{
		name: "phone_number",
		type: "tel",
		label: "Phone number",
		placeholder: "",
		containerStyle: "col-span-2",
		required: true,
	},

	{
		name: "email",
		type: "text",
		label: "Email",
		placeholder: "enter Email",
		containerStyle: "col-span-2",
		required: false,
		readOnly: true,
	},
];
