import * as React from "react";
import { amountSeparator } from "@/lib/amount-separator";
import ErrorBoundary from "@/components/error-boundary";
import useAppSelectors from "@/store/use-app-selectors";
import { ActiveInvestmentInvestmentsNotification, Notification } from "@/types/notification.types";
import { useQuery } from "react-query";
import Render from "@/components/render";
import getInvestmentDetails from "@/services/investments/get-investment-details";
import { Skeleton } from "@/components/ui/skeleton";

export default React.memo(function NotificationUserInvestment(data: Notification) {
	const { currency } = useAppSelectors("account");

	const notificationData = data.data;

	const productId = notificationData?.user_investment?.product_id;

	const {
		isFetching,
		isError,
		error,
		data: investmentDetails,
	} = useQuery([productId], () => getInvestmentDetails({ id: productId }), {
		enabled: !productId && false,
	});

	if (!notificationData?.user_investment) return;

	const details = notificationData?.user_investment as ActiveInvestmentInvestmentsNotification;

	const productDetails = {
		date: new Date(details?.created_at ?? "").toLocaleDateString("en-us", {
			dateStyle: "full",
		}),
		investment_type: investmentDetails?.category.display_title,
		investment_name: investmentDetails?.name,
		units_purchased: amountSeparator(details.units_purchased),
		amount_invested: `${currency.sign} ${amountSeparator(details.total_invested)}`,
		RIO: amountSeparator(details.total_roi),
		status: details.status,
	};

	return (
		<ErrorBoundary>
			<Render
				isLoading={isFetching}
				isError={isError}
				error={error}
				loadingComponent={<LoadingComponent />}
			>
				<div className="flex flex-col gap-8">
					<p className="content-standard text-neutral-700">{data?.data.message}</p>
					<div className="space-y-5 rounded-lg border bg-neutral-50 p-3">
						{Object.entries(productDetails).map(([key, value]) => {
							return (
								<div
									key={key}
									className="caption-standard flex justify-between capitalize text-neutral-700"
								>
									<span className="w-full">{key.replace("_", " ")} </span>
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
