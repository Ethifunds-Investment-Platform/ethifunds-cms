import AdminInfoHeader from "./admin-info-header";
import capitalize from "@/lib/capitalize";
import { Admin } from "@/types/admin.types";

type AdminInfoProps = Admin & {};
export default function AdminInfo(props: AdminInfoProps) {
	const userName = `${props.first_name} ${props.last_name}`;

	const data = {
		email: props.email,
		phone: props.phone_number,
		lastSeen: !props.last_login
			? "N/A"
			: new Date(props.last_login).toLocaleDateString("en-us", {
					dateStyle: "full",
			  }),
		role: props.role,
	};

	return (
		<div className="border rounded-lg p-4 space-y-4">
			<AdminInfoHeader
				signedUpAt={props.created_at}
				userName={userName}
				id={props.id}
				accountStatus={props.status}
				profile={props.profile_picture}
			/>

			<div className="grid grid-cols-3 gap-3">
				{Object.entries(data).map(([key, value], idx) => {
					return (
						<div key={idx} className="">
							<span className="caption-standard capitalize text-neutral-500">
								{key.split("_").join(" ")}
							</span>
							<h2 className="highlight-standard"> {capitalize(value ?? "")}</h2>
						</div>
					);
				})}
			</div>
		</div>
	);
}
