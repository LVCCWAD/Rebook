<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity'
    ];

    public function carts()
    {
        return $this->belongsTo(Cart::class);
    }

    public function products()
    {
        return $this->belongsTo(Product::class);
    }
}
