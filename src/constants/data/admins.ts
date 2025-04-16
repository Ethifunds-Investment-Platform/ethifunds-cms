import { Admin } from "@/types/admin.types";

export const admins: Admin[] = [
    {
        id: 1,
        email: "admin1@example.com",
        phone_number: "123-456-7890",
        first_name: "John",
        last_name: "Doe",
        last_login: "2023-01-01T10:00:00Z",
        login_attempt_count: 0,
        role: "admin",
        status: "active",
        profile_picture: null,
        created_at: "2022-12-01T08:00:00Z",
        updated_at: "2023-01-01T10:00:00Z",
    },
    {
        id: 2,
        email: "admin2@example.com",
        phone_number: "987-654-3210",
        first_name: "Jane",
        last_name: "Smith",
        last_login: "2023-01-02T11:00:00Z",
        login_attempt_count: 1,
        role: "staff",
        status: "inactive",
        profile_picture: null,
        created_at: "2022-12-02T09:00:00Z",
        updated_at: "2023-01-02T11:00:00Z",
    },
];
