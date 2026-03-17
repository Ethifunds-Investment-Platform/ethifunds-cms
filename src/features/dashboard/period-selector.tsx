import useCustomNavigation from "@/hooks/use-navigation";

const periods = [
	{ label: "Today", value: "today" },
	{ label: "This Week", value: "this_week" },
	{ label: "This Month", value: "this_month" },
	{ label: "This Quarter", value: "this_quarter" },
	{ label: "All Time", value: "all_time" },
] as const;

export default function PeriodSelector() {
	const { queryParams, navigate } = useCustomNavigation();
	const activePeriod = queryParams.get("period") ?? "all_time";

	const select = (value: string) => {
		if (value === "all_time") {
			navigate("?");
		} else {
			navigate(`?period=${value}`);
		}
	};

	return (
		<div className="flex items-center gap-2 flex-wrap">
			{periods.map((period) => (
				<button
					key={period.value}
					onClick={() => select(period.value)}
					className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
						activePeriod === period.value
							? "bg-primary text-white"
							: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
					}`}
				>
					{period.label}
				</button>
			))}
		</div>
	);
}
