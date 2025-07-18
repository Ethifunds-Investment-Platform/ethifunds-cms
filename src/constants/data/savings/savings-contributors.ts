import { SavingsContributor } from "@/types/savings.types";

export const savingsContributors: SavingsContributor[] = [
    {
        id: 1,
        user_id: 101,
        username: "john_doe",
        target_amount: "5000",
        amount_raised: "2500",
        savings_id: 1,
        created_at: "2023-01-01T10:00:00Z",
        updated_at: "2023-01-15T12:00:00Z",
    },
    {
        id: 2,
        user_id: 102,
        username: "jane_smith",
        target_amount: "3000",
        amount_raised: "1500",
        savings_id: 2,
        created_at: "2023-02-01T11:00:00Z",
        updated_at: "2023-02-10T14:00:00Z",
    },
    {
        id: 3,
        user_id: 103,
        username: "alice_wonder",
        target_amount: "4000",
        amount_raised: "4000",
        savings_id: 3,
        created_at: "2023-03-01T09:00:00Z",
        updated_at: "2023-03-20T16:00:00Z",
    },
    {
        id: 4,
        user_id: 104,
        username: "bob_builder",
        target_amount: "2000",
        amount_raised: "500",
        savings_id: 4,
        created_at: "2023-04-01T08:00:00Z",
        updated_at: "2023-04-05T10:00:00Z",
    },
    {
        id: 5,
        user_id: 105,
        username: "charlie_brown",
        target_amount: "10000",
        amount_raised: "7500",
        savings_id: 5,
        created_at: "2023-05-01T07:00:00Z",
        updated_at: "2023-05-15T18:00:00Z",
    },
];