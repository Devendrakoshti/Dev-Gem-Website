<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('follow_ups', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('client_id')->constrained('clients')->cascadeOnDelete();
            $table->date('date');
            $table->date('next_date')->nullable();
            $table->string('type'); // CALL, EMAIL, MEETING
            $table->text('notes')->nullable();
            
            $table->foreignUlid('employee_id')->constrained('users')->cascadeOnDelete();
            $table->string('employee_name')->nullable(); // Denormalized or join
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('follow_ups');
    }
};
