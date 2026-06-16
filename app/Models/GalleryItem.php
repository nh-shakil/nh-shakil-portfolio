<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GalleryItem extends Model
{
    protected $fillable = [
        'title',
        'caption',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(GalleryItemImage::class)->orderBy('sort_order')->orderBy('id');
    }
}
