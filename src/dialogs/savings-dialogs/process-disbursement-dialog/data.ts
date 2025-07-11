// edit-investment/data.ts
import { FORM_FIELDS } from "@/components/ui/form-input/form.types";

export const formFields: FORM_FIELDS[] = [
	{
		name: "quarter_id",
		type: "select",
		label: "Quarter",
		placeholder: "Select Quarter",
		required: true,
	},
	{
		name: "roi_percent",
		type: "number",
		label: "ROI(%)",
		placeholder: "Enter ROI",
		required: true,
	},

]
