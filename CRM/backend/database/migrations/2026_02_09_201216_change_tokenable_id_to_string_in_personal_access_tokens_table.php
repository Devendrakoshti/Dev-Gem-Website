<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            // Drop index first if needed, but modern laravel handles it?
            // Actually change() method might not drop legacy index properly or rename?
            // Let's modify directly.
            // But we must assume 'tokenable_id' is morphs part.
            // Usually morphs(name) creates name_type and name_id.
            // Index name is {table}_{name}_index.
            
            // To be safe, we change BOTH type and id? No, just id is wrong.
            // $table->string('tokenable_id', 64)->change();
            // Using 64 to cover ULID (26) and UUID (36).
            if (config('database.default') === 'mysql') {
                 // MySQL requires index dropping sometimes?
            }
            $table->string('tokenable_id', 64)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            //
        });
    }
};
