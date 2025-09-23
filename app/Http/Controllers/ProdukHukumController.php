<?php

// app/Http/Controllers/ProdukHukumController.php
namespace App\Http\Controllers;

use App\Models\ProdukHukum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProdukHukumController extends Controller
{
    public function index()
    {
        return response()->json(ProdukHukum::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
            'file' => 'required|file|mimes:pdf,doc,docx',
        ]);

        $path = $request->file('file')->store('produk_hukum', 'public');

        $produk = ProdukHukum::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'file' => $path,
        ]);

        return response()->json($produk, 201);
    }

    public function update(Request $request, ProdukHukum $produkHukum)
    {
        $request->validate([
            'judul' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx',
        ]);

        $data = $request->only(['judul', 'deskripsi']);

        if ($request->hasFile('file')) {
            Storage::disk('public')->delete($produkHukum->file);
            $data['file'] = $request->file('file')->store('produk_hukum', 'public');
        }

        $produkHukum->update($data);

        return response()->json($produkHukum);
    }

    public function destroy(ProdukHukum $produkHukum)
    {
        Storage::disk('public')->delete($produkHukum->file);
        $produkHukum->delete();

        return response()->json(null, 204);
    }
}

