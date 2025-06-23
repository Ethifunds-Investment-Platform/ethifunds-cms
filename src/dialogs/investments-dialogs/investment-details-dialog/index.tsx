import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useDetails from "./use-details";
import Render from "@/components/render";

export default React.memo(function InvestmentDetailsDialog() {
	const { open, isFetching, isError, error, data, info, toggleDrawer, edit, closeDrawer } =
		useDetails();

	return (
		<AppDrawer
			title="Investment Details"
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
						>
							Dismiss
						</AppButton>

						<AppButton variant="primary" onClick={edit}>
							Edit
						</AppButton>
					</div>
				)
			}
			className="overflow-y-auto hideScrollbar"
		>
			<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
				<div className="flex flex-col h-full px-5 mt-5 space-y-5 overflow-auto">
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

					{data?.product_memo && (
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
					)}
				</div>
			</Render>
		</AppDrawer>
	);
});
