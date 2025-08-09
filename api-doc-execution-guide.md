# API Documentation Generation & Validation Workflow

## 1. Service Discovery & Preparation
- Identify the target service folder (e.g., `services/business-user`).
- List all service files within the folder.

## 2. For Each Service File
### a. Read and Analyze
- Read the entire service file.
- Extract:
  - The endpoint path (from axios calls)
  - The HTTP method (GET, POST, PATCH, PUT, DELETE)
  - The function name and its intent (e.g., get, create, update, delete, invite, etc.)
  - The request parameters and body (from the Parameters type and axios call)
  - The response structure (from the Response type and axios call)

### b. Method Alignment Check
- Ensure the HTTP method matches the service function name:
  - `get` → GET
  - `create` → POST
  - `update` → PATCH/PUT
  - `delete`/`remove` → DELETE
  - `invite`/`assign`/`add` → POST
- If there is a mismatch, update the documentation to reflect the correct method and note the inconsistency for code review.

### c. Type Extraction
- Identify all types used in request and response (including nested types).
- Locate and read the relevant type definition files (e.g., `types/permission.types.ts`).

## 3. Documentation Drafting
- For each endpoint, document:
  - **Endpoint path and HTTP method**
  - **Description** of what the endpoint does
  - **Request body** (if applicable)
  - **Query/path parameters** (if applicable)
  - **Response body** (with sample JSON structure)
- Use inline comments like `{ /* see TypeName type */ }` for nested types.

## 4. Type Reference Section
- At the end of the documentation file, add a **Type Reference** section.
- For every referenced type (including nested ones), provide a full JSON structure example.
- Ensure all types referenced inline are defined in this section.

## 5. Consistency & Completeness Check
- Cross-check the documentation against the service implementation and type definitions:
  - Confirm all endpoints, parameters, and response structures match the code.
  - Ensure all referenced types are included in the Type Reference section.
  - Verify that HTTP methods align with function names.
- If any issues are found, update the documentation and/or note for code review.

## 6. Final Review
- Ensure the documentation is clear, complete, and self-contained.
- Confirm that a user with no access to the codebase/types can fully understand the API from the documentation alone.

---

## Example Usage

When you want to document a new service or update an existing one, just say:
> "Document the @service-folder using the standard execution flow. it should be placed in the @api-doc folder"

---




