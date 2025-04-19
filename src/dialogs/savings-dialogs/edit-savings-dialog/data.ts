// edit-investment/data.ts
import { FORM_FIELDS } from "@/components/ui/form-input/form.types";

export const formFields: FORM_FIELDS[] = [
	{
		name: "min_amount",
		type: "text",
		label: "Minimum Amount",
		placeholder: "Enter minimum Amount",
		required: true,
	},
	{
		name: "max_amount",
		type: "text",
		label: "Maximum Amount",
		placeholder: "Enter maximum Amount",
		required: true,
	},

	{
		name: "roi",
		type: "number",
		label: "ROI(%)",
		placeholder: "Enter ROI",
		required: true,
	},
	{
		name: "start_date",
		type: "date",
		label: "Start Date",
		placeholder: "Pick Date",
		required: true,
	},
];
