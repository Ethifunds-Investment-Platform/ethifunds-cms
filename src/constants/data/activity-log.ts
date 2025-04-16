import { ActivityLog } from "@/types/user.types";

export const activityLog: ActivityLog[] = [
	{
		id: 1,
		user_id: "user_001",
		activity_type: "login",
		activity_date: "2023-10-01T10:00:00Z",
		created_at: "2023-10-01T10:00:00Z",
		updated_at: "2023-10-01T10:00:00Z",
		status_code: 200,
	},
	{
		id: 2,
		user_id: "user_002",
		activity_type: "update_profile",
		activity_date: "2023-10-02T12:30:00Z",
		created_at: "2023-10-02T12:30:00Z",
		updated_at: "2023-10-02T12:30:00Z",
		status_code: 200,
	},
	{
		id: 3,
		user_id: "user_003",
		activity_type: "password_change",
		activity_date: "2023-10-03T15:45:00Z",
		created_at: "2023-10-03T15:45:00Z",
		updated_at: "2023-10-03T15:45:00Z",
		status_code: 200,
	},
	{
		id: 4,
		user_id: "user_004",
		activity_type: "logout",
		activity_date: "2023-10-04T18:20:00Z",
		created_at: "2023-10-04T18:20:00Z",
		updated_at: "2023-10-04T18:20:00Z",
		status_code: 200,
	},
	{
		id: 5,
		user_id: "user_005",
		activity_type: "delete_account",
		activity_date: "2023-10-05T20:10:00Z",
		created_at: "2023-10-05T20:10:00Z",
		updated_at: "2023-10-05T20:10:00Z",
		status_code: 200,
	},
];
