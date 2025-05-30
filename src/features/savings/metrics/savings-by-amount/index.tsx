import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import capitalize from "@/lib/capitalize";
import getSavingsByAmount from "@/services/savings/metrics/savings-by-amount";
import useCustomNavigation from "@/hooks/use-navigation";

export default function SavingsByAmount() {
	const [data, setData] = React.useState<Record<string, number>>({});
	const { params } = useCustomNavigation();
	const savings_id = params.savings_id;

	const { isFetching, isError, error } = useQuery(
		["savings-by-amount", savings_id],
		() => getSavingsByAmount({ savings_id }),
		{
			onSuccess(data) {
				setData(data);
			},
		}
	);

	const chartData = Object.entries(data).map(([Key, value]) => ({
		units: capitalize(Key),
		count: value,
	}));

	const chartConfig = {
		count: {
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
						<CardTitle>Savings By Amount</CardTitle>
						<CardDescription>A graphical representation of savings by amount</CardDescription>
						<small className="caption-accent text-neutral-700">Count</small>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig}>
							<BarChart accessibilityLayer data={chartData}>
								<CartesianGrid vertical={false} />
								<YAxis dataKey={"count"} tickLine={true} tickMargin={10} axisLine={false} />
								<XAxis
									dataKey="units"
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
												typeof value === "number" ? ` ${value.toLocaleString()}` : ""
											}
										/>
									}
								/>

								<Bar dataKey="count" fill="#D1811B" radius={8} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</Render>
		</ErrorBoundary>
	);
}
