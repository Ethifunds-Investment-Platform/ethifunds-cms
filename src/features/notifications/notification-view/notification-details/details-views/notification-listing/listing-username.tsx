import { Admin } from "@/types/admin.types";
import { User } from "@/types/user.types";
import * as React from "react";

type ListingUsernameProps = { isBuyer: boolean; user: User | Admin };

export default React.memo(function ListingUsername(props: ListingUsernameProps) {
	if (!props.user) return null;

	const isAdmin = (user: User | Admin): user is Admin => {
		return (user as Admin).first_name !== undefined;
	};

	const username = isAdmin(props.user) ? props.user.first_name : props.user.username;

	return (
		<div className="caption-standard flex justify-between capitalize text-neutral-700">
			<span className="w-full">{props.isBuyer ? "Seller username" : "Buyer username"} </span>
			<span className="w-full">{username}</span>
		</div>
	);
});
