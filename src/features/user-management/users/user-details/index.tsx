import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userDetailsTabs } from "./data";
import useCustomNavigation from "@/hooks/use-navigation";
import Overview from "./user-details-tabs/overview";
import ActivityLog from "./user-details-tabs/activity-log";

export default function UserDetails() {
	const { changeBackBtn } = useUi({ title: "User Details" });

	const { queryParams, navigate } = useCustomNavigation();
	const activeTab = queryParams.get("tab");

	React.useLayoutEffect(() => {
		changeBackBtn({
            show: true,
            path:"/users"
		});

		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);

	const click = (value: string) => {
		navigate(`?tab=${value}`);
	};

	return (
		<AppContainer>
			<Tabs defaultValue={activeTab ?? "overview"} className="!p-0 outline-none">
				<TabsList className="hide-scrollbar w-full justify-start gap-2 overflow-x-auto overflow-y-hidden rounded-none border-b-2 bg-transparent !p-0 !pb-3 lg:gap-5 lg:border-b">
					{userDetailsTabs.map((item, idx) => {
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
				<ActivityLog />
			</Tabs>
		</AppContainer>
	);
}
