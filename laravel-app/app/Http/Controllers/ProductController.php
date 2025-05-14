<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StockMovement;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /* $product= Product::orderBy('id','desc')
            ->get();
        return view('products.index', compact('product')); */
        /* $products = Product::all();
    return Inertia::render('Products/Index', [
        'products' => $products]); */

         $products = Product::latest()->get(['id', 'nombre', 'precio', 'stock_inicial']);
    return inertia('Products/Index', [
        'products' => $products
    ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
/*         return view('products.create');
 */    
    return inertia('Products/Create');

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
        /* return view('products.show', compact('product')); */
        return inertia('Products/Show', [
        'product' => $product->load('Stockmovements') // Si tienes relaciones
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
     /*    return view('products.edit', compact('product')); */
         return inertia('Products/Edit', [
        'product' => $product
    ]);
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
    public function lowStock()
    {
        // Asegúrate de que solo obtienes productos válidos con stock <= 5
        $lowStockProducts = \App\Models\Product::where('stock_inicial', '<=', 5)->get();
    

             // Pasamos esos productos a la vista
          /*    return view('products.low_stock', compact('lowStockProducts')); */

          return Inertia::render('Low_Stock/Index', [
        'lowStockProducts' => $lowStockProducts
    ]);
    }

    public function exportLowStockPDF(){
        $lowStockProducts = Product::where('stock_inicial','<=',5)->get();

        $pdf = Pdf::loadView('products/low_stock_pdf',compact('lowStockProducts'));
        return $pdf->download('productos_stock_bajo.pdf');
    }
    
}
