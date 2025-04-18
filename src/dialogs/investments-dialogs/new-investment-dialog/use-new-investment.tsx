import ensureError from "@/lib/ensure-error";
import {
	InvestmentCategory,
	InvestmentsStatus,
	NewInvestmentPayload,
} from "@/types/investment.types";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useQuery } from "react-query";
import getInvestmentCategories from "@/services/investments/get-investment-categories";
import blobReader, { generatePreview } from "@/lib/blob-reader";
import createInvestment from "@/services/investments/create-investment";

const validation = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	product_category_id: z.string().min(1, "Category is required"),
	product_custodian_id: z.number().positive("Custodian id is required"),
	account_id: z.number().positive("Account ID is required"),
	product_label: z.string().min(3, "Label must be at least 3 characters"),
	product_section: z.string().min(3, "Section must be at least 3 characters"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	tenor_unit: z.enum(["days", "months", "years"]),
	tenor_value: z.number().positive("Tenor value must be a positive value"),
	total_units: z.number().positive("Total units must be at positive value"),
	expected_roi: z.number().positive("ROI cannot be negative"),
	funding_deadline: z.string().min(1, "Deadline is required").optional(),
	funding_goal: z.string().min(1, "Funding goal is required"),
	unit_price: z.string().min(1, "Unit price is required"),
	status: z.enum(InvestmentsStatus),
	display_image: z.instanceof(File, { message: "Display image is required" }),
	product_memo: z.instanceof(File, { message: "Product Memo is required" }),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	name: "",
	product_category_id: "",
	display_image: {} as any,
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
	product_memo: {} as any,
	product_custodian_id: 0,
	account_id: 0,
};

export default function useNewInvestment() {
	const { account } = useAppSelectors("account");
	const { dialog } = useAppSelectors("ui");
	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState(init);
	const [categories, setCategories] = React.useState<InvestmentCategory[]>([]);

	const { ui } = useActions();

	const open = React.useMemo(
		() => dialog.show && dialog.type === "create_investment",
		[dialog.show, dialog.type]
	);

	useQuery(["investment-categories-new"], () => getInvestmentCategories(), {
		enabled: open,
		onSuccess(data) {
			setCategories(data);
		},
	});

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

	const updateFile = (name: keyof typeof formData, e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFormData((prev) => ({
			...prev,
			[name]: file,
		}));
	};

	const submit = async (payload: globalThis.FormData) => {
		try {
			await createInvestment(payload);
			showSuccessDialog();
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		}
	};

	const prepareFormData = (data: NewInvestmentPayload) => {
		const formData = new FormData();

		Object.entries(data).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				formData.append(key, typeof value === "number" ? value.toString() : value);
			}
		});

		return formData;
	};

	const showPreview = async () => {
		setIsLoading(true);

		try {
			// Validate form data
			const validatedData = validation.parse({
				...formData,
				tenor_value: Number(formData.tenor_value),
				total_units: Number(formData.total_units),
				expected_roi: Number(formData.expected_roi),
				product_custodian_id: account.id,
				account_id: account.id,
			});

			const display_image = validatedData.display_image;

			const imgBase64 = await blobReader(display_image);

			const display_image_preview = generatePreview(imgBase64, display_image.type);

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
					type: "create_investment",
				});
			};

			ui.changeDialog({
				show: true,
				type: "preview_investment",
				data: { ...validatedData, display_image_preview, category_name, action_type: "create" },
				action: () => submit(formDataToSend),
				dismiss: goBack,
			});
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			setIsLoading(false);
		}
	};

	const showSuccessDialog = () => {
		const data = {
			title: "Investment Created!",
			subtitle: "The investment product has been successfully created.",
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

	const categoryOptions = React.useMemo(() => {
		return categories.map((item) => ({ title: item.name, value: String(item.id) }));
	}, [categories]);

	return {
		open,
		isLoading,
		formData,
		categoryOptions,
		updateForm,
		closeDrawer,
		toggleDrawer,
		updateFile,
		showPreview,
	};
}
