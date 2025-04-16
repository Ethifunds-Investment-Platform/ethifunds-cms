import AppContainer from "@/components/container/container";
import Render from "@/components/render";
import AdminsTable from "../admins-table";
import useAllAdmins from "./use-all-admins";
import AppButton from "@/components/app-button";
import { PlusCircle } from "lucide-react";
import useActions from "@/store/actions";

export default function AllAdmins() {
	const { ui } = useActions();

	const { isFetching, isError, error, data } = useAllAdmins();

	const click = () => {
		ui.changeDialog({
			show: true,
			type: "new_admin",
		});
	};
	return (
		<AppContainer className="space-y-5">
			<div className="flex justify-between items-center">
				<h1 className="highlight-accent text-neutral-1000">All Admins</h1>

				<AppButton onClick={click} variant="primary" leftIcon={<PlusCircle />} className="flex items-center">
					Create Admin
				</AppButton>
			</div>

			<Render isLoading={isFetching} isError={isError} error={error}>
				<div className="flex h-screen flex-col">
					<div className="grow overflow-auto">
						<AdminsTable data={data ?? []} isEmpty={!data?.length} />
					</div>
				</div>
			</Render>
		</AppContainer>
	);
}
