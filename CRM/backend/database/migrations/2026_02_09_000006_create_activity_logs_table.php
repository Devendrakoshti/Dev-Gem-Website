<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->ulid('id')->primary();
            
            // Actor can be null if system action, or user
            $table->foreignUlid('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('actor_name')->nullable();
            
            $table->string('action'); // e.g., "Created Client", "Updated Client"
            
            $table->string('target_id')->nullable(); // Polymorphic-ish ID reference
            $table->string('target_type')->nullable(); // CLIENT, USER, BACKUP, etc.
            
            $table->timestamp('timestamp')->useCurrent();
            $table->json('metadata')->nullable(); // Store extra details like { "fromId": "...", "toId": "..." }
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
