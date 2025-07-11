import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import { Input } from "@/components/ui/form-input";
import useDisbursement from "./use-disbursement";
import { formFields } from "./data";
import SelectBox from "@/components/select-box";

export default React.memo(function ProcessDisbursementDialog() {
	const {
		open,
		isLoading,
		formData,
		updateForm,
		closeDrawer,
		toggleDrawer,
		submit,
		quarters,
		isFetching,
	} = useDisbursement();

	return (
		<AppDrawer
			title="Process Disbursement"
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

					<AppButton variant="primary" isLoading={isLoading} onClick={submit}>
						Disburse
					</AppButton>
				</div>
			}
			className="overflow-y-auto hideScrollbar"
		>
			<div className="flex overflow-auto flex-col px-5 mt-5 space-y-5 h-full">
				<span className="content-standard text-neutral-500">
					Please fill out the details below.
				</span>

				<form className="pb-3 space-y-3">
					{formFields.map((item) => {
						const defaultValue = formData[item.name as keyof typeof formData];

						if (item.type === "select") {
							return (
								<SelectBox
									key={item.name}
									{...item}
									name={item.name}
									value={formData[item.name]}
									onchange={(e) => updateForm(item.name as any, e)}
									options={(quarters ?? []).map((quarter) => ({
										value: quarter.id.toString(),
										title: `${quarter.year} Q${quarter.quarter} (${
											quarter.status === "open" ? "Active" : "Closed"
										})`,
									}))}
									disabled={isLoading || isFetching}
								/>
							);
						}
						return (
							<Input
								{...item}
								key={item.name}
								value={defaultValue?.toString()}
								onChange={(e) => updateForm(item.name as any, e)}
								disabled={isLoading || isFetching}
							/>
						);
					})}
				</form>
			</div>
		</AppDrawer>
	);
});
