import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useNewInvestment from "./use-new-investment";
import { formFields } from "./data";
import SelectBox from "@/components/select-box";
import { DateInput, FileInput, Input } from "@/components/ui/form-input";
import Textarea from "@/components/ui/form-input/textarea";

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
	} = useNewInvestment();

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
						Preview Changes
					</AppButton>
				</div>
			}
			className="overflow-y-auto hideScrollbar"
		>
			<div className="mt-5 flex h-full flex-col space-y-5 overflow-auto px-5">
				<span className="content-standard text-neutral-500">
					Please update the investment details below.
				</span>

				<form className="space-y-3 pb-3">
					{formFields.map((item) => {
						const defaultValue = formData[item.name as keyof typeof formData];

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
						if (item.type === "date") {
							return (
								<DateInput
									key={item.name}
									{...item}
									name={item.name}
									value={formData[item.name]}
									onChange={(e) => updateForm(item.name as any, new Date(e).toISOString())}
									triggerStyle="w-full "
									disabled={isLoading}
								
								/>
							);
						}
						return (
							<Input
								{...item}
								key={item.name}
								value={defaultValue?.toString()}
								onChange={(e) => updateForm(item.name as any, e)}
								disabled={isLoading}
							/>
						);
					})}
				</form>
			</div>
		</AppDrawer>
	);
});
