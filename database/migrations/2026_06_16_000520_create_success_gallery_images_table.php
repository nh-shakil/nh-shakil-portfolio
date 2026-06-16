<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('success_gallery_images', function (Blueprint $table) {
            $table->id();
            $table->string('title', 180)->nullable();
            $table->string('caption', 500)->nullable();
            $table->string('path');
            $table->string('alt', 180)->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('success_gallery_images');
    }
};
