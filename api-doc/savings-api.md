# Savings API Documentation

## Endpoints

### 1. Get Savings Contributors

**Endpoint:** `GET /savings/contributors`

**Description:** Retrieves a paginated list of savings contributors with optional filtering.

**Query Parameters:**

- `range` (optional): Date range filter
- `username` (optional): Filter by username
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 20)

**Response Body:**

```json
{
	"docs": [
		{
			"id": 1,
			"user_id": 123,
			"user": {
				/* see User type */
			},
			"amount_contributed": "50000.00",
			"last_contribution_date": "2024-01-15T10:30:00Z",
			"created_at": "2024-01-01T00:00:00Z",
			"updated_at": "2024-01-15T10:30:00Z"
		}
	],
	"totalDocs": 50,
	"limit": 20,
	"page": 1,
	"totalPages": 3,
	"hasNextPage": true,
	"nextPage": 2,
	"hasPrevPage": false,
	"prevPage": null,
	"pagingCounter": 1
}
```

---

### 2. Get Savings Transactions

**Endpoint:** `GET /savings/transactions`

**Description:** Retrieves a paginated list of savings transactions with optional filtering.

**Query Parameters:**

- `user_id` (optional): Filter by user ID
- `page` (optional): Page number for pagination (default: 1)
- `status` (optional): Filter by transaction status - "pending", "failed", or "successful"
- `range` (optional): Date range filter

**Response Body:**

```json
{
	"docs": [
		{
			"id": 1,
			"user_id": "123",
			"user": {
				/* see User type */
			},
			"amount": "25000.00",
			"status": "success",
			"transaction_reference": "TXN_REF_001",
			"transaction_date": "2024-01-15T10:30:00Z",
			"created_at": "2024-01-15T10:30:00Z",
			"updated_at": "2024-01-15T10:30:00Z"
		}
	],
	"totalDocs": 100,
	"limit": 20,
	"page": 1,
	"totalPages": 5,
	"hasNextPage": true,
	"nextPage": 2,
	"hasPrevPage": false,
	"prevPage": null,
	"pagingCounter": 1
}
```

---

### 3. Get Savings Transaction Details

**Endpoint:** `GET /savings/{savings_id}/transactions/{transaction_id}`

**Description:** Retrieves detailed information about a specific savings transaction.

**Path Parameters:**

- `savings_id` (required): The ID of the savings account
- `transaction_id` (required): The ID of the specific transaction

**Response Body:**

```json
{
	"id": 1,
	"user_id": "123",
	"user": {
		/* see User type */
	},
	"amount": "25000.00",
	"status": "success",
	"transaction_reference": "TXN_REF_001",
	"transaction_date": "2024-01-15T10:30:00Z",
	"created_at": "2024-01-15T10:30:00Z",
	"updated_at": "2024-01-15T10:30:00Z"
}
```

---

## Type Reference

### User Type

```json
{
	"id": 123,
	"username": "john_doe",
	"email": "john@example.com",
	"phone_number": "+2348012345678",
	"last_login": "2024-01-15T10:30:00Z",
	"login_attempt_count": 0,
	"status": "active",
	"remark": null,
	"locked_until": null,
	"profile_picture": "https://example.com/profile.jpg",
	"email_verified_at": "2024-01-01T00:00:00Z",
	"user_verifications": {
		"id": 1,
		"user_id": 123,
		"has_verified_email": true,
		"email_verified_at": "2024-01-01T00:00:00Z",
		"has_set_pin": true,
		"has_verified_phone": true,
		"phone_verified_at": "2024-01-01T00:00:00Z",
		"has_verified_bvn": true,
		"bvn_verified_at": "2024-01-01T00:00:00Z",
		"has_verified_nin": false,
		"nin_verified_at": null,
		"has_verified_address": false,
		"address_verified_at": null,
		"has_proof_of_income": false,
		"proof_of_income_verified_at": null,
		"has_verified_liveliness": false,
		"liveliness_verified_at": null,
		"created_at": "2024-01-01T00:00:00Z",
		"updated_at": "2024-01-01T00:00:00Z"
	},
	"user_profile": {
		"id": 1,
		"user_id": 123,
		"first_name": "John",
		"middle_name": "Michael",
		"last_name": "Doe",
		"date_of_birth": "1990-01-01",
		"occupation": "Software Engineer",
		"income_level": "50000-100000",
		"referral_code": "REF123",
		"residential_address": "123 Main St, Lagos",
		"gender": "male",
		"referred_by": 0,
		"user_tag": "premium",
		"created_at": "2024-01-01T00:00:00Z",
		"updated_at": "2024-01-01T00:00:00Z"
	},
	"bank_accounts": [
		{
			"id": 1,
			"user_id": 123,
			"bank_name": "First Bank",
			"account_number": "1234567890",
			"account_name": "John Doe",
			"is_default": true,
			"created_at": "2024-01-01T00:00:00Z",
			"updated_at": "2024-01-01T00:00:00Z"
		}
	],
	"two_factor": {
		"id": 1,
		"user_id": 123,
		"2fa_type": "google_authenticator",
		"is_active": 1,
		"qrcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
		"created_at": "2024-01-01T00:00:00Z",
		"updated_at": "2024-01-01T00:00:00Z"
	},
	"created_at": "2024-01-01T00:00:00Z",
	"updated_at": "2024-01-01T00:00:00Z"
}
```

### SavingsContributor Type

```json
{
	"id": 1,
	"user_id": 123,
	"user": {
		/* see User type above */
	},
	"amount_contributed": "50000.00",
	"last_contribution_date": "2024-01-15T10:30:00Z",
	"created_at": "2024-01-01T00:00:00Z",
	"updated_at": "2024-01-15T10:30:00Z"
}
```

### SavingsTransaction Type

```json
{
	"id": 1,
	"user_id": "123",
	"user": {
		/* see User type above */
	},
	"amount": "25000.00",
	"status": "success",
	"transaction_reference": "TXN_REF_001",
	"transaction_date": "2024-01-15T10:30:00Z",
	"created_at": "2024-01-15T10:30:00Z",
	"updated_at": "2024-01-15T10:30:00Z"
}
```

### PaginatedResponse Type

```json
{
	"docs": [
		/* Array of items (SavingsContributor or SavingsTransaction) */
	],
	"totalDocs": 100,
	"limit": 20,
	"page": 1,
	"totalPages": 5,
	"hasNextPage": true,
	"nextPage": 2,
	"hasPrevPage": false,
	"prevPage": null,
	"pagingCounter": 1
}
```

---

## Notes

- All endpoints support pagination with `page` and `limit` parameters
- Date filters use the `range` parameter for filtering by date ranges
- Transaction status values are: "pending", "failed", "successful"
- All monetary amounts are returned as strings to preserve precision
- User objects include comprehensive profile and verification information
- The API follows RESTful conventions with appropriate HTTP methods
