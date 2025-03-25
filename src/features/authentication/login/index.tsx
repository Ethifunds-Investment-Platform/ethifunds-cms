import AuthContainer from "@/components/container/auth-container";
import Form from "./form";

export default function Login() {
	return (
		<AuthContainer slideIdx={2}>
			<div className="flex flex-col gap-10 py-10 lg:gap-5 lg:py-10">
				<div className="space-y-3 lg:px-10 lg:text-center">
					<h1 className="hero-accent text-neutral-base_black"> Welcome, Admin</h1>
					<p className="content-standard text-neutral-700">
						Kindly provide your admin credentials to gain access to the back-office
					</p>
				</div>
				<Form />
			</div>
		</AuthContainer>
	);
}
