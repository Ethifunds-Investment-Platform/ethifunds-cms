import { User } from "@/types/user.types";
import UserInfoHeader from "./user-info-header";
import AccountBalances from "./account-balances";
import capitalize from "@/lib/capitalize";
import truncate from "@/lib/truncate";

type UserInfoProps = User & {};
export default function UserInfo(props: UserInfoProps) {
	const userName = `${props.user_profile?.first_name??""} ${props.user_profile?.last_name??""}`;

	const getStatus = (value: boolean) => {
		return value ? "Verified" : "Not Verified";
	};

	const data = {
		username: props.username,
		email: truncate(props.email, 20),
		phone: props.phone_number,
		// address: props.user_profile?.residential_address,

		email_verified: getStatus(props?.user_verifications?.has_verified_email ?? false),
		phone_verified: getStatus(props.user_verifications?.has_verified_phone ?? false),
		address_verified: getStatus(props?.user_verifications?.has_verified_address ?? false),
		BVN_verified: getStatus(props?.user_verifications?.has_verified_bvn ?? false),
		NIN_verified: getStatus(props?.user_verifications?.has_verified_nin ?? false),

		lastSeen: !props.last_login
			? "N/A"
			: new Date(props.last_login).toLocaleDateString("en-us", {
					dateStyle: "medium",
			  }),
	};

	const isVerified = Object.entries(props?.user_verifications ?? {})
		.filter(([, value]) => typeof value === "boolean")
		.every((item) => item);

	return (
		<div className="p-4 space-y-4 rounded-lg border">
			<UserInfoHeader
				signedUpAt={props.created_at}
				userName={userName??""}
				isVerified={isVerified}
				id={props.id}
				accountStatus={props.status}
				profile={props.profile_picture}
			/>

			<AccountBalances />

			<div className="grid grid-cols-3 gap-3">
				{Object.entries(data).map(([key, value], idx) => {
					return (
						<div key={idx} className="">
							<span className="capitalize caption-standard text-neutral-500">
								{key.split("_").join(" ")}
							</span>
							<h2 className="highlight-standard" title={value}> {capitalize(value ?? "N/A")}</h2>
						</div>
					);
				})}
			</div>
		</div>
	);
}
