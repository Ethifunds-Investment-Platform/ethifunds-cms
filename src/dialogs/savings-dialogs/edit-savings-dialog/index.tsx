import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import { DateInput, Input } from "@/components/ui/form-input";
import useUpdate from "./use-update";
import { formFields } from "./data";
import Render from "@/components/render";

export default React.memo(function CreateSavingsDialog() {
	const {
		open,
		isLoading,
		isFetching,
		isError,
		error,
		formData,
		updateForm,
		closeDrawer,
		toggleDrawer,
		submit,
	} = useUpdate();

	return (
		<AppDrawer
			title="Edit Savings"
			direction="right"
			open={open}
			handleChange={toggleDrawer}
			footer={
				!isFetching && (
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
							Save Changes
						</AppButton>
					</div>
				)
			}
			className="overflow-y-auto hideScrollbar"
		>
			<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
				<div className="mt-5 flex h-full flex-col space-y-5 overflow-auto px-5">
					<span className="content-standard text-neutral-500">
						Please update the details below.
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
			</Render>
		</AppDrawer>
	);
});
