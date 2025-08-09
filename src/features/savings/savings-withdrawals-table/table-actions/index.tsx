import * as React from "react";
	import bulkWithdrawalApproval from "@/services/savings/bulk-withdrawal-approval";
	import { toast } from "sonner";
	import AppButton from "@/components/app-button";
	import { cn } from "@/lib/utils";
	import { queryClient } from "@/config/query-client-config";

	type TableActionsProps = {
		id: string;
	};
	export default React.memo(function TableActions(props: TableActionsProps) {
		const [isApproving, setIsApproving] = React.useState(false);

		const approve = async () => {
			setIsApproving(true);
			try {
				await bulkWithdrawalApproval({
					withdrawal_ids: [Number(props.id)],
				});
				toast.success("withdrawal approved successfully");
				queryClient.invalidateQueries({ queryKey: ["savings-withdrawals"] });
			} catch (error) {
				toast.error("failed to approve withdrawal");
				throw error;
			} finally {
				setIsApproving(false);
			}
		};

		return (
			<AppButton
				variant={isApproving ? "ghost" : "mute"}
				isLoading={isApproving}
				onClick={approve}
				loaderType="simple"
				className={cn("p-2 w-20", {
					"bg-neutral-100": !isApproving,
				})}
			>
				Approve
			</AppButton>
			// <DropdownMenu>
			// 	<DropdownMenuTrigger className="!outline-non">
			// 		<img src={assets.option_icon_01} alt="" />
			// 	</DropdownMenuTrigger>
			// 	<DropdownMenuContent className="p-2">
			// 		<AppButton variant="mute" isLoading={isApproving} onClick={approve} className="">
			// 			Approve
			// 		</AppButton>
			// 	</DropdownMenuContent>
			// </DropdownMenu>
		);
	});
