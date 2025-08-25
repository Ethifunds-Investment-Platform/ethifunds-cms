import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import Metrics from "./metrics";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown,  } from "lucide-react";
import AppButton from "@/components/app-button";
import PendingTransactions from "./pending-transactions";
import useActions from "@/store/actions";

export default function Transactions() {
	useUi({ title: "Transactions" });
	const { ui } = useActions();

	const handleInitiateTransaction = () => {
		ui.changeDialog({
			show: true,
			type: "initiate_transaction",
		});
	};

	return (
		<AppContainer className="space-y-5" asChild>
			<div className="flex absolute right-5 -top-10 justify-end">
				<AppButton variant="primary" className="p-2" onClick={handleInitiateTransaction}>
					Initiate Transaction
				</AppButton>
			</div>
			<Collapsible defaultOpen={false} className="flex flex-col gap-5">
				<CollapsibleTrigger asChild className="self-end">
					<AppButton variant="mute" className="flex gap-2 items-center p-2 border bg-gray-100/25">
						<ChevronDown className="w-4 h-4" />
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
