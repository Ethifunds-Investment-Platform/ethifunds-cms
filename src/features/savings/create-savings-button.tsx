import AppButton from "@/components/app-button";
import useActions from "@/store/actions";
import { useQuery } from "@tanstack/react-query";
import getActiveCycle from "@/services/savings/get-active-cycle";
import * as React from "react";

export default React.memo(function CreateSavingsButton() {
	const { ui } = useActions();
	const { isFetching, data } = useQuery(["savings-check"], () => getActiveCycle());

	const hasSavings = data && data !== null;

	const click = () => {
		ui.changeDialog({
			show: true,
			type: hasSavings ? "update_savings" : "create_savings",
			id: data?.id.toString(),
		});
	};

	return (
		<div className="flex justify-end">
			<AppButton variant="primary" className="min-w-40" onClick={click} isLoading={isFetching}>
				{hasSavings ? "Edit Savings" : "Create Savings"}
			</AppButton>
		</div>
	);
});
