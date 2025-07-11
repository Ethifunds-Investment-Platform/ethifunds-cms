import Render from "@/components/render";

import * as React from "react";
import useSavingsWithdrawals from "./use-savings-withdrawals";
import SavingsWithdrawalTable from "../savings-table";
import AppButton from "@/components/app-button";

export default React.memo(function SavingsWithdrawals() {
	const { isFetching, isError, error, data, sign, approveAll, isApproving } =
		useSavingsWithdrawals();

	return (
		<div className="space-y-5">
			<div className="flex justify-between items-center">
				<h1 className="hero-accent">Savings Withdrawals</h1>
				{!isFetching && data?.docs?.length && data?.docs?.length > 1 && (
					<AppButton
						variant="mute"
						isLoading={isApproving}
						onClick={approveAll}
						className="p-2 w-32 bg-neutral-200"
					>
						Approve All
					</AppButton>
				)}
			</div>

			<div className="flex flex-col h-screen">
				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="overflow-auto grow">
						<SavingsWithdrawalTable
							data={data?.docs?.slice(0) ?? []}
							isEmpty={!data?.docs?.length}
							sign={sign}
						/>
					</div>
				</Render>
			</div>
		</div>
	);
});
