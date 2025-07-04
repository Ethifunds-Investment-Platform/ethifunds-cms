import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCustomNavigation from "@/hooks/use-navigation";
import Overview from "./overview";
import ErrorBoundary from "@/components/error-boundary";
import { savingsTabs } from "./data";
import SavingHistory from "./saving-history";

export default function SavingsTabs() {
	const { queryParams, navigate } = useCustomNavigation();
	const activeTab = queryParams.get("tab");

	const click = (value: string) => {
		navigate(`?tab=${value}`);
	};

	return (
		<ErrorBoundary>
			<Tabs defaultValue={activeTab ?? "overview"} className="!p-0 outline-none">
				<TabsList className="hide-scrollbar w-full justify-start gap-2 overflow-x-auto overflow-y-hidden rounded-none border-b-2 bg-transparent !p-0 !pb-3 lg:gap-5 lg:border-b">
					{savingsTabs?.map((item, idx) => {
						return (
							<TabsTrigger
								key={idx}
								value={item.value}
								onClick={() => click(item.value)}
								className="content-standard hover:content-bold data-[state=active]:content-bold justify-start !rounded-none border-b-2 border-transparent !bg-transparent px-2 py-4 capitalize text-neutral-500 !shadow-none first:pl-0 hover:border-primary hover:text-primary data-[state=active]:border-primary data-[state=active]:!text-primary"
							>
								{item.title}
							</TabsTrigger>
						);
					})}
				</TabsList>

				<Overview />
				<SavingHistory />
			</Tabs>
		</ErrorBoundary>
	);
}
