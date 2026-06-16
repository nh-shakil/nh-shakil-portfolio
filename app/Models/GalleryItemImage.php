<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class GalleryItemImage extends Model
{
    protected $fillable = [
        'gallery_item_id',
        'path',
        'alt',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    protected static function booted(): void
    {
        static::deleting(function (self $image) {
            if ($image->path) {
                Storage::disk('public')->delete($image->path);
            }
        });
    }

    public function item(): BelongsTo
    {
        return $this->belongsTo(GalleryItem::class, 'gallery_item_id');
    }
}
