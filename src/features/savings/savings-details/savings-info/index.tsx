import Render from "@/components/render";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { amountSeparator } from "@/lib/amount-separator";
import useAppSelectors from "@/store/use-app-selectors";
import classNames from "classnames";
import ActiveContributorsList from "./active-contributors-list";
import { Savings } from "@/types/savings.types";
import React from "react";

type SavingsInfoProps = {
	isFetching: boolean;
	isError: boolean;
	error: unknown;
	data?: Savings;
	loadingComponent?: React.ReactNode;
};

export default function SavingsInfo({
	isFetching,
	isError,
	error,
	data,
	loadingComponent,
}: SavingsInfoProps) {
	const { currency } = useAppSelectors("account");

	const statusClx = classNames("capitalize", {
		"bg-success-100 text-success-300 border-success-300": data?.status === "active",
		"bg-neutral-100 text-neutral-300 border-neutral-300": data?.status !== "active",
	});

	const getDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-us", {
			dateStyle: "full",
		});
	};

	const info = {
		start_date: getDate(data?.start_date ?? ""),
		end_date: getDate(data?.end_date ?? ""),
		cycle_type: data?.cycle_type,
		roi: data?.roi,
		min_amount: `${currency.sign} ${amountSeparator(data?.min_amount ?? "")}`,
		max_amount: `${currency.sign} ${amountSeparator(data?.max_amount ?? "")}`,
		interest_type: data?.interest_type,
		interest_frequency: data?.interest_frequency,
		interest_duration: data?.interest_duration,
	};

	return (
		<Render
			isLoading={isFetching}
			isError={isError}
			error={error}
			loadingComponent={loadingComponent ? loadingComponent : <LoadingComponent />}
		>
			<div className="flex justify-between gap-5 flex-wrap lg:flex-nowrap">
				<div className="rounded-lg border p-4 w-3/5 space-y-3">
					<div className="">
						<div className="flex justify-between pb-3">
							<h1 className="feature-accent">{data?.title}</h1>
							<Badge className={statusClx}> {data?.status}</Badge>
						</div>
						<span
							className="content-standard text-neutral-600 line-clamp-3"
							title={data?.description}
						>
							{data?.description}
						</span>
					</div>
					<div className="flex flex-col gap-3 rounded-lg border p-3">
						{Object.entries(info).map(([key, value]) => (
							<div key={key} className="flex justify-between items-center">
								<span className="content-accent capitalize">{key.replace(/_/g, " ")}</span>
								<span>{value}</span>
							</div>
						))}
					</div>
					<div className="flex justify-end">
						<div>
							<h3 className="highlight-accent">
								Amount Raised:{currency.sign} {amountSeparator(data?.amount_raised ?? "")}{" "}
							</h3>
							<small className="content-standard text-neutral-700">
								Target amount:{currency.sign} {amountSeparator(data?.target_amount ?? "")}
							</small>
						</div>
					</div>
				</div>

				<ActiveContributorsList savings_id={data?.id.toString() ?? ""} />
			</div>
		</Render>
	);
}

function LoadingComponent() {
	return (
		<div className="flex justify-between gap-5 flex-wrap lg:flex-nowrap">
			<Skeleton className="h-80 w-3/5" />
			<Skeleton className="h-60 w-2/5" />
		</div>
	);
}
