import { ChartConfig } from "@/components/ui/chart";
import useCustomNavigation from "@/hooks/use-navigation";
import capitalize from "@/lib/capitalize";
import getUsersByMonth from "@/services/users/metrics/get-users-by-month";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";

export default function useUsersByMonth() {
	const [users, setUsers] = React.useState<Record<string, number>>({});
	const { queryParams } = useCustomNavigation();
	const year = queryParams.get("year") || new Date().getFullYear().toString();

	const { isFetching, isError, error } = useQuery(
		["users-by-months", year],
		() => getUsersByMonth({ year }),
		{
			onSuccess(data) {
				setUsers(data);
			},
		}
	);

	const chartData = Object.entries(users).map(([Key, value]) => ({
		month: capitalize(Key),
		count: value,
	}));

	const chartConfig = {
		count: {
			label: "Count",
			color: "#D1811B",
		},
	} satisfies ChartConfig;

	const handleSelect = (value: string) => {
		const year = parseInt(value, 10);
		queryParams.set("year", year.toString());
	};

	return {
		isFetching,
		isError,
		error,
		chartData,
		chartConfig,
		users,
		year,
		setUsers,
		handleSelect,
	};
}
