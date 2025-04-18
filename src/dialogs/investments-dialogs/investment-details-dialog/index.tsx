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
				<div className="mt-5 flex h-full flex-col space-y-5 overflow-auto px-5">
					<div className="space-y-3">
						<div className="w-full h-28">
							<img
								src={data?.display_image}
								alt={data?.name}
								className="size-full object-cover  rounded-lg"
							/>
						</div>
						<h1 className="content-accent">{data?.name} </h1>
						<span className="caption-standard text-neutral-500">{data?.description}</span>
					</div>

					<div className="space-y-5 rounded-lg border bg-neutral-50 p-3">
						{Object.entries(info).map(([key, value]) => {
							return (
								<div
									key={key}
									className="caption-standard flex items-center justify-between capitalize text-neutral-700"
								>
									<span className="w-full">{key.split("_").join(" ")} </span>
									<span className="w-full">{value}</span>
								</div>
							);
						})}
					</div>

					<div className="text-end">
						<a
							href={data?.product_memo}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline"
						>
							View Memo{" "}
						</a>
					</div>
				</div>
			</Render>
		</AppDrawer>
	);
});
