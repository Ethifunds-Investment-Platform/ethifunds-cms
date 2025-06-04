import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useAppSelectors from "@/store/use-app-selectors";
import classNames from "classnames";
import { amountSeparator } from "@/lib/amount-separator";
import { Badge } from "@/components/ui/badge";
import { UpdateInvestmentPayload } from "@/types/investment.types";

export default React.memo(function PreviewInvestmentDialog() {
	const { dialog } = useAppSelectors("ui");
	const { currency } = useAppSelectors("account");
	const [isLoading, setIsLoading] = React.useState(false);

	const data = dialog.data as UpdateInvestmentPayload & {
		display_image_preview: string;
		category_name: string;
		action_type: "edit" | "create";
	};

	const open = React.useMemo(
		() => dialog.show && dialog.type === "preview_investment" && dialog.data !== null,
		[dialog.data, dialog.show, dialog.type]
	);

	const info = React.useMemo(() => {
		if (!data) return {};
		const statusClx = classNames("capitalize text-md px-4", {
			"bg-success-100 text-success-300 border-success-300": data.status === "active",
			"bg-warning-100 text-warning-300 border-warning-300": data.status === "inactive",
			"bg-neutral-100 text-neutral-300 border-neutral-300": data.status === "draft",
		});
		const infoData=
		 {
			category: data.category_name,
			unit_price: `${currency.sign} ${amountSeparator(data.unit_price)}`,
			total_units: amountSeparator(data.total_units),
			RIO: data.expected_roi,
			tenor: `${data.tenor_value} ${data.tenor_unit}`,
			label: data.product_label,
			section: data.product_section,
			status: <Badge className={statusClx}>{data.status}</Badge>,
			funding_goal: `${currency.sign} ${amountSeparator(data.funding_goal)}`,
		};
		return Object.fromEntries(
			Object.entries(infoData).filter((entries) => entries[1] !== undefined)
		);
	}, [currency.sign, data]);

	const toggleDrawer = (value: boolean) => {
		if (isLoading) return;
		if (!value) {
			goBack();
		}
	};

	const goBack = () => {
		if (isLoading) return;
		if (dialog.dismiss) {
			dialog.dismiss();
		}
	};

	const submit = async () => {
		if (!dialog.action) return;
		setIsLoading(true);
		try {
			await dialog.action();
		} catch (error) {
			if (error) throw error;
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AppDrawer
			title="Preview Investment Details"
			direction="right"
			open={open}
			handleChange={toggleDrawer}
			footer={
				<div className="flex justify-between gap-3 [&_button]:w-1/2">
					<AppButton
						variant="mute"
						className="bg-neutral-100 text-neutral-700"
						onClick={goBack}
						disabled={isLoading}
					>
						Go Back
					</AppButton>

					<AppButton variant="primary" onClick={submit} isLoading={isLoading}>
						{data?.action_type === "edit" ? "Save Changes" : "submit"}
					</AppButton>
				</div>
			}
			className="overflow-y-auto hideScrollbar"
		>
			<div className="flex flex-col h-full px-5 mt-5 space-y-5 overflow-auto">
				<div className="space-y-3">
					<div className="w-full h-28">
						<img
							src={data?.display_image_preview}
							alt={data?.name}
							className="object-cover rounded-lg size-full"
						/>
					</div>
					<h1 className="capitalize content-accent">{data?.name} </h1>
					<span className="caption-standard text-neutral-500">{data?.description}</span>
				</div>

				<div className="p-3 space-y-5 border rounded-lg bg-neutral-50">
					{Object.entries(info).map(([key, value]) => {
						return (
							<div
								key={key}
								className="flex items-center justify-between capitalize caption-standard text-neutral-700"
							>
								<span className="w-full">{key.split("_").join(" ")} </span>
								<span className="w-full">{value}</span>
							</div>
						);
					})}
				</div>
			</div>
		</AppDrawer>
	);
});
