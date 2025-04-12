import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "react-query";
import getInvestmentAllocation from "@/services/investments/metrics/investment-allocation";
import * as React from "react";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import useAppSelectors from "@/store/use-app-selectors";
import capitalize from "@/lib/capitalize";

export function InvestmentAllocation() {
	const { currency } = useAppSelectors("account");
	const [allocations, setAllocations] = React.useState<Record<string, number>>({});

	const { isFetching, isError, error } = useQuery(["investment"], () => getInvestmentAllocation(), {
		onSuccess(data) {
			setAllocations(data);
		},
	});

	const chartData = Object.entries(allocations).map(([Key, value]) => ({
		category: capitalize(Key),
		amount: value,
	}));

	const chartConfig = {
		amount: {
			label: "Amount",
			color: "#D1811B",
		},
	} satisfies ChartConfig;

	return (
		<ErrorBoundary>
			<Render
				isLoading={isFetching}
				isError={isError}
				error={error}
				loadingComponent={<Skeleton className="h-80" />}
			>
				<Card className="">
					<CardHeader>
						<CardTitle>Investment Allocation</CardTitle>
						<CardDescription>
							Overview of investment allocation performance over time.
						</CardDescription>
						<small className="caption-accent text-neutral-700">Amount({currency.sign})</small>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig}>
							<BarChart accessibilityLayer data={chartData}>
								<CartesianGrid vertical={false} />
								<YAxis dataKey={"amount"} tickLine={true} tickMargin={10} axisLine={false} />
								<XAxis
									dataKey="category"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.slice(0)}
								/>
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											formatter={(value: ValueType) =>
												typeof value === "number"
													? ` ${currency.sign}${value.toLocaleString()}`
													: ""
											}
										/>
									}
								/>

								<Bar dataKey="amount" fill="#D1811B" radius={8} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</Render>
		</ErrorBoundary>
	);
}
