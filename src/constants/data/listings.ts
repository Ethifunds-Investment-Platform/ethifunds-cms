import { Listing, SellerInfo } from "@/types/listing.types";
import { products } from "./products";

export const seller_info: SellerInfo[] = [
	{
		id: 1,
		name: "John Doe",
		email: "johndoe@example.com",
		phone: "123-456-7890",
		address: "123 Main St, Springfield",
		created_at: "2023-01-01T00:00:00Z",
		updated_at: "2023-01-01T00:00:00Z",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "janesmith@example.com",
		phone: "987-654-3210",
		address: "456 Elm St, Springfield",
		created_at: "2023-01-02T00:00:00Z",
		updated_at: "2023-01-02T00:00:00Z",
	},
	{
		id: 3,
		name: "Alice Johnson",
		email: "alicejohnson@example.com",
		phone: "555-123-4567",
		address: "789 Oak St, Springfield",
		created_at: "2023-01-03T00:00:00Z",
		updated_at: "2023-01-03T00:00:00Z",
	},
];

export const listings: Listing[] = [
	{
		id: 1,
		product_id: products[0].id,
		product: products[0],
		seller_info: seller_info[Math.floor(Math.random() * seller_info.length)],
		buyer_product_id: null,
		units: 10,
		final_price_per_unit: "100",
		asking_price_per_unit: "120",
		counter_price_per_unit: "110",
		total_price: "1000",
		sale_option: "ethifunds",
		status: "approved",
		created_at: "2023-01-01T00:00:00Z",
		updated_at: "2023-01-01T00:00:00Z",
	},
	{
		id: 2,
		product_id: products[1].id,
		product: products[1],
		seller_info: seller_info[Math.floor(Math.random() * seller_info.length)],
		buyer_product_id: null,
		units: 5,
		final_price_per_unit: "200",
		asking_price_per_unit: "220",
		counter_price_per_unit: "210",
		total_price: "1000",
		sale_option: "marketplace",
		status: "approved",
		created_at: "2023-01-02T00:00:00Z",
		updated_at: "2023-01-02T00:00:00Z",
	},
	{
		id: 3,
		product_id: products[0].id,
		product: products[0],
		seller_info: seller_info[Math.floor(Math.random() * seller_info.length)],
		buyer_product_id: null,
		units: 8,
		final_price_per_unit: "150",
		asking_price_per_unit: "170",
		counter_price_per_unit: "160",
		total_price: "1200",
		sale_option: "marketplace",
		status: "pending",
		created_at: "2023-01-03T00:00:00Z",
		updated_at: "2023-01-03T00:00:00Z",
	},
	{
		id: 4,
		product_id: products[1].id,
		product: products[1],
		seller_info: seller_info[Math.floor(Math.random() * seller_info.length)],
		buyer_product_id: null,
		units: 12,
		final_price_per_unit: "90",
		asking_price_per_unit: "100",
		counter_price_per_unit: "95",
		total_price: "1080",
		sale_option: "ethifunds",
		status: "pending",
		created_at: "2023-01-04T00:00:00Z",
		updated_at: "2023-01-04T00:00:00Z",
	},
	{
		id: 5,
		product_id: products[0].id,
		product: products[0],
		seller_info: seller_info[Math.floor(Math.random() * seller_info.length)],
		buyer_product_id: null,
		units: 20,
		final_price_per_unit: "50",
		asking_price_per_unit: "60",
		counter_price_per_unit: "55",
		total_price: "1000",
		sale_option: "ethifunds",
		status: "rejected",
		created_at: "2023-01-05T00:00:00Z",
		updated_at: "2023-01-05T00:00:00Z",
	},
];
