<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimelineItem extends Model
{
    protected $fillable = [
        'type',
        'title',
        'org',
        'employment_type',
        'period',
        'location',
        'desc',
        'skills',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];
}

