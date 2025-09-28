<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\ProdukHukumController;
use App\Models\Berita;
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
    Route::post('/produk-hukum', [ProdukHukumController::class, 'store'])->name('produk-hukum.store');
    Route::get('/produk-hukum/{produkHukum}/edit', [ProdukHukumController::class, 'edit'])->name('produk-hukum.edit');
    Route::post('/produk-hukum/{produkHukum}', [ProdukHukumController::class, 'update'])->name('produk-hukum.update');
    Route::delete('/produk-hukum/{produkHukum}', [ProdukHukumController::class, 'destroy'])->name('produk-hukum.destroy');
    
    // Berita
    Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
    Route::get('/berita/create', [BeritaController::class, 'create'])->name('berita.create');
    Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');
    Route::get('/berita/{berita}/edit', [BeritaController::class, 'edit'])->name('berita.edit');
    Route::put('/berita/{berita}', [BeritaController::class, 'update'])->name('berita.update');
    Route::delete('/berita/{berita}', [BeritaController::class, 'destroy'])->name('berita.destroy');
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
