<?php
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockMovementController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Exports\LowStockExport;
use App\Http\Controllers\HomeController;
use Maatwebsite\Excel\Facades\Excel;

/* Route::get('/', [HomeController::class, 'index'])->middleware(['auth', 'verified']);
 */
 
 Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/', fn () => Inertia::render('Home'));


Route::resource('products', ProductController::class);


Route::get('/products/low-stock/pdf', [ProductController::class, 'exportLowStockPDF']);


 Route::resource('locations', LocationController::class);


 Route::resource('StockMovement', StockMovementController::class);
 Route::resource('stock_movements', StockMovementController::class); 
 
Route::get('/low-stock', [ProductController::class, 'lowStock'])->name('low_stock');
Route::get('/stock-por-ubicacion', [StockMovementController::class, 'stockPorUbicacion'])->name('stock.por.ubicacion');


require __DIR__.'/auth.php';
