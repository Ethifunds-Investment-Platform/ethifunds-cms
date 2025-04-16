import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import * as React from "react";
import Render from "@/components/render";
import UsersTable from "../users-table";
import useAllUsers from "./use-all-users";
import TablePagination from "../users-table/table-pagination";
import TableFilters from "../users-table/table-filters";

export default function AllUsers() {
	const { changeBackBtn } = useUi({});

	const { isFetching, isError, error, data } = useAllUsers();

	React.useLayoutEffect(() => {
		changeBackBtn({
			show: true,
			path: "/users",
		});

		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);

	return (
		<AppContainer className="space-y-5">
			<div className="flex justify-between items-center">
				<h1 className="hero-accent">All Users</h1>
			</div>

			<TableFilters disabled={isFetching} />

			<Render isLoading={isFetching} isError={isError} error={error}>
				<div className="flex h-screen flex-col">
					<div className="grow overflow-auto">
						<UsersTable data={data?.docs?.slice(0) ?? []} isEmpty={!data?.docs?.length} />
					</div>
					{data && <TablePagination {...data} />}
				</div>
			</Render>
		</AppContainer>
	);
}
