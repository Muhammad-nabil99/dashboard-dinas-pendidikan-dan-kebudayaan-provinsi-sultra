<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\ProdukHukum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'dokumen' => 'nullable|mimes:pdf|max:2000',
        ]);

        $path = null;
        if ($request->hasFile('dokumen')) {
            // Simpan file ke storage/app/public/produk-hukum
            $path = $request->file('dokumen')->store('produk-hukum', 'public');
        }

        // ProdukHukum::create($request->all());
        ProdukHukum::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'dokumen' => $path, // simpan path ke DB
        ]);
        
        return redirect()->route('produk-hukum.index')->with('message', 'Produk hukum berhasil ditambahkan');
    }
    public function edit(ProdukHukum $produkHukum) {
        return Inertia::render('produk-hukum/edit', compact('produkHukum'));
    }

    // public function update(Request $request, ProdukHukum $produkHukum) {
    //     // dd($request->all());
    //     $request->validate([
    //         'judul' => 'required|string|max:255', 
    //         'deskripsi' => 'required|string|max:255', 
    //         'file' => 'required|string|max:255', 
    //     ]);

    //     $produkHukum->update(attributes: [
    //         'judul' => $request->input('judul'),
    //         'deskripsi' => $request->input('deskripsi'),
    //         'file' => $request->input('file'),
    //     ]);

    //     return redirect()->route('produk-hukum.index')->with('message', 'Produk hukum berhasil diedit');
    // }

    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'dokumen' => 'nullable|mimes:pdf|max:2000', // maksimal 20MB
        ]);

        $produkHukum = ProdukHukum::findOrFail($id);

        // update field biasa
        $produkHukum->judul = $request->judul;
        $produkHukum->deskripsi = $request->deskripsi;

        // jika ada file baru
        if ($request->hasFile('dokumen')) {
            // hapus file lama kalau ada
            if ($produkHukum->dokumen && Storage::disk('public')->exists($produkHukum->dokumen)) {
                Storage::disk('public')->delete($produkHukum->dokumen);
            }

            // simpan file baru
            $path = $request->file('dokumen')->store('produk-hukum', 'public');
            $produkHukum->dokumen = $path;
        }


        $produkHukum->save();

        return redirect()->route('produk-hukum.index')->with('success', 'Produk hukum berhasil diperbarui.');
    }


    public function destroy(ProdukHukum $produkHukum) {
        $produkHukum->delete();
        return redirect()->route('produk-hukum.index')->with('message',' Produk hukum berhasil dihapus');
    }

}