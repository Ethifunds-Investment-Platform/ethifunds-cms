import AppContainer from "@/components/container/container";
import InvestmentSubscribers from "@/features/investments/investment-subscribers";
import useUi from "@/hooks/use-ui";
import useSeo from "@/hooks/use-seo";
import * as React from "react";

export default function InvestmentSubscribersPage() {
	useSeo({ pageTitle: "Investment Subscribers" });
	const { changeBackBtn } = useUi({ title: "Investment Subscribers" });

	React.useLayoutEffect(() => {
		changeBackBtn({ show: true, path: "/investments/all-investments" });
		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);

	return (
		<AppContainer>
			<InvestmentSubscribers />
		</AppContainer>
	);
}
