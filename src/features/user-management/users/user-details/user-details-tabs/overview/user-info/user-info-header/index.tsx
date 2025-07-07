import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user.types";
import classNames from "classnames";
import AccountActions from "./account-actions";
import { BadgeCheck } from "lucide-react";

type UserInfoHeaderProps = {
	signedUpAt: string;
	userName: string;
	isVerified: boolean;
	id: User["id"];
	accountStatus: User["status"];
	profile: User["profile_picture"];
};
export default function UserInfoHeader(props: UserInfoHeaderProps) {
	const initials = props.userName.split(" ");
	const statusClx = classNames("capitalize text-md px-4", {
		"bg-success-100 text-success-300 border-success-300": props.accountStatus === "active",
		"bg-warning-100 text-warning-300 border-warning-300": props.accountStatus === "inactive",
		"bg-error-100 text-error-300 border-error-300": props.accountStatus === "suspended",
	});

	return (
		<div className="flex justify-between">
			<div className="flex gap-10 items-center">
				<Badge
					className="flex relative justify-center items-center rounded-full size-20"
					variant={"outline"}
				>
					{props.profile ? (
						<img src={props.profile} alt={initials[0][0]} className="object-cover size-full" />
					) : (
						props.userName !=="" &&<span className="heading-3">{initials[0][0] + initials[1][0]}</span>
					)}

					{props.isVerified && (
						<BadgeCheck className="absolute right-0 bottom-0 text-primary-500" />
					)}
				</Badge>

				<div>
					<h1 className="feature-standard">{props.userName}</h1>
					<span>
						Signed up: {" "}
						{new Date(props.signedUpAt).toLocaleDateString("en-us", {
							dateStyle: "full",
						})}
					</span>
				</div>
			</div>

			<div className="flex gap-4 items-center">
				<Badge className={statusClx}>{props.accountStatus}</Badge>
				<AccountActions id={props.id} status={props.accountStatus} />
			</div>
		</div>
	);
}
