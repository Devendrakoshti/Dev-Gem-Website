<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for 400+ concurrent user database performance.
     */
    public function up(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->index(['assigned_to_id', 'stage', 'is_deleted'], 'idx_clients_assigned_stage_deleted');
            $table->index(['stage', 'is_deleted'], 'idx_clients_stage_deleted');
            $table->index('created_at', 'idx_clients_created_at');
        });

        Schema::table('billing_items', function (Blueprint $table) {
            $table->index(['client_id', 'remaining_amount'], 'idx_billing_client_remaining');
        });

        Schema::table('payments_received', function (Blueprint $table) {
            $table->index(['client_id', 'received_date'], 'idx_payments_client_date');
        });

        Schema::table('follow_ups', function (Blueprint $table) {
            $table->index(['client_id', 'employee_id'], 'idx_followups_client_employee');
        });

        Schema::table('activity_logs', function (Blueprint $table) {
            $table->index(['actor_id', 'created_at'], 'idx_activity_actor_created');
            $table->index(['target_id', 'target_type'], 'idx_activity_target');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropIndex('idx_clients_assigned_stage_deleted');
            $table->dropIndex('idx_clients_stage_deleted');
            $table->dropIndex('idx_clients_created_at');
        });

        Schema::table('billing_items', function (Blueprint $table) {
            $table->dropIndex('idx_billing_client_remaining');
        });

        Schema::table('payments_received', function (Blueprint $table) {
            $table->dropIndex('idx_payments_client_date');
        });

        Schema::table('follow_ups', function (Blueprint $table) {
            $table->dropIndex('idx_followups_client_employee');
        });

        Schema::table('activity_logs', function (Blueprint $table) {
            $table->dropIndex('idx_activity_actor_created');
            $table->dropIndex('idx_activity_target');
        });
    }
};
