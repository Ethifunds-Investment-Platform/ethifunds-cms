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
			<div className="flex items-center justify-between">
				<h1 className="hero-accent">Notifications </h1>
			</div>

			<Render
				isLoading={isFetching}
				isError={isError}
				error={error}
				loadingComponent={<LoadingComponent />}
			>
				<NotificationView data={data?.docs ?? []} className="h-screen" />
			</Render>
		</AppContainer>
	);
}

function LoadingComponent() {
	return (
		<div className="flex justify-between gap-5">
			<Skeleton className="w-full h-screen" />
			<Skeleton className="w-full h-screen" />
		</div>
	);
}
