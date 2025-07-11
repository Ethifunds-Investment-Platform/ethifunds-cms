import AppButton from "@/components/app-button";
import useActions from "@/store/actions";
import * as React from "react";

export default React.memo(function ProcessDisbursement() {
	const { ui } = useActions();

	const click = () => {
		ui.changeDialog({
			show: true,
			type: "process_savings_disbursement",
		});
	};

	return (
		<div className="flex justify-end">
			<AppButton variant="primary" className="min-w-40" onClick={click}>
				Process Disbursement
			</AppButton>
		</div>
	);
});
