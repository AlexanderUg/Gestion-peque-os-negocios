<?php
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockMovementController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::resource('products', ProductController::class);

 Route::resource('locations', LocationController::class);


 Route::resource('StockMovement', StockMovementController::class);
 Route::resource('stock_movements', StockMovementController::class); 
 
Route::get('/low-stock', [ProductController::class, 'lowStock'])->name('low_stock');
Route::get('/stock-por-ubicacion', [StockMovementController::class, 'stockPorUbicacion'])->name('stock.por.ubicacion');


require __DIR__.'/auth.php';
