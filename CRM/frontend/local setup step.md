
# PHP/Laravel Backend Specification for NexusCRM

## Role
Act as a Senior Backend Engineer and build a robust REST API using **Laravel 11.x**.

## Core Requirements
1. **Authentication**: Use **Laravel Sanctum** for token-based API authentication.
2. **Database**: Use **MySQL** or **PostgreSQL**.
3. **ORM**: Use **Eloquent** for all database interactions.
4. **Architecture**: Use **API Resource Controllers** and **JSON Responses**.

## Database Migrations (Table Structures)
- **users**: id, first_name, last_name, email, employee_id, password, role (enum: ADMIN, EMPLOYEE), status (enum: ACTIVE, SUSPENDED), is_deleted (bool).
- **clients**: id, name, email, mobile, company_name, company_address, status, stage (enum: NEW, CONTACTED, etc), assigned_to_id (FK users), created_by_id (FK users), is_archived (bool), is_deleted (bool).
- **follow_ups**: id, client_id (FK), employee_id (FK), date, next_date, type (enum: CALL, WHATSAPP, etc), notes.
- **billing_items**: id, client_id (FK), service_name, description, amount_to_collect, billing_date, status.
- **payments_received**: id, client_id (FK), amount_received, received_date, payment_mode (enum: CASH, UPI, BANK), notes.
- **activity_logs**: id, actor_id (FK), action, target_id, target_type, metadata (json), timestamp.

## Routes (api.php)
- `POST /login`: Generate Sanctum token.
- `GET /user`: Return current authenticated user.
- `apiResource('clients', ClientController)`: Filter index by User Role.
- `GET /finance/summary/{client_id}`: Calculate balances.
- `POST /finance/billing` and `POST /finance/payments`.
- `GET /dashboard/stats`: Aggregate counts and financial sums.
- `GET /staff`: List all users (Admin middleware).

## Middleware
- Apply `auth:sanctum` to all routes except login.
- Create `AdminMiddleware` to restrict `/staff` and `/backup` endpoints.


<!-- Local Setup Step -->
How to run this locally (Setup Guide):
Project Folder: Create a folder named nexus-crm.
-- Frontend:
01. Run npm install react react-dom react-router-dom lucide-react.
02. Use a bundler like Vite: npm create vite@latest . --template react-ts.

-- Backend (Future):
01. composer create-project laravel/laravel nexuscrm
02. cd nexuscrm
03. composer require laravel/sanctum
04. php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
05. php artisan migrate
06. Connecting: The frontend API_BASE_URL in config/appConfig.ts should point to http://localhost:5000.