import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import TableFilters from "../listing-table/table-filters";
import TablePagination from "../listing-table/table-pagination";
import * as React from "react";
import useListing from "../use-listing";
import Render from "@/components/render";
import ListingTable from "../listing-table";
import SaleOptionSwitch from "./sale-option-switch";

export default function AllListings() {
	const { changeBackBtn } = useUi({});

	const { isFetching, isError, error, data, sign } = useListing();

	React.useLayoutEffect(() => {
		changeBackBtn({
			show: true,
			path:"/listings"
		});

		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);

	return (
		<AppContainer className="space-y-5">
			<div className="flex justify-between items-center">
				<h1 className="hero-accent">Listings History</h1>
				<SaleOptionSwitch />
			</div>

			<TableFilters disabled={isFetching} />

			<Render isLoading={isFetching} isError={isError} error={error}>
				<div className="flex h-screen flex-col">
					<div className="grow overflow-auto">
						<ListingTable
							data={data?.docs?.slice(0) ?? []}
							isEmpty={!data?.docs?.length}
							sign={sign}
						/>
					</div>
					{data && <TablePagination {...data} />}
				</div>
			</Render>
		</AppContainer>
	);
}
