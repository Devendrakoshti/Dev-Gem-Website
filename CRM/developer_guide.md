# 🛠️ Developer Technical Documentation - Nexus CRM

This document provides a comprehensive technical breakdown of **Nexus CRM** for developers, system architects, and maintainers.

---

## 🏗️ 1. System Architecture Overview

Nexus CRM is built using a decoupled architecture:

```
┌──────────────────────────────────────────────┐
│           React 19 + TypeScript SPA          │
│  (HashRouter, Lucide Icons, WebSocket Echo)  │
└──────────────────────┬───────────────────────┘
                       │ REST / WebSockets
┌──────────────────────▼───────────────────────┐
│            Laravel 12 REST API               │
│ (Sanctum Auth, Broadcast Events, Eloquent)   │
└────────┬───────────────────┬─────────────────┘
         │                   │
┌────────▼─────────┐ ┌───────▼─────────┐
│  MySQL Database  │ │   Redis Server  │
│  (Indexed Schema)│ │ (Caching Layer) │
└──────────────────┘ └─────────────────┘
```

---

## 📂 2. Repository Layout

```
CRM/
├── backend/
│   ├── app/
│   │   ├── Events/          # Broadcast events (ClientDataChanged, PaymentRecorded)
│   │   ├── Http/
│   │   │   ├── Controllers/ # REST API Controllers (Client, Payment, Dashboard, etc.)
│   │   │   └── Requests/    # Form validation request classes
│   │   ├── Listeners/       # Cache invalidation event listeners
│   │   ├── Models/          # Eloquent ORM Models (User, Client, BillingItem, etc.)
│   │   ├── Observers/       # Lead & Audit Observers
│   │   └── Services/        # CrmCacheService & LeadService
│   ├── config/              # Laravel configuration (broadcasting.php, cache.php)
│   ├── database/
│   │   └── migrations/      # Table definitions & performance index migrations
│   └── routes/
│       └── api.php          # API routes definition
└── frontend/
    ├── src/
    │   ├── components/      # UI components & Layouts (AppLayout, Badge, Modal)
    │   ├── config/          # Central app & WebSocket configuration (appConfig.ts)
    │   ├── hooks/           # Custom React hooks (useRealTime.ts)
    │   ├── pages/           # Application views (Dashboard, Clients, Payments, etc.)
    │   ├── services/        # API client, Auth, WebSocket, & Mock store services
    │   └── types.ts         # Central TypeScript interfaces & enums
```

---

## ⚡ 3. Real-Time WebSockets Architecture

### Architecture Pattern
1. **Backend Event Emission**: When a resource is modified, controllers dispatch Laravel broadcast events implementing `ShouldBroadcastNow`:
   - `App\Events\ClientDataChanged`
   - `App\Events\PaymentRecorded`
   - `App\Events\ActivityLoggedEvent`
2. **Channel**: Events broadcast over public channel `crm-updates`.
3. **Frontend Subscriptions**:
   - [`webSocketService.ts`](file:///c:/xampp/htdocs/github/Dev-Gem-Website/CRM/frontend/src/services/webSocketService.ts): Singleton connection manager with auto-reconnection and silent exception handling.
   - [`useRealTime.ts`](file:///c:/xampp/htdocs/github/Dev-Gem-Website/CRM/frontend/src/hooks/useRealTime.ts): Custom hook providing **400ms debouncing** to prevent API request spikes across 400+ concurrent clients.

---

## 🚀 4. Redis Data Caching Layer

### Architecture Pattern
- **Service Wrapper**: [`CrmCacheService.php`](file:///c:/xampp/htdocs/github/Dev-Gem-Website/CRM/backend/app/Services/CrmCacheService.php) wraps `Cache::remember()` with fallback try-catch handling.
- **Cache Invalidation Listener**: [`InvalidateCrmCache.php`](file:///c:/xampp/htdocs/github/Dev-Gem-Website/CRM/backend/app/Listeners/InvalidateCrmCache.php) listens to broadcast events and flushes stale dashboard and query cache keys automatically.

---

## 📡 5. API Reference Summary

| Endpoint | Method | Middleware | Controller Action | Description |
| :--- | :---: | :---: | :--- | :--- |
| `/api/login` | `POST` | Public | `AuthController@login` | Returns Sanctum Bearer token |
| `/api/dashboard` | `GET` | Auth | `DashboardController@index` | Cached dashboard statistics |
| `/api/clients` | `GET` | Auth | `ClientController@index` | Filtered list of clients |
| `/api/clients` | `POST` | Auth | `ClientController@store` | Create client + emit event |
| `/api/clients/{id}` | `GET` | Auth | `ClientController@show` | Client details with relations |
| `/api/clients/{id}/transfer` | `POST` | Auth | `ClientTransferController@transfer` | Transfer assigned employee |
| `/api/payments/pending` | `GET` | Auth | `PaymentController@pendingPayments` | Cached outstanding balances |
| `/api/payments` | `POST` | Auth | `PaymentController@store` | Record payment + emit event |
| `/api/billing` | `POST` | Auth | `BillingController@store` | Add invoice item + emit event |
| `/api/employees` | `GET` | Admin | `EmployeeController@index` | Manage team users |
| `/api/activity-logs` | `GET` | Admin | `ActivityLogController@index` | Audit trail paginated list |

---

## 🛢️ 6. Database Schema & Indexes

All foreign keys and search filter columns feature composite indexes in [`2026_03_14_000000_add_performance_indexes.php`](file:///c:/xampp/htdocs/github/Dev-Gem-Website/CRM/backend/database/migrations/2026_03_14_000000_add_performance_indexes.php):

- `clients`: `idx_clients_assigned_stage_deleted (assigned_to_id, stage, is_deleted)`
- `billing_items`: `idx_billing_client_remaining (client_id, remaining_amount)`
- `payments_received`: `idx_payments_client_date (client_id, received_date)`
- `follow_ups`: `idx_followups_client_employee (client_id, employee_id)`
- `activity_logs`: `idx_activity_actor_created (actor_id, created_at)`

---

## 💻 7. Local Development Workflow

1. **Start Backend**:
   ```bash
   cd backend
   php artisan serve
   ```
2. **Start WebSockets (Reverb)**:
   ```bash
   cd backend
   php artisan reverb:start --port=8080
   ```
3. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
4. **Type Check**:
   ```bash
   cd frontend
   npx tsc --noEmit
   ```
