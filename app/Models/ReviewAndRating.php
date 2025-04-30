<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReviewAndRating extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'rating',
        'comment',
        'created_at',
    ];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
