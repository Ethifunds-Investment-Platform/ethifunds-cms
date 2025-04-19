import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import { DateInput, Input } from "@/components/ui/form-input";
import useCreate from "./use-create";
import { formFields } from "./data";
import SelectBox from "@/components/select-box";
import Textarea from "@/components/ui/form-input/textarea";

export default React.memo(function CreateSavingsDialog() {
	const { open, isLoading, formData, updateForm, closeDrawer, toggleDrawer, submit } = useCreate();

	return (
		<AppDrawer
			title="Create Notification"
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
						Create
					</AppButton>
				</div>
			}
			className="overflow-y-auto hideScrollbar"
		>
			<div className="mt-5 flex h-full flex-col space-y-5 overflow-auto px-5">
				<span className="content-standard text-neutral-500">
					Please fill out the details below.
				</span>

				<form className="space-y-3 pb-3">
					{formFields.map((item) => {
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

						if (item.type === "select") {
							return (
								<SelectBox
									key={item.name}
									{...item}
									value={formData[item.name]}
									onchange={(e) => updateForm(item.name as any, e)}
									disabled={isLoading}
								/>
							);
						}

						if (item.type === "textarea") {
							return (
								<Textarea
									key={item.name}
									{...item}
									rows={5}
									value={formData[item.name]}
									onChange={(e) => updateForm(item.name as any, e)}
									disabled={isLoading}
								/>
							);
						}

						return (
							<Input
								{...item}
								key={item.name}
								value={formData[item.name]}
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
