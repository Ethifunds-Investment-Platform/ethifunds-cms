import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import Metrics from "./metrics";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown,  } from "lucide-react";
import AppButton from "@/components/app-button";
import PendingTransactions from "./pending-transactions";

export default function Transactions() {
	useUi({ title: "Transactions" });

	return (
		<AppContainer className="space-y-5" asChild>
			<Collapsible defaultOpen={false} className="flex flex-col gap-5">
				<CollapsibleTrigger asChild className=" self-end ">
					<AppButton variant="mute" className="flex items-center gap-2  bg-gray-100/25 border p-2">
						<ChevronDown className="h-4 w-4" />
						<span className="">Show Metrics</span>
					</AppButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<Metrics />
				</CollapsibleContent>
			</Collapsible>
			<PendingTransactions />
			{/* <RecentTransactions /> */}
		</AppContainer>
	);
}
