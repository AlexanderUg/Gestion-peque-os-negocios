<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    // app/Models/Product.php
 use HasFactory;

    protected $fillable = ['nombre', 'descripcion', 'precio', 'stock_inicial', 'stock'];
public function stockMovements()
{
    return $this->hasMany(StockMovement::class);
}

public function getStockAttribute()
{
    $entradas = $this->stockMovements()->where('type', 'entrada')->sum('quantity');
    $salidas = $this->stockMovements()->where('type', 'salida')->sum('quantity');
    return $entradas - $salidas;
}



}
