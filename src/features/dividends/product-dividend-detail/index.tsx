import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import useCustomNavigation from "@/hooks/use-navigation";
import useUi from "@/hooks/use-ui";
import AppContainer from "@/components/container/container";
import Render from "@/components/render";
import getEthivestProductDividends from "@/services/dividends/get-ethivest-product-dividends";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { amountSeparator } from "@/lib/amount-separator";
import EmptyData from "@/components/empty-data";

export default function ProductDividendDetail() {
	const { params } = useCustomNavigation();
	const { changeBackBtn } = useUi({ title: "Product Dividend History" });
	const productId = Number(params.product_id);

	React.useLayoutEffect(() => {
		changeBackBtn({ show: true, path: "/dividends?tab=ethivest" });
		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);

	const { data, isFetching, isError, error } = useQuery(
		["ethivest-product-dividends", productId],
		() => getEthivestProductDividends({ product_id: productId }),
		{ enabled: !!productId }
	);

	return (
		<AppContainer className="space-y-5">
			<Render isLoading={isFetching} isError={isError} error={error}>
				{data && (
					<>
						<div className="space-y-2">
							<h1 className="hero-accent capitalize">{data.product.name}</h1>
							<div className="flex gap-4 text-sm text-neutral-500">
								<span>Status: <strong className="capitalize">{data.product.status}</strong></span>
								<span>Expected ROI: <strong>{data.product.expected_roi}%</strong></span>
								<span>Frequency: <strong className="capitalize">{data.product.dividend_payout_frequency}</strong></span>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-3">
							<div className="text-neutral-1000 space-y-3 h-24 w-full rounded-lg p-3 border">
								<h1 className="content-accent">Total Disbursed</h1>
								<p className="hero-accent">{amountSeparator(data.totals.total_disbursed.toFixed(2))}</p>
							</div>
							<div className="text-neutral-1000 space-y-3 h-24 w-full rounded-lg p-3 border">
								<h1 className="content-accent">Payout Rounds</h1>
								<p className="hero-accent">{data.totals.total_rounds}</p>
							</div>
							<div className="text-neutral-1000 space-y-3 h-24 w-full rounded-lg p-3 border">
								<h1 className="content-accent">Unique Investors</h1>
								<p className="hero-accent">{data.totals.unique_investors}</p>
							</div>
						</div>

						<div className="space-y-3">
							<h3 className="content-accent">Payout Rounds</h3>
							{data.rounds.length === 0 ? (
								<EmptyData
									title="No Payout Rounds"
									text="No dividends have been disbursed for this product yet"
								/>
							) : (
								<div className="overflow-auto">
									<Table>
										<TableHeader className="!bg-neutral-100/50">
											<TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
												<TableHead>Date</TableHead>
												<TableHead>ROI %</TableHead>
												<TableHead>Recipients</TableHead>
												<TableHead>Total Capital</TableHead>
												<TableHead>Total Dividends</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{data.rounds.map((round, idx) => (
												<TableRow
													key={idx}
													className="caption-standard whitespace-nowrap text-center !text-neutral-700"
												>
													<TableCell>
														{new Date(round.payout_date).toLocaleDateString("en-us", {
															dateStyle: "medium",
														})}
													</TableCell>
													<TableCell>{round.roi_percent}%</TableCell>
													<TableCell>{round.recipients}</TableCell>
													<TableCell>
														{amountSeparator(round.total_capital)}
													</TableCell>
													<TableCell>
														{amountSeparator(round.total_amount)}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							)}
						</div>
					</>
				)}
			</Render>
		</AppContainer>
	);
}
