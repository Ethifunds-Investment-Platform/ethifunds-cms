import { InvestmentAllocation } from "@/features/investments/metrics/investment-allocation";
import Counters from "./counters";
import TopInvestments from "@/features/investments/metrics/top-investments";
import RecentTransactions from "@/features/transactions/recent-transactions";
import FinancialOverview from "./financial-overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Metrics() {
	return (
		<Tabs defaultValue="general">
			<TabsList className="hide-scrollbar w-full justify-start gap-2 overflow-x-auto overflow-y-hidden rounded-none border-b-2 bg-transparent !p-0 !pb-3 lg:gap-5 lg:border-b">
				<TabsTrigger
					value="general"
					className="content-standard hover:content-bold data-[state=active]:content-bold justify-start !rounded-none border-b-2 border-transparent !bg-transparent px-2 py-4 capitalize text-neutral-500 !shadow-none first:pl-0 hover:border-primary hover:text-primary data-[state=active]:border-primary data-[state=active]:!text-primary"
				>
					General
				</TabsTrigger>
				<TabsTrigger
					value="financial"
					className="content-standard hover:content-bold data-[state=active]:content-bold justify-start !rounded-none border-b-2 border-transparent !bg-transparent px-2 py-4 capitalize text-neutral-500 !shadow-none first:pl-0 hover:border-primary hover:text-primary data-[state=active]:border-primary data-[state=active]:!text-primary"
				>
					Financial Overview
				</TabsTrigger>
			</TabsList>

			<TabsContent value="general" className="mt-5">
				<div className="space-y-5">
					<Counters />
					<div className="flex justify-between gap-5 flex-wrap lg:flex-nowrap">
						<div className="lg:w-3/5 w-full">
							<InvestmentAllocation />
						</div>
						<div className="lg:w-2/5 w-full">
							<TopInvestments />
						</div>
					</div>
					<RecentTransactions />
				</div>
			</TabsContent>

			<TabsContent value="financial" className="mt-5">
				<FinancialOverview />
			</TabsContent>
		</Tabs>
	);
}
