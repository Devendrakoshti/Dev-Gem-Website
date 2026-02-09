<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('mobile')->nullable();
            $table->string('company_name')->nullable();
            $table->string('company_address')->nullable();
            $table->string('email')->nullable();
            $table->string('status')->default('ACTIVE'); // ACTIVE, INACTIVE
            $table->string('stage')->default('NEW'); // NEW, CONTACTED, LOST
            
            $table->foreignUlid('assigned_to_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('assigned_to_name')->nullable(); // Denormalized for ease, or query from relationship
            
            $table->foreignUlid('created_by_employee_id')->nullable()->constrained('users')->nullOnDelete();
            
            $table->boolean('is_archived')->default(false);
            $table->boolean('is_deleted')->default(false); // Legacy flag mapping, but we use SoftDeletes
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
