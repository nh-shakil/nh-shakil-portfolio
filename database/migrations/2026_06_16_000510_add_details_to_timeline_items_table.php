<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('timeline_items', function (Blueprint $table) {
            $table->string('employment_type', 40)->nullable()->after('org');
            $table->string('location', 180)->nullable()->after('period');
            $table->string('skills', 500)->nullable()->after('desc');
        });
    }

    public function down(): void
    {
        Schema::table('timeline_items', function (Blueprint $table) {
            $table->dropColumn(['employment_type', 'location', 'skills']);
        });
    }
};
