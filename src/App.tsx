import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";
import { useIsMobile } from "./hooks/use-mobile";
import MobileRestriction from "./components/prompts/mobile-restriction";

export default function App() {
	const isMobile = useIsMobile();

	if (isMobile) return <MobileRestriction />;

	return (
		<React.Fragment>
			{/* auth routes */}
			<Routes>
				{appRoutes.authRoutes.map((item, idx) => (
					<Route key={idx} {...item} />
				))}
			</Routes>
		</React.Fragment>
	);
}
