import * as React from "react";
import {
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";
import AppButton from "../../app-button";
import { assets } from "@/constants";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";

export default React.memo(function AppSidebarFooter() {
  const { account } = useAppSelectors("account");
  const { ui } = useActions();


	const showLogoutDialog = () => {
		ui.changeDialog({
			show: true,
			type: "logout",
		});
	};
	return (
		<SidebarFooter>
			<div className="flex items-start justify-between p-3 group-data-[collapsible=icon]:hidden">
				<div className="flex flex-col">
					<span className="capitalize content-standard line-clamp-1 text-neutral-1000">
						{(account as any).username}
					</span>
					<small className="caption-standard text-[#667085] capitalize">
						{(account as any).user_type}
					</small>
				</div>
				<AppButton variant="ghost" className="!py-0" onClick={showLogoutDialog}>
					<img src={assets.logout_01} alt="logout" />
				</AppButton>
			</div>
			<SidebarMenuItem className="list-none">
				<SidebarMenuButton asChild>
					<AppButton
						variant="ghost"
						className="hidden w-full !py-0 group-data-[collapsible=icon]:flex"
						onClick={showLogoutDialog}
					>
						<img src={assets.logout_01} alt="logout" className="size-" />
					</AppButton>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarFooter>
	);
});
