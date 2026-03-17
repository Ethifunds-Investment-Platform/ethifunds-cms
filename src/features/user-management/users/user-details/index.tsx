import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userDetailsTabs } from "./data";
import useCustomNavigation from "@/hooks/use-navigation";
import Overview from "./user-details-tabs/overview";
import UserInvestmentsTab from "./user-details-tabs/investments";
import UserSavingsTab from "./user-details-tabs/savings";
import ActivityLog from "./user-details-tabs/activity-log";
import { useQuery } from "@tanstack/react-query";
import getUserAccountBalances from "@/services/users/get-user-account-balances";
import { amountSeparator } from "@/lib/amount-separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserDetails() {
	const { changeBackBtn } = useUi({ title: "User Details" });

	const { queryParams, navigate, params } = useCustomNavigation();
	const user_id = params.user_id ?? "";
	const activeTab = queryParams.get("tab");

	const { data: balances, isFetching: isBalancesFetching } = useQuery(
		["user-balances", user_id],
		() => getUserAccountBalances({ user_id }),
		{ enabled: !!user_id }
	);

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

	const balanceCards = [
		{ title: "Wallet Balance", value: balances?.wallet_balance },
		{ title: "Investment Account", value: balances?.investment_balance },
		{ title: "Investment Vault", value: balances?.vault_balance },
		{ title: "Ethicoop Wallet", value: balances?.ethicoop_balance },
	];

	return (
		<AppContainer>
			<div className="grid grid-cols-2 gap-3 mb-5 lg:grid-cols-4">
				{isBalancesFetching
					? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)
					: balanceCards.map((card) => (
						<div key={card.title} className="space-y-2 rounded-lg border p-3">
							<p className="content-accent capitalize text-neutral-500">{card.title}</p>
							<p className="hero-accent">₦{amountSeparator(card.value ?? 0)}</p>
						</div>
					))}
			</div>
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
				<UserInvestmentsTab />
				<UserSavingsTab />
				<ActivityLog />
			</Tabs>
		</AppContainer>
	);
}
