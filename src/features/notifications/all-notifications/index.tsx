import AppContainer from "@/components/container/container";
import Render from "@/components/render";
import { Skeleton } from "@/components/ui/skeleton";
import useUi from "@/hooks/use-ui";
import * as React from "react";
import NotificationView from "../notification-view";
import useNotifications from "./use-notifications";
export default function AllNotifications() {
	const { changeBackBtn } = useUi({});

	const { isFetching, isError, error, data } = useNotifications();

	React.useLayoutEffect(() => {
		changeBackBtn({
			show: true,
			path: "/notifications",
		});

		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);

	return (
		<AppContainer className="space-y-5">
			<div className="flex justify-between items-center">
				<h1 className="hero-accent">Notification History</h1>
			</div>

			<Render
				isLoading={isFetching}
				isError={isError}
				error={error}
				loadingComponent={<LoadingComponent />}
			>
				<NotificationView data={data?.docs ?? []} className="h-screen" pagination={data} />
			</Render>
		</AppContainer>
	);
}

function LoadingComponent() {
	return (
		<div className="flex justify-between gap-5">
			<Skeleton className="h-screen w-full" />
			<Skeleton className="h-screen w-full" />
		</div>
	);
}
