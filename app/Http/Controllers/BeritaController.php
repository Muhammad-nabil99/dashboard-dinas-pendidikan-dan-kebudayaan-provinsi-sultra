<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index()
    {
        // ambil berita beserta relasi file (media)
        $berita = Berita::with('medias')->latest()->get();
        return Inertia::render("berita/index", compact("berita"));
    }

    public function create()
    {
        return Inertia::render("berita/create", []);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul'       => 'required|string|max:255',
            'deskripsi'   => 'required|string',
            'cover_image' => 'required|image|mimes:jpg,jpeg,png|max:20048',
            'file'        => 'required|image|mimes:jpg,jpeg,png|max:20048',
            'category'    => 'required|in:foto,video',
            'instansi'    => 'required|in:umum,sma,smk,slb',
            'lokasi'      => 'required|string|max:200',
        ]);

        // Upload cover image → disimpan di tabel beritas
        $coverPath = $request->file('cover_image')->store('berita/cover', 'public');

        // Upload file → disimpan di tabel medias
        $filePath = $request->file('file')->store('berita/file', 'public');

        // Simpan ke tabel medias
        $media = Media::create([
            'file' => $filePath,
        ]);

        // Simpan ke tabel beritas
        Berita::create([
            'medias_id'   => $media->id,   // relasi ke tabel medias
            'judul'       => $request->judul,
            'deskripsi'   => $request->deskripsi,
            'cover_image' => $coverPath,   // simpan path hasil store()
            'category'    => $request->category,
            'instansi'    => $request->instansi,
            'lokasi'      => $request->lokasi,
            'tabel'       => 'berita',
        ]);

        return redirect()->route('berita.index')
            ->with('message', 'Berita berhasil ditambahkan');
    }

    public function edit($id)
    {
        $berita = Berita::with('medias')->findOrFail($id);
        
        return Inertia::render('berita/edit', compact('berita'));
    }
}
