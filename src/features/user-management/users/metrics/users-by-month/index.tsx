import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import useUsersByMonth from "./use-users-by-month";
import FilterByYear from "@/components/table-filters/filter-by-year";

export function UsersByMonth() {
	const { isFetching, isError, error, chartData, chartConfig, year, handleSelect } =
		useUsersByMonth();

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
						<div className="flex items-center !justify-between">
							<div>
								<CardTitle>Users By Months</CardTitle>
								<CardDescription>
									A graphical representation of Account created by months
								</CardDescription>
								<small className="caption-accent text-neutral-700">Count</small>
							</div>

							<FilterByYear name="year" value={year} onchange={handleSelect} />
						</div>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig}>
							<BarChart accessibilityLayer data={chartData}>
								<CartesianGrid vertical={false} />
								<YAxis dataKey={"count"} tickLine={true} tickMargin={10} axisLine={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.slice(0, 3)}
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
