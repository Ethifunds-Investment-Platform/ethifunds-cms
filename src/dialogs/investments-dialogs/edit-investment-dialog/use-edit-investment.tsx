import ensureError from "@/lib/ensure-error";
import {
	InvestmentCategory,
	InvestmentsStatus,
	UpdateInvestmentPayload,
} from "@/types/investment.types";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";
import updateInvestment from "@/services/investments/update-investment";
import getInvestmentDetails from "@/services/investments/get-investment-details";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getInvestmentCategories from "@/services/investments/get-investment-categories";
import { formatDateToYYYYMMDD } from "@/lib/format-date";
import blobReader from "@/lib/blob-reader";

const validation = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	product_category_id: z.string().min(1, "Category is required"),
	display_image: z.string().optional(),
	product_label: z.string().min(3, "Label must be at least 3 characters").optional(),
	product_section: z.string().min(3, "Section must be at least 3 characters").optional(),
	description: z.string().min(10, "Description must be at least 10 characters"),
	tenor_unit: z.enum(["days", "months", "years"]),
	tenor_value: z.number().positive("Tenor value must be a positive value"),
	total_units: z.number().positive("Total units must be at positive value"),
	expected_roi: z.number().positive("ROI cannot be negative"),
	funding_deadline: z.string().min(1, "Deadline is required").optional(),
	funding_goal: z.string().min(1, "Funding goal is required"),
	unit_price: z.string().min(1, "Unit price is required"),
	status: z.enum(InvestmentsStatus),
	product_memo: z.string().optional(),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	name: "",
	product_category_id: "",
	display_image: "",
	status: "active",
	product_label: "",
	product_section: "",
	description: "",
	tenor_unit: "days",
	tenor_value: 0,
	total_units: 0,
	expected_roi: 0,
	funding_deadline: "",
	funding_goal: "",
	unit_price: "",
	product_memo: "",
};

export default function useEditInvestment() {
	const { dialog } = useAppSelectors("ui");
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState(init);
	const [categories, setCategories] = React.useState<InvestmentCategory[]>([]);
	const { currency } = useAppSelectors("account");

	const { ui } = useActions();

	const open = React.useMemo(
		() => dialog.show && dialog.type === "edit_investment",
		[dialog.show, dialog.type]
	);

	const investment_id = React.useMemo(() => dialog.id, [dialog.id]);

	useQuery(["investment-categories-edit"], () => getInvestmentCategories(), {
		enabled: open,
		onSuccess(data) {
			setCategories(data);
		},
	});

	const { isFetching, isError, error, data } = useQuery(
		["investment-edit-details", investment_id, open],
		() => getInvestmentDetails({ id: investment_id }),
		{
			enabled: open && !formData.name,
		}
	);

	React.useEffect(() => {
		if (data) {
			setFormData({
				name: data.name,
				product_category_id: String(data.product_category_id),
				display_image: data.display_image,
				status: data.status,
				product_label: data?.product_label?.name,
				product_section: data?.product_section?.name,
				description: data.description,
				tenor_unit: data.tenor_unit as any,
				tenor_value: data.tenor_value,
				total_units: data.total_units,
				expected_roi: data.expected_roi,
				funding_deadline: data.funding_deadline ? formatDateToYYYYMMDD(data.funding_deadline) : undefined,
				funding_goal: data.funding_goal,
				unit_price: data.unit_price,
				product_memo: data.product_memo,
			});
		}
	}, [data]);

	useQuery(["investment-categories-edit"], () => getInvestmentCategories(), {
		enabled: open,
		onSuccess(data) {
			setCategories(data);
		},
	});

	const queryClient = useQueryClient();

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

	const updateFile = async (
		name: keyof typeof formData,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 1024 * 1024 * 1) {
			toast.error("File size must be less than 1MB");
			return;
		}

		const fileBase64 = await blobReader(file);
		setFormData((prev) => ({
			...prev,
			[name]: fileBase64,
		}));
	};

	const submit = async (payload: UpdateInvestmentPayload) => {
		try {
			await updateInvestment({ investment_id: dialog.id, ...payload });

			showSuccessDialog();
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		}
	};

	const prepareFormData = (data: UpdateInvestmentPayload) => {
		// const formData = new FormData();
		const payload = {};
		Object.entries(data).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				payload[key] = typeof value === "number" ? value.toString() : value;
			}
		});

		// Object.entries(data).forEach(([key, value]) => {
		// 	if (value !== undefined && value !== null) {
		// 		formData.append(key, typeof value === "number" ? value.toString() : value);
		// 	}
		// });

		return payload;
	};

	const showPreview = async () => {
		if (!dialog.id) return toast.error("Investment id not found");
		setIsLoading(true);

		try {
			// Validate form data
			const validatedData = validation.parse({
				...formData,
				tenor_value: Number(formData.tenor_value),
				total_units: Number(formData.total_units),
				expected_roi: Number(formData.expected_roi),
			});

			const display_image = validatedData.display_image;
			let display_image_preview = data?.display_image;

			if (display_image) {
				
				display_image_preview = display_image;
			}

			const category_name =
				categories.find((item) => item.id === Number(validatedData.product_category_id))?.name ??
				"";

			const formDataToSend = prepareFormData({
				...validatedData,
				product_category_id: Number(validatedData.product_category_id),
			});

			const goBack = () => {
				ui.changeDialog({
					show: true,
					type: "edit_investment",
					// id: dialog.id,
				});
			};

			ui.changeDialog({
				show: true,
				type: "preview_investment",
				data: { ...validatedData, display_image_preview, category_name, action_type: "edit" },
				action: () => submit(formDataToSend as UpdateInvestmentPayload),
				dismiss: goBack,
			});
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const showSuccessDialog = () => {
		const data = {
			title: "Investment Updated!",
			subtitle: "The investment product has been successfully updated.",
		};

		const dismiss = () => {
			queryClient.invalidateQueries({ queryKey: ["all-investments"] });
			ui.resetDialog();
			reset();
		};

		ui.changeDialog({
			show: true,
			type: "success_dialog",
			data,
			action: null,
			dismiss: dismiss,
		});
	};

	const categoryOptions = React.useMemo(() => {
		return categories.map((item) => ({ title: item.name, value: String(item.id) }));
	}, [categories]);

	return {
		open,
		isLoading,
		isFetching,
		isError,
		error,
		formData,
		categoryOptions,
		data,
		updateForm,
		closeDrawer,
		toggleDrawer,
		updateFile,
		showPreview,
		categories,
		currency,
	};
}
