<?php

namespace App\Http\Controllers;

use App\Models\ProdukHukum;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProdukHukumController extends Controller
{
    public function index() {
        $produk_hukum = ProdukHukum::all();
        return Inertia::render("produk-hukum/index", compact('produk_hukum'));
    }

    public function create() {
        return Inertia::render("produk-hukum/create",[]);
    }

    public function store(Request $request) {
        // dd($request);
        $request->validate([
            'judul' => 'required|string|max:255', 
            'deskripsi' => 'required|string|max:255', 
            'file' => 'required|string|max:255', 
        ]);

        ProdukHukum::create($request->all());
        return redirect()->route('produk-hukum.index')->with('message', 'Produk hukum berhasil ditambahkan');
    }
    public function edit(ProdukHukum $produkHukum) {
        return Inertia::render('produk-hukum/edit', compact('produkHukum'));
    }

    public function update(Request $request, ProdukHukum $produkHukum) {
        $request->validate([
            'judul' => 'required|string|max:255', 
            'deskripsi' => 'required|string|max:255', 
            'file' => 'required|string|max:255', 
        ]);

        $produkHukum->update([
            'judul' => $request->input('judul'),
            'deskripsi' => $request->input('deskripsi'),
            'file' => $request->input('file'),
        ]);

        return redirect()->route('produk-hukum.index')->with('message', 'Produk hukum berhasil diedit');

    }

    public function destroy(ProdukHukum $produkHukum) {
        $produkHukum->delete();
        return redirect()->route('produk-hukum.index')->with('message',' Produk hukum berhasil dihapus');
    }

}
