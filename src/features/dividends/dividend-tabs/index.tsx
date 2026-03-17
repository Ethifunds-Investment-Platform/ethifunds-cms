import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCustomNavigation from "@/hooks/use-navigation";
import EthivestTab from "./ethivest";
import EthicoopTab from "./ethicoop";

export default function DividendTabs() {
	const { queryParams, navigate } = useCustomNavigation();
	const activeTab = queryParams.get("tab") ?? "ethivest";

	const click = (value: string) => {
		navigate(`?tab=${value}`);
	};

	const triggerClx =
		"content-standard hover:content-bold data-[state=active]:content-bold justify-start !rounded-none border-b-2 border-transparent !bg-transparent px-2 py-4 capitalize text-neutral-500 !shadow-none first:pl-0 hover:border-primary hover:text-primary data-[state=active]:border-primary data-[state=active]:!text-primary";

	return (
		<Tabs defaultValue={activeTab} className="!p-0 outline-none">
			<TabsList className="hide-scrollbar w-full justify-start gap-2 overflow-x-auto overflow-y-hidden rounded-none border-b-2 bg-transparent !p-0 !pb-3 lg:gap-5 lg:border-b">
				<TabsTrigger value="ethivest" onClick={() => click("ethivest")} className={triggerClx}>
					Ethivest
				</TabsTrigger>
				<TabsTrigger value="ethicoop" onClick={() => click("ethicoop")} className={triggerClx}>
					Ethicoop
				</TabsTrigger>
			</TabsList>

			<EthivestTab />
			<EthicoopTab />
		</Tabs>
	);
}
