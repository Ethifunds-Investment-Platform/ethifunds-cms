import AppButton from "@/components/app-button";
import AppDrawer from "@/components/ui/app-drawer";
import * as React from "react";
import useSubscribers from "./use-subscribers";
import Render from "@/components/render";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { amountSeparator } from "@/lib/amount-separator";

export default React.memo(function InvestmentSubscribersDrawer() {
	const { open, isFetching, isError, error, subscribers, sign, toggleDrawer, closeDrawer } =
		useSubscribers();

	return (
		<AppDrawer
			title="Investment Subscribers"
			direction="right"
			open={open}
			handleChange={toggleDrawer}
			footer={
				!isFetching && (
					<div className="flex justify-end">
						<AppButton
							variant="mute"
							className="bg-neutral-100 text-neutral-700 w-1/2"
							onClick={closeDrawer}
						>
							Dismiss
						</AppButton>
					</div>
				)
			}
			className="overflow-y-auto hideScrollbar"
		>
			<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
				<div className="flex flex-col h-full px-5 mt-5 space-y-5 overflow-auto">
					{subscribers && subscribers.length > 0 ? (
						<div className="border rounded-lg overflow-auto">
							<Table>
								<TableHeader className="!bg-neutral-100/50">
									<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
										<TableHead>Username</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Invested</TableHead>
										<TableHead>Units</TableHead>
										<TableHead>ROI</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{subscribers.map((sub) => (
										<TableRow
											key={sub.id}
											className="caption-standard whitespace-nowrap text-center !text-neutral-700"
										>
											<TableCell>{sub.username}</TableCell>
											<TableCell>{sub.email}</TableCell>
											<TableCell>
												{sign} {amountSeparator(sub.total_invested)}
											</TableCell>
											<TableCell>{sub.units_purchased}</TableCell>
											<TableCell>{amountSeparator(sub.total_roi)}</TableCell>
											<TableCell>
												<span
													className={`capitalize text-xs px-2 py-1 rounded-full ${
														sub.status === "active"
															? "bg-success-100 text-success-300"
															: sub.status === "matured"
																? "bg-primary-100 text-primary"
																: "bg-neutral-100 text-neutral-500"
													}`}
												>
													{sub.status}
												</span>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					) : (
						<p className="caption-standard text-neutral-400">No subscribers yet</p>
					)}
				</div>
			</Render>
		</AppDrawer>
	);
});
