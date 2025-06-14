// edit-investment/data.ts
import { FORM_FIELDS } from "@/components/ui/form-input/form.types";
import { NotificationAudiences } from "@/types/notification.types";

export const formFields: FORM_FIELDS[] = [
	{
		name: "title",
		type: "text",
		label: "Title",
		placeholder: "Enter Title",
		required: true,
	},
	{
		name: "description",
		type: "textarea",
		label: "Description",
		placeholder: "Enter Description",
		required: true,
	},

	{
		name: "audience",
		type: "select",
		label: "Audience",
		placeholder: "Select Audience",
		options: NotificationAudiences.map((item) => ({ title: item, value: item })),
		required: true,
	},
	{
		name: "schedule_for",
		type: "date",
		label: "Schedule Date (optional)",
		placeholder: "Pick Date",
		required: false,
	},
];
