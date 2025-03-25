import NotFound from "@/components/prompts/not-found";
import LoginPage from "@/pages/authentication/login";
import RecoveryPage from "@/pages/authentication/recovery";
import RecoveryVerifyEmailPage from "@/pages/authentication/recovery-verify-email";
import ResetPasswordPage from "@/pages/authentication/reset-password";
import ResetPasswordSuccessPage from "@/pages/authentication/reset-password-success";
import TwoFactoryAuthPage from "@/pages/authentication/two-factory-auth";
import { RouteProps } from "react-router-dom";

type CustomRouteProps = RouteProps & {};

const authRoutes: CustomRouteProps[] = [
	{ index: true, Component: LoginPage },
	{ path: "/2fa-verify", Component: TwoFactoryAuthPage },
	{ path: "/recovery", Component: RecoveryPage },
	{ path: "/recovery/verify-email", Component: RecoveryVerifyEmailPage },
	{ path: "/recovery/reset-password", Component: ResetPasswordPage },
	{ path: "/recovery/reset-password/success", Component: ResetPasswordSuccessPage },
	{ path: "*", Component: NotFound },
];

export default authRoutes;
