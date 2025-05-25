import AppButton from "@/components/app-button";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { Input } from "@/components/ui/form-input";
import { PopupModal } from "@/components/ui/modal";
import { amountSeparator } from "@/lib/amount-separator";
import { sanitizeNumInput } from "@/lib/sanitize-num-input";
import { X } from "lucide-react";
import * as React from "react";
import useCounterOffer from "./use-counter-offer";

export default React.memo(function CounterOfferDialog() {
	const {
		open,
		isFetching,
		isError,
		error,
		isLoading,
		currency,
		data,
		counterPrice,
		details,
		reset,
		onChange,
		submit,
	} = useCounterOffer();

	return (
		<PopupModal
			handleClose={reset}
			open={open}
			className="relative w-full h-full p-8 overflow-auto lg:w-1/2"
		>
			<ErrorBoundary>
				<Render isLoading={isFetching} isError={isError} error={error} loadingPosition="center">
					<button
						onClick={reset}
						className="absolute top-0 right-0 flex items-center justify-center p-2 bg-white rounded-full lg:-top-8 lg:-right-8 size-8"
					>
						<X color="#908b8b" />
					</button>
					<div className="flex flex-col gap-3">
						<h1 className="highlight-standard text-neutral-1000">Create Counter Offer</h1>
						<span>Use the form below to buy units from other in this investment.</span>

						<div className="p-3 space-y-5 border rounded-lg bg-neutral-50">
							{Object.entries(details).map(([key, value]) => {
								return (
									<div
										key={key}
										className="flex items-center justify-between capitalize caption-standard text-neutral-700"
									>
										<span className="w-full">{key.split("_").join(" ")} </span>
										<span className="w-full">{value}</span>
									</div>
								);
							})}
						</div>

						<div className="space-y-5">
							<Input
								label={`Counter offer per unit (${currency.sign})`}
								name="counter_offer"
								placeholder="enter counter offer price per unit"
								value={sanitizeNumInput(counterPrice)}
								onChange={onChange}
								disabled={isLoading}
							/>

							<Input
								label={`Total Amount (${currency.sign})`}
								name="total_amount"
								value={amountSeparator(Number(counterPrice) * (data?.units ?? 0))}
								readOnly
							/>
						</div>

						<div className="flex justify-center w-full gap-10 pt-5">
							<AppButton variant="outline" className="w-1/2" onClick={reset} disabled={isLoading}>
								Cancel
							</AppButton>
							<AppButton variant="primary" className="w-1/2" onClick={submit} isLoading={isLoading}>
								Submit
							</AppButton>
						</div>
					</div>
				</Render>
			</ErrorBoundary>
		</PopupModal>
	);
});
