<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = ['nombre', 'parent_id'];

    public function children(){
        return $this->hasMany(Location::class, 'parent_id');
    }
public function parent()
{
    return $this->belongsTo(Location::class, 'parent_id');
}

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function childrenRecursive()
{
    return $this->children()->with('childrenRecursive');
}

    

}
