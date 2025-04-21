import * as React from "react";
import DefaultTab from "./default-tab";
import ChangePasswordTab from "./change-password-tab";

export default function SecurityTabs() {
	return (
		<React.Fragment>
			<DefaultTab />
			<ChangePasswordTab />
		</React.Fragment>
	);
}
