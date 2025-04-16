import { Badge } from "@/components/ui/badge";
import classNames from "classnames";
import AccountActions from "./account-actions";
import { Admin } from "@/types/admin.types";

type AdminInfoHeaderProps = {
	signedUpAt: string;
	userName: string;
	id: Admin["id"];
	accountStatus: Admin["status"];
	profile: Admin["profile_picture"];
};
export default function AdminInfoHeader(props: AdminInfoHeaderProps) {
	const initials = props.userName.split(" ");
	const statusClx = classNames("capitalize text-md px-4", {
		"bg-success-100 text-success-300 border-success-300": props.accountStatus === "active",
		"bg-warning-100 text-warning-300 border-warning-300": props.accountStatus === "inactive",
		"bg-error-100 text-error-300 border-error-300": props.accountStatus === "suspended",
	});

	return (
		<div className="flex justify-between">
			<div className="flex items-center gap-10">
				<Badge
					className="items-center justify-center flex size-20 rounded-full"
					variant={"outline"}
				>
					{props.profile ? (
						<img src={props.profile} alt={initials[0][0]} className="object-cover size-full" />
					) : (
						<span className="heading-3"> {initials[0][0] + initials[1][0]}</span>
					)}
				</Badge>

				<div>
					<h1 className="feature-standard">{props.userName}</h1>
					<span>
						Signed up:{" "}
						{new Date(props.signedUpAt).toLocaleDateString("en-us", {
							dateStyle: "full",
						})}
					</span>
				</div>
			</div>

			<div className="flex items-center gap-4">
				<Badge className={statusClx}>{props.accountStatus}</Badge>
				<AccountActions id={props.id} status={props.accountStatus} />
			</div>
		</div>
	);
}
