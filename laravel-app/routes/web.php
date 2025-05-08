<?php
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
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

/* Route::resource('/products', ProductController::class);
Route::resource('/products/create', ProductController::class);
Route::resource('/products/{id}/edit', ProductController::class);
 */

 Route::resource('locations', LocationController::class);

/*  Route::get('/locations/create', [LocationController::class, 'create']);
 Route::post('/locations', [LocationController::class, 'store']);  */

require __DIR__.'/auth.php';
