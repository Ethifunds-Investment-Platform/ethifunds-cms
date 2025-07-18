import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";
import { useIsMobile } from "./hooks/use-mobile";
import MobileRestriction from "./components/prompts/mobile-restriction";
import DashboardLayout from "./layouts/dashboard.layout";
import NotFound from "./components/prompts/not-found";

export default function App() {
	const isMobile = useIsMobile();

	if (isMobile) return <MobileRestriction />;

	return (
		<React.Fragment>
			<Routes>
				{/* auth routes */}
				<Route>
					{appRoutes.authRoutes.map((item, idx) => (
						<Route key={idx} {...item} />
					))}
				</Route>

				{/* Dashboard Routes */}
				<Route element={<DashboardLayout />}>
					{appRoutes.dashboardRoutes.map((item, idx) => (
						<Route key={idx} {...item} />
					))}
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</React.Fragment>
	);
}
