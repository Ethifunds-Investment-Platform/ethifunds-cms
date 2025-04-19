import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";

import useActions from "@/store/actions";
import { PopupModal } from "@/components/ui/modal";
import { X } from "lucide-react";
import Render from "@/components/render";
import { amountSeparator } from "@/lib/amount-separator";
import ErrorBoundary from "@/components/error-boundary";
import getSavingsTransactionsDetails from "@/services/savings/get-savings-transactions-details";
import useCustomNavigation from "@/hooks/use-navigation";

export default React.memo(function SavingsTransactionDetailsDialog() {
	const { currency } = useAppSelector((state) => state.account);
	const { dialog } = useAppSelector((state) => state.ui);
	const { params } = useCustomNavigation();
	const savings_id = params.savings_id ?? "";
	const transaction_id = React.useMemo(() => dialog.id, [dialog.id]);

	const { ui } = useActions();

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "savings_transaction_details";
	}, [dialog.show, dialog.type]);

	const { isFetching, isError, error, data } = useQuery(
		["savings-transaction-id", transaction_id],
		() =>
			getSavingsTransactionsDetails({
				savings_id,
				transaction_id,
			}),
		{
			enabled: open,
		}
	);

	const toggleShow = (val: boolean) => {
		ui.changeDialog({ show: val, type: "", id: "" });
	};

	const close = () => {
		toggleShow(false);
	};

	const details = React.useMemo(() => {
		return {
			date: new Date(data?.created_at ?? "").toLocaleDateString("en-us", {
				dateStyle: "full",
			}),
			username: data?.username,
			amount: `${currency.sign} ${amountSeparator(data?.amount ?? "")}`,
			target_amount: `${currency.sign} ${amountSeparator(data?.target_amount ?? "")}`,
			amount_paid: `${currency.sign} ${amountSeparator(data?.amount_paid ?? "")}`,
			transaction_reference: data?.transaction_reference,
			status: data?.status || "",
		};
	}, [data, currency.sign]);

	return (
		<PopupModal handleClose={close} open={open} className="relative w-full lg:w-1/2 h-96 p-8">
			<ErrorBoundary>
				<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
					<button
						onClick={close}
						className="absolute top-0 right-0 lg:-top-8 lg:-right-8 flex items-center justify-center size-8 p-2 rounded-full bg-white"
					>
						<X color="#908b8b" />
					</button>
					<div className="flex flex-col gap-10">
						<h1 className="highlight-standard text-neutral-1000">Transaction Details</h1>

						<div className="space-y-3 border rounded-lg p-4">
							{Object.entries(details).map(([key, value]) => {
								return (
									<div
										key={key}
										className="flex justify-between capitalize text-neutral-700 caption-standard"
									>
										<span className=" caption-accent ">{key.replace("_", " ")} </span>
										<span className="">{value}</span>
									</div>
								);
							})}
						</div>
					</div>
				</Render>
			</ErrorBoundary>
		</PopupModal>
	);
});
