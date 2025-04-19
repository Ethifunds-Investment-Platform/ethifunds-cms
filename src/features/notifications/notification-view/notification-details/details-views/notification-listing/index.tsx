import * as React from "react";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import ListingUsername from "./listing-username";
import useListing from "./use-listing";
import { Notification } from "@/types/notification.types";
import { Skeleton } from "@/components/ui/skeleton";

export default React.memo(function NotificationListing(props: Notification) {
	const {
		isFetching,
		isError,
		error,
		userData,
		activeUserIsSeller,
		productDetails,
		data,
		account,
	} = useListing(props);

	return (
		<ErrorBoundary>
			<Render
				isLoading={isFetching}
				isError={isError}
				error={error}
				loadingComponent={<LoadingComponent />}
			>
				<div className="flex flex-col gap-8 p-4">
					<p className="content-standard text-neutral-700">{data.data?.message}</p>
					<div className="space-y-5 rounded-lg border bg-neutral-50 p-3">
						<ListingUsername
							user={activeUserIsSeller ? account : userData!}
							isBuyer={!activeUserIsSeller}
						/>
						{Object.entries(productDetails).map(([key, value]) => {
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
				</div>
			</Render>
		</ErrorBoundary>
	);
});

function LoadingComponent() {
	return (
		<div className="flex flex-col gap-5">
			<Skeleton className="h-10" />
			<Skeleton className="h-60" />
		</div>
	);
}
