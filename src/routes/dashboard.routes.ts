import NotFound from "@/components/prompts/not-found";
import UnderConstruction from "@/components/prompts/under-construction";
import DashboardPage from "@/pages/dashboard";
import ListingPage from "@/pages/listings";
import AllListingPage from "@/pages/listings/all-listings";
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
	{ path: "/investments", Component: UnderConstruction },
	{ path: "/savings", Component: UnderConstruction },
	{ path: "/notifications", Component: UnderConstruction },
	{ path: "/reports", Component: UnderConstruction },
	{ path: "/support", Component: UnderConstruction },
	{ path: "/settings", Component: UnderConstruction },
	{ path: "*", Component: NotFound },
];

export default dashboardRoutes;
