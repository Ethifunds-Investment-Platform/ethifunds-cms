import ensureError from "@/lib/ensure-error";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import getInvestmentDetails from "@/services/investments/get-investment-details";
import classNames from "classnames";
import { amountSeparator } from "@/lib/amount-separator";
import { Badge } from "@/components/ui/badge";
import processDisbursementInvestment from "@/services/investments/process-investment-disbursement";

const validation = z.object({
	product_id: z.number().positive("Product is required"),
	roi_percent: z.number().positive("ROI must be a positive number"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
	product_id: "" as any,
	roi_percent: 0,
};

export default function useDisbursement() {
	const { dialog } = useAppSelectors("ui");
	const { currency } = useAppSelectors("account");

	const [isLoading, setIsLoading] = React.useState(false);
	const [formData, setFormData] = React.useState(init);

	const { ui } = useActions();

	const open = React.useMemo(
		() => dialog.show && dialog.type === "process_investment_disbursement",
		[dialog.show, dialog.type]
	);

	const { isFetching, isError, error, data } = useQuery(
		["disbursement-investment-details", dialog.id],
		() => getInvestmentDetails({ id: dialog.id }),
		{
			enabled: open,
		}
	);

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

	const submit = async () => {
		if (!dialog.id) {
			toast.error("Product is missing, try refreshing the page");
			return;
		}
		setIsLoading(true);
		try {
			const formValues = validation.parse({
				...formData,
				product_id: Number(dialog.id),
				roi_percent: Number(formData.roi_percent),
			});
			await processDisbursementInvestment(formValues);
			showSuccessDialog();
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			setIsLoading(false);
		}
	};

	const showSuccessDialog = () => {
		const data = {
			title: "Dividend Disbursed!",
			subtitle:
				"Investment dividend has been disbursed successfully, all contributors will be notified shortly",
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

	const info = React.useMemo(() => {
		if (!data) return {};
		const statusClx = classNames("capitalize text-md px-4", {
			"bg-success-100 text-success-300 border-success-300": data.status === "active",
			"bg-warning-100 text-warning-300 border-warning-300": data.status === "inactive",
			"bg-neutral-100 text-neutral-300 border-neutral-300": data.status === "draft",
		});
		const infoData = {
			category: data.category.name,
			unit_price: `${currency.sign} ${amountSeparator(data.unit_price)}`,
			total_units: amountSeparator(data.total_units),
			units_sold: amountSeparator(data.units_sold),
			RIO: data.expected_roi,
			tenor: `${data.tenor_value} ${data.tenor_unit}`,
			label: data?.product_label?.name,
			section: data?.product_section?.name,
			status: <Badge className={statusClx}>{data.status}</Badge>,
			funding_goal: `${currency.sign} ${amountSeparator(data.funding_goal)}`,
			amount_raised: `${currency.sign} ${amountSeparator(data.amount_raised)}`,
		};
		return Object.fromEntries(
			Object.entries(infoData).filter((entries) => entries[1] !== undefined)
		);
	}, [currency.sign, data]);

	return {
		open,
		info,
		isFetching,
		isError,
		error,
		isLoading,
		formData,
		updateForm,
		closeDrawer,
		toggleDrawer,
		data,
		submit,
	};
}
