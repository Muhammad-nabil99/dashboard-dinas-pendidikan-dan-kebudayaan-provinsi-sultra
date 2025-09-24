<?php

use App\Http\Controllers\GaleriController;
use App\Http\Controllers\ProdukHukumController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // produk hukum
    Route::get('/produk-hukum', [ProdukHukumController::class, 'index'])->name('produk-hukum.index');
    Route::get('/produk-hukum/create', [ProdukHukumController::class, 'create'])->name('produk-hukum.create');
    
    //galeri
    Route::get('/galeri', [GaleriController::class, 'index'])->name('galeri.index');
    Route::get('/galeri', [GaleriController::class, 'create'])->name('galeri.create');
    Route::post('/albums', [GaleriController::class, 'store']);
    Route::resource('galeri', GaleriController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
