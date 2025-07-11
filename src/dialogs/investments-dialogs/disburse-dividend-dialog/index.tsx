import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import Render from "@/components/render";
import useDisbursement from "./use-disbursement";
import { formFields } from "./data";
import { Input } from "@/components/ui/form-input";

export default React.memo(function DisburseDividendDialog() {
	const {
		open,
		isLoading,
		closeDrawer,
		toggleDrawer,
		submit,
		info,
		isFetching,
		isError,
		error,
		data,
		formData,

		updateForm,
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
			<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
				<div className="flex overflow-auto flex-col px-5 mt-5 space-y-5 h-full">
					<div className="space-y-3">
						<div className="w-full h-28">
							<img
								src={data?.display_image}
								alt={data?.name}
								className="object-cover rounded-lg size-full"
							/>
						</div>
						<h1 className="content-accent">{data?.name} </h1>
						<span className="caption-standard text-neutral-500">{data?.description}</span>
					</div>

					<div className="p-3 space-y-5 rounded-lg border bg-neutral-50">
						{Object.entries(info).map(([key, value]) => {
							return (
								<div
									key={key}
									className="flex justify-between items-center capitalize caption-standard text-neutral-700"
								>
									<span className="w-full">{key.split("_").join(" ")} </span>
									<span className="w-full">{value}</span>
								</div>
							);
						})}
					</div>

					{/* {data?.product_memo && (
						<div className="text-end">
							<a
								href={data?.product_memo}
								target="_blank"
								rel="noopener noreferrer"
								className="underline text-primary"
							>
								View Memo{" "}
							</a>
						</div>
					)} */}

					<form className="pb-3 space-y-3">
						{formFields.map((item) => {
							const defaultValue = formData[item.name as keyof typeof formData];

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
			</Render>
		</AppDrawer>
	);
});
