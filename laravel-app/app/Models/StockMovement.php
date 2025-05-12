<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'product_id',
        'quantity',
        'type',
        'reason',
        'date',
        'location_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function location()
{
    return $this->belongsTo(Location::class);
}
}
