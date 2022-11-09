<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $table = "foods";
    protected $guarded = [];
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeFilter($query, array $filter)
    {
        $query->when(
            $filter['category_id'] ?? false,
            fn ($query, $category_id) => $query->where('category_id', $category_id)
        );
    }
}
