<?php

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
