<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->string('title', 180)->nullable();
            $table->string('caption', 500)->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('gallery_item_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_item_id')->constrained('gallery_items')->cascadeOnDelete();
            $table->string('path');
            $table->string('alt', 180)->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        if (Schema::hasTable('success_gallery_images')) {
            $rows = DB::table('success_gallery_images')->orderBy('sort_order')->orderBy('id')->get();

            foreach ($rows as $row) {
                $itemId = DB::table('gallery_items')->insertGetId([
                    'title' => $row->title,
                    'caption' => $row->caption,
                    'is_published' => (bool) $row->is_published,
                    'sort_order' => (int) $row->sort_order,
                    'created_at' => $row->created_at,
                    'updated_at' => $row->updated_at,
                ]);

                DB::table('gallery_item_images')->insert([
                    'gallery_item_id' => $itemId,
                    'path' => $row->path,
                    'alt' => $row->alt,
                    'sort_order' => 10,
                    'created_at' => $row->created_at,
                    'updated_at' => $row->updated_at,
                ]);
            }

            Schema::drop('success_gallery_images');
        }
    }

    public function down(): void
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

        if (Schema::hasTable('gallery_items')) {
            $items = DB::table('gallery_items')->orderBy('sort_order')->orderBy('id')->get();

            foreach ($items as $item) {
                $image = DB::table('gallery_item_images')
                    ->where('gallery_item_id', $item->id)
                    ->orderBy('sort_order')
                    ->orderBy('id')
                    ->first();

                if (! $image) {
                    continue;
                }

                DB::table('success_gallery_images')->insert([
                    'title' => $item->title,
                    'caption' => $item->caption,
                    'path' => $image->path,
                    'alt' => $image->alt,
                    'is_published' => (bool) $item->is_published,
                    'sort_order' => (int) $item->sort_order,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                ]);
            }
        }

        Schema::dropIfExists('gallery_item_images');
        Schema::dropIfExists('gallery_items');
    }
};
