import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useNewInvestment from "./use-new-investment";
import { formFields } from "./data";
import SelectBox from "@/components/select-box";
import { FileInput, Input } from "@/components/ui/form-input";
import Textarea from "@/components/ui/form-input/textarea";
import { DatePicker } from "@/components/ui/date-picker";

export default React.memo(function NewInvestmentDialog() {
	const {
		open,
		isLoading,
		formData,
		categoryOptions,
		updateForm,
		updateFile,
		closeDrawer,
		toggleDrawer,
		showPreview,
		currency,
		categories,
	} = useNewInvestment();

	const items = React.useMemo(() => {
		const excludedFields = ["product_label", "product_section"];
		const product_category_id = Number(formData.product_category_id);
		const isEthivest =
			product_category_id > 0
				? categories.find((item) => item.name.toLowerCase().includes("ethivest"))?.id ===
				  product_category_id
				: false;
		if (!isEthivest) {
			return formFields.filter((item) => !excludedFields.includes(item.name));
		}
		return formFields;
	}, [formData.product_category_id, categories]);

	return (
		<AppDrawer
			title="New Investment"
			direction="right"
			open={open}
			handleChange={toggleDrawer}
			footer={
				<div className="flex justify-between gap-3 [&_button]:w-1/2">
					<AppButton
						variant="mute"
						className="bg-neutral-100 text-neutral-700"
						onClick={closeDrawer}
						disabled={isLoading}
					>
						Cancel
					</AppButton>

					<AppButton variant="primary" isLoading={isLoading} onClick={showPreview}>
						Preview
					</AppButton>
				</div>
			}
			className="overflow-y-auto hideScrollbar"
		>
			<div className="flex overflow-auto flex-col px-5 mt-5 space-y-5 h-full">
				<span className="content-standard text-neutral-500">
					Please update the investment details below.
				</span>

				<form className="pb-3 space-y-3">
					{items.map((item) => {
						const defaultValue = formData[item.name as keyof typeof formData];
						const currencyFields = ["funding_goal", "unit_price"];
						const isCurrencyField = currencyFields.includes(item.name);
						if (item.type === "select") {
							if (item.name === "product_category_id") {
								return (
									<SelectBox
										{...item}
										key={item.name}
										value={defaultValue?.toString()}
										onchange={(e) => updateForm(item.name as any, e)}
										options={categoryOptions}
										disabled={isLoading}
									/>
								);
							}

							return (
								<SelectBox
									{...item}
									key={item.name}
									value={defaultValue?.toString()}
									onchange={(e) => updateForm(item.name as any, e)}
									disabled={isLoading}
								/>
							);
						}
						if (item.type === "date") {
							return (
								<DatePicker
									{...item}
									triggerStyle="w-full"
									key={item.name}
									value={defaultValue ? new Date(defaultValue as string) : undefined}
									onChange={(e) => updateForm(item.name as any, e.toISOString())}
								/>
							);
						}

						if (item.type === "textarea") {
							return (
								<Textarea
									{...item}
									key={item.name}
									rows={5}
									value={defaultValue?.toString()}
									onChange={(e) => updateForm(item.name as any, e)}
									disabled={isLoading}
								/>
							);
						}

						if (item.type === "file") {
							return (
								<FileInput
									key={item.name}
									{...item}
									placeholder={(formData[item.name] as File)?.name ?? item.placeholder}
									onChange={(e) => updateFile(item.name as any, e)}
									disabled={isLoading}
								/>
							);
						}

						return (
							<Input
								{...item}
								key={item.name}
								label={isCurrencyField ? `${item.label} (${currency?.sign}) ` : item.label}
								value={defaultValue?.toLocaleString()}
								onChange={(e) => updateForm(item.name as any, e)}
								disabled={isLoading || item.readOnly}
							/>
						);
					})}
				</form>
			</div>
		</AppDrawer>
	);
});
