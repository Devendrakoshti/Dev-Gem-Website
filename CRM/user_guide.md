# 📖 User Operations Manual - Nexus CRM

Welcome to **Nexus CRM**! This guide explains how to navigate and use the CRM system to manage clients, track lead conversion funnels, collect payments, and collaborate effectively.

---

## 👥 1. User Roles & Access Levels

Nexus CRM supports two distinct user roles:

| Role | Access Scope | Key Capabilities |
| :--- | :--- | :--- |
| 🛡️ **ADMIN** | **Full System Access** | Manage all clients, manage employee user accounts, view cross-team financial metrics & leaderboards, review audit activity logs, access trash & system backups. |
| 👨‍💼 **EMPLOYEE** | **Assigned Portfolio** | Manage assigned clients, log follow-up activities, add internal notes, record payments & billing items, request client transfers. |

---

## 📊 2. Dashboard Overview

Upon logging in, you will land on the **Dashboard**:

- **Total Contract Value (TCV)**: Total value of all billing items created.
- **Total Collected & Pending**: Live balance breakdown across active clients.
- **Conversion Funnel**: Visual pipeline showing client progress across 5 stages:
  1. `NEW` – Uncontacted lead.
  2. `CONTACTED` – Initial interaction completed.
  3. `INTERESTED` – Proposal or service interest confirmed.
  4. `CONVERTED` – Successfully acquired paying client.
  5. `LOST` – Lead closed without conversion.
- **Employee Leaderboard**: Ranks team members by number of converted clients.
- **Live Activity Feed**: Real-time stream of team actions (client additions, payments, transfers).

---

## 👤 3. Client Management

### Adding a New Client
1. Navigate to **Clients** in the left sidebar menu.
2. Click the **`+ Add New Client`** button.
3. Fill in Client Name, Mobile, Company Name, Email, Stage, and Assigned Employee.
4. Click **Save Client**. (All online team members will see the update in real-time).

### Updating Lead Stage & Info
1. Click on any client name in the list to open the **Client Details Page**.
2. Click **`Edit Client`** to update contact info, address, status, or lead stage.

### Transferring Client Assignment (Admin / Owner)
1. Click **`Transfer Client`** on the client row or details view.
2. Select the target employee from the dropdown list.
3. Confirm the transfer. A real-time notification will update the target employee's portfolio immediately.

---

## 💳 4. Billing & Payment Tracking

### Adding a Billing Item (Invoice / Fee)
1. Open the target **Client Details Page**.
2. Switch to the **Payments** tab.
3. Click **`+ Add Billing Item`**.
4. Enter Service Name, Amount to Collect, Issue Date, and Due Date.

### Recording Payment Received
1. On the Client Details page under Payments tab, click **`+ Record Payment`**.
2. Enter Amount Received, Received Date, Payment Mode (`CASH`, `UPI`, `BANK`), and optional notes.
3. The client's remaining balance updates automatically.

### Pending Payments Module
- Click **Pending Payments** in the sidebar to view all clients with outstanding balances.
- Use the **High Balance** filter to highlight accounts owing ₹50,000 or more.

---

## 📞 5. Follow-ups & Notes

### Logging Follow-ups
1. On the Client Details page under the **Follow-ups** tab, click **`+ Add Follow-up`**.
2. Select Communication Type (`CALL`, `WHATSAPP`, `EMAIL`, `MEETING`).
3. Set the follow-up date, next scheduled date, and summary notes.

### Internal Notes
- Use the **Notes** section to record team comments, requirements, or meeting summaries. Notes are timestamped with author identity.

---

## 🗑️ 6. Trash & Restoration (Admin Only)

- When a client is deleted, they are moved to the **Trash Repository** (Soft Delete).
- Admins can visit **Trash** to **Restore** a deleted client or **Purge** (permanently delete) records.

---

## ⚡ 7. Real-Time WebSockets Experience

Nexus CRM features **Instant Live Sync**:
- You **never need to manually refresh your browser page**.
- When a teammate records a payment, updates a client stage, or transfers an account, your dashboard and lists update automatically in real-time.
