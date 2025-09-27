<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BeritaController extends Controller
{
    public function index() {
        $berita = Berita::all();
        return Inertia::render("berita/index", compact("berita"));
    } 

    public function create() {
        return Inertia::render("berita/create",[]);
    }

    public function store(Request $request) {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'cover_image' => 'required|image|mimes:jpg,jpeg,png|max:20048',
            'file' => 'required|image|mimes:jpg,jpeg,png|max:20048',
            'category' => 'required|in:foto,video',
            'instansi' => 'required|in:umum,sma,smk,slb',
            'lokasi' => 'required|string|max:200',
        ]);

        $path = null;
        if ($request->hasFile('file')) {
            // Simpan file ke storage/app/public/produk-hukum
            $path = $request->file('file')->store('berita', 'public');
        }

        Berita::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'cover_image' => $path,
            'file' => $path,
            'category' => $request->category,
            'instansi' => $request->instansi,
            'lokasi' => $request->lokasi,
        ]);

        return redirect()->route('berita.index')->with('message', 'Berita berhasil ditambahkan');
    }
}
