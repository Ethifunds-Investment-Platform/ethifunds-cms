import NotFound from "@/components/prompts/not-found";
import UnderConstruction from "@/components/prompts/under-construction";
import DashboardPage from "@/pages/dashboard";
import InvestmentsPage from "@/pages/investments";
import AllInvestmentsPage from "@/pages/investments/all-investments";
import ListingPage from "@/pages/listings";
import AllListingPage from "@/pages/listings/all-listings";
import NotificationsPage from "@/pages/notifications";
import AllNotificationsPage from "@/pages/notifications/all-notifications";
import SavingsPage from "@/pages/savings";
import SavingsDetailsPage from "@/pages/savings/savings-details";
import SavingsTransactionsPage from "@/pages/savings/savings-transactions";
import TransactionsPage from "@/pages/transactions";
import AllTransactionsPage from "@/pages/transactions/all-transactions";
import TransactionDetailsPage from "@/pages/transactions/transactions-details";
import UsersManagementPage from "@/pages/user-management";
import AllUsersPage from "@/pages/user-management/all-users";
import UserAccountDetailsPage from "@/pages/user-management/user-account-details";

import { RouteProps } from "react-router-dom";

type CustomRouteProps = RouteProps & {};

const dashboardRoutes: CustomRouteProps[] = [
	{ path: "/dashboard", Component: DashboardPage },

	{ path: "/listings", Component: ListingPage },
	{ path: "/listings/all-listings", Component: AllListingPage },

	{ path: "/transactions", Component: TransactionsPage },
	{ path: "/transactions/all-transactions", Component: AllTransactionsPage },
	{ path: "/transactions/:transaction_id", Component: TransactionDetailsPage },

	{ path: "/users", Component: UsersManagementPage },
	{ path: "/users/:user_id", Component: UserAccountDetailsPage },
	{ path: "users/all-users", Component: AllUsersPage },

	{ path: "/investments", Component: InvestmentsPage },
	{ path: "/investments/all-investments", Component: AllInvestmentsPage },

	{ path: "/savings", Component: SavingsPage },
	{ path: "/savings/:savings_id", Component: SavingsDetailsPage },
	{ path: "/savings/:savings_id/transactions", Component: SavingsTransactionsPage },

	{ path: "/notifications", Component: NotificationsPage },
	{ path: "/notifications/all-notifications", Component: AllNotificationsPage },
	
	{ path: "/support", Component: UnderConstruction },
	{ path: "/settings", Component: UnderConstruction },
	{ path: "*", Component: NotFound },
];

export default dashboardRoutes;
