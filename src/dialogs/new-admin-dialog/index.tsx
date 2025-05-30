import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useNewAdmin from "./use-new-admin";
import { formFields } from "./data";
import SelectBox from "@/components/select-box";
import { Input } from "@/components/ui/form-input";
import Password from "@/components/ui/form-input/password";

export default React.memo(function NewAdminDialog() {
	const { open, isLoading, formData, updateForm, closeDrawer, toggleDrawer, submit } =
		useNewAdmin();
	return (
		<AppDrawer
			title="Create New Admin"
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

					<AppButton variant="primary" onClick={submit} isLoading={isLoading}>
						Create
					</AppButton>
				</div>
			}
			className="overflow-y-auto hideScrollbar"
		>
			<div className="mt-10 flex h-full flex-col space-y-5 overflow-auto px-5">
				<span className="content-standard text-neutral-500">
					Please fill out the form to create an admin.
				</span>

				<div className="space-y-3 pb-3">
					{formFields.map((item) => {
						if (item.type === "select") {
							return (
								<SelectBox
									{...item}
									key={item.name}
									value={formData[item.name]}
									onchange={(e) => updateForm(item.name as any, e)}
									disabled={isLoading}
								/>
							);
						}

						if (item.type === "password") {
							return (
								<Password
									{...item}
									key={item.name}
									value={formData[item.name]}
									onChange={(e) => updateForm(item.name as any, e)}
									isLoading={isLoading}
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
				</div>
			</div>
		</AppDrawer>
	);
});
