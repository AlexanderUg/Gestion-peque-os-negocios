<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class StockMovementController extends Controller
{
    public function index()
    {
        $movements = StockMovement::with('product','location')->get(); // Obtener los movimientos con los productos asociados
        return view('stock_movements.index', compact('movements'));
    }

    public function create()
    {
        $products = Product::all(); // Obtener todos los productos disponibles
        $locations = Location::all();
        return view('stock_movements.create', compact('products','locations'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer',
            'type'       => 'required|in:entrada,salida',
            'reason'     => 'required|string|max:255',
            'date'       => 'nullable|date',
            'location_id' => 'nullable|exists:locations,id', 
        ]);

        StockMovement::create($validated); // Crear el movimiento de stock

        return redirect()->route('stock_movements.create')->with('success', 'Movimiento registrado correctamente.');
    }
    public function stockPorUbicacion()
    {
        $stockPorUbicacion = DB::table('stock_movements')
            ->select('product_id', 'location_id', DB::raw('SUM(CASE WHEN type = "entrada" THEN quantity ELSE -quantity END) as stock_total'))
            ->groupBy('product_id', 'location_id')
            ->get();

        return view('stock_movements.stock_por_ubicacion', compact('stockPorUbicacion'));
    }

}
