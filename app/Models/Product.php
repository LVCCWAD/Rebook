<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    protected $fillable = [
        'seller_id',
        'name',
        'description',
        'price',
        'stock',
        'category_id',
        'image',
        'created_at',
        'updated_at',
    ];

    public function user(): BelongsTo
    {
        if($this->role !== 'seller') {
            abort(403, 'Unauthorized action.');
        }
        return $this->belongTo(User::class, 'seller_id');
    }

    public function categories(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_items')
            ->withPivot('quantity', 'price')
            ->withTimestamps();
    }
}
