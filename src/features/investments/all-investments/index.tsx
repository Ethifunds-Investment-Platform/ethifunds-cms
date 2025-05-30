import AppContainer from "@/components/container/container";
import Render from "@/components/render";
import useInvestments from "./use-investments";
import * as React from "react";
import useUi from "@/hooks/use-ui";
import TableFilters from "../investment-table/table-filters";
import InvestmentTable from "../investment-table";
import TablePagination from "../investment-table/table-pagination";

export default function AllInvestments() {
	const { isFetching, isError, error, data, sign, category_id } = useInvestments();
	const { changeBackBtn } = useUi({});

	React.useLayoutEffect(() => {
		changeBackBtn({
			show: true,
			path: `/investments${category_id && `?category_id=${category_id}`}`,
		});

		return () => {
			changeBackBtn(null);
		};
	}, [category_id, changeBackBtn]);

	return (
		<AppContainer className="space-y-5">
			<h1 className="hero-accent">Investments </h1>

			<TableFilters disabled={isFetching} />

			<div className="flex h-screen flex-col">
				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="grow overflow-auto">
						<InvestmentTable
							data={data?.docs?.slice(0) ?? []}
							isEmpty={!data?.docs?.length}
							sign={sign}
						/>
					</div>
					{data && <TablePagination {...data} />}
				</Render>
			</div>
		</AppContainer>
	);
}
