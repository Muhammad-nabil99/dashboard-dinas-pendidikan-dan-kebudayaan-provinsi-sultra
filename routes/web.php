<?php

use App\Http\Controllers\ProdukHukumController;
use App\Http\Controllers\LaporanKegiatanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // laporan kegiatan
    Route::get('/laporan-kegiatan',[LaporanKegiatanController::class,'index'])->name('laporan-kegiatan.index');
    Route::get('/laporan-kegiatan/create',[LaporanKegiatanController::class,'create'])->name('laporan-kegiatan.create');
    Route::post('/laporan-kegiatan',[LaporanKegiatanController::class,'store'])->name('laporan-kegiatan.store');
    Route::get('/laporan-kegiatan/{laporanKegiatan}/edit',[LaporanKegiatanController::class,'edit'])->name('laporan-kegiatan.edit');
    Route::put('/laporan-kegiatan/{laporanKegiatan}',[LaporanKegiatanController::class,'update'])->name('laporan-kegiatan.update');
    Route::delete('/laporan-kegiatan/{laporanKegiatan}',[LaporanKegiatanController::class,'destroy'])->name('laporan-kegiatan.destroy');

    // produk hukum
    Route::get('/produk-hukum', [ProdukHukumController::class, 'index'])->name('produk-hukum.index');
    Route::get('/produk-hukum/create', [ProdukHukumController::class, 'create'])->name('produk-hukum.create');
    Route::post('/produk-hukum', [ProdukHukumController::class, 'store'])->name('produk-hukum.store');
    Route::delete('/produk-hukum/{produkHukum}', [ProdukHukumController::class, 'destroy'])->name('produk-hukum.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
