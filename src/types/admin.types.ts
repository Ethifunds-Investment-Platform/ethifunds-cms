export type AccountStatus = "active" | "inactive" | "suspended";
export type AdminRole = "admin" | "staff";

export const AdminRoles = ["admin"] as const;

export type Admin = {
	id: number;
	email: string;
	phone_number: string;
	first_name: string;
	last_name: string;
	last_login: string | null;
	login_attempt_count: number;
	role: AdminRole;
	status: AccountStatus;
	profile_picture: string | null;
	created_at: string;
	updated_at: string;
};

export type NewAdmin = {
	email: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	password: string;
	role: AdminRole;
};
