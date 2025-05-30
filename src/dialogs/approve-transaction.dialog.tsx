import getTransactionDetails from "@/services/transactions/get-transaction-details";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useActions from "@/store/actions";
import { PopupModal } from "@/components/ui/modal";
import { X } from "lucide-react";
import Render from "@/components/render";
import { amountSeparator } from "@/lib/amount-separator";
import ErrorBoundary from "@/components/error-boundary";
import AppButton from "@/components/app-button";
import requestTransactionApproval from "@/services/transactions/request-transaction-approval";
import { toast } from "sonner";
import PinInput from "@/components/ui/form-input/otp-input";
import classNames from "classnames";
import approveTransaction from "@/services/transactions/approve-transaction";

export default React.memo(function ApproveTransactionDialog() {
	const { currency } = useAppSelector((state) => state.account);
	const { dialog } = useAppSelector((state) => state.ui);
	const [otp, setOtp] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [requested, setRequested] = React.useState(false);

	const id = React.useMemo(() => dialog.id, [dialog.id]);

	const queryClient = useQueryClient();
	const { ui } = useActions();

	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "approve_transaction";
	}, [dialog.show, dialog.type]);

	const { isFetching, isError, error, data } = useQuery(
		["transaction-id", id],
		() =>
			getTransactionDetails({
				transaction_id: id,
			}),
		{
			enabled: open,
		}
	);

	const toggleShow = (val: boolean) => {
		ui.changeDialog({ show: val, type: "", id: "" });
	};

	const close = () => {
		if (isLoading) return;
		setIsLoading(false);
		setRequested(false);
		setOtp("");
		toggleShow(false);
	};

	const details = React.useMemo(() => {
		return {
			session_ID: data?.transaction_reference || "",
			date: new Date(data?.created_at ?? "").toLocaleDateString("en-us", {
				dateStyle: "full",
			}),
			transaction_type: data?.transaction_type || "",
			amount: `${currency.sign} ${amountSeparator(data?.amount ?? "")}`,
			status: data?.status || "",
		};
	}, [data, currency.sign]);

	const requestApproval = async () => {
		setIsLoading(true);
		try {
			await requestTransactionApproval({
				transaction_id: id,
			});
			toast.success("OTP sent successfully");
			setRequested(true);
		} catch (error) {
			toast.error("Failed to send OTP");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const approve = async () => {
		setIsLoading(true);
		try {
			await approveTransaction({
				transaction_id: id,
				otp: otp,
			});
			toast.success("Transaction approved successfully");
			close();
			queryClient.invalidateQueries({ queryKey: ["pending-transactions"] });
		} catch (error) {
			toast.error("Failed to approve transaction");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};
	const inputClass = classNames("!size-14 bg-neutral-200 border-white");

	return (
		<PopupModal handleClose={close} open={open} className="relative w-full lg:w-1/2 min-h-96 p-8">
			<ErrorBoundary>
				<Render isLoading={isFetching} isError={isError} error={error} >
					<button
						onClick={close}
						className="absolute top-0 right-0 lg:-top-8 lg:-right-8 flex items-center justify-center size-8 p-2 rounded-full bg-white"
					>
						<X color="#908b8b" />
					</button>
					{!requested ? (
						<div className="flex flex-col gap-10">
							<h1 className="highlight-standard text-neutral-1000">Transaction Details</h1>

							<div className="space-y-5 border rounded-md p-5 bg-gray-100/25">
								{Object.entries(details).map(([key, value]) => {
									return (
										<div
											key={key}
											className="flex justify-between capitalize text-neutral-700 caption-standard"
										>
											<span className="w-full">{key.replace("_", " ")} </span>
											<span className="w-full">{value}</span>
										</div>
									);
								})}
							</div>

							<div className="text-center">
								<AppButton
									variant="primary"
									className="w-60"
									onClick={requestApproval}
									isLoading={isLoading}
								>
									Request Approval
								</AppButton>
							</div>
						</div>
					) : (
						<div className="flex flex-col gap-10">
							<h1 className="highlight-standard text-neutral-1000">Approve Transaction</h1>

							<div className="space-y-2 text-center">
								<small className="caption-standard text-neutral-500">
									Enter the approval OTP to approve this transaction
								</small>
								<PinInput value={otp} valueLength={4} onChange={setOtp} inputClass={inputClass} />
							</div>

							<div className="pt-5 text-center">
								<AppButton								
									isLoading={isLoading}
									variant="primary"
									className="content-accent w-60 rounded-xl py-4 text-white"
									disabled={isLoading}
									onClick={approve}
								>
									Approve
								</AppButton>
							</div>
						</div>
					)}
				</Render>
			</ErrorBoundary>
		</PopupModal>
	);
});
