import { Tabs } from "@/components/ui/tabs";
import TabContainer from "../tab-container";
import PersonalInfo from "./personal-info";
import * as React from "react";

export default React.memo(function Profile() {
	return (
		<TabContainer
			value="profile"
			title="Profile"
			subTitle="Update your personal information to keep your Ethifunds profile current and secure"
			className="space-y-8"
		>
			<Tabs
				defaultValue={"personal_info"}
				value={"personal_info"}
				className="flex flex-col lg:flex-row lg:gap-10"
			>
				<PersonalInfo />
			</Tabs>
		</TabContainer>
	);
});
