<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product= Product::orderBy('id','desc')
            ->get();
        return view('products.index', compact('product'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('products.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = new Product();
        $product ->nombre =$request->nombre;
        $product ->descripcion =$request->descripcion;
        $product ->precio =$request->precio;
        $product ->stock_inicial =$request->stock_inicial;

        $product->save();

        return redirect('/products');
    }

    /**
     * Display the specified resource.
     */
    public function show( $product)
    {
        $product= Product::find($product);
        return view('products.show', compact('product'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return view('products.edit', compact('product'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $product)
    {
        $product = Product::find($product);

        $product ->nombre =$request->nombre;
        $product ->descripcion =$request->descripcion;
        $product ->precio =$request->precio;
        $product ->stock_inicial =$request->stock_inicial;

        $product->save();
        return redirect("/products/{$product->id}");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $product)
    {
        $product = Product::find($product);
        $product->delete();
        return redirect("/products");
    }
}
