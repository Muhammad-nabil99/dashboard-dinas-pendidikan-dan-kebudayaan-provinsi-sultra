<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Galeri;
use Illuminate\Http\Request;

class GaleriController extends Controller
{
        //menampilkan media
    public function index() {
        return Inertia::render("galeri/index", []);
    }
    public function create()
    {
        return Inertia::render("galeri/create", []);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'category' => 'required|in:foto,video',
            'instansi' => 'required|in:SMA,SMK,SLB',
            'cover_image' => 'required|string', // nanti bisa diganti file upload
            'media_count' => 'nullable|integer',
            'date' => 'nullable|date',
            'location' => 'nullable|string',
            'media' => 'required|array',
            'media.*.url' => 'required|string',
        ]);

        // 1️⃣ Simpan album
        $album = Galeri::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'category' => $validated['category'],
            'instansi' => $validated['instansi'],
            'cover_image' => $validated['cover_image'],
            'media_count' => count($validated['media']),
            'date' => $validated['date'] ?? null,
            'location' => $validated['location'] ?? null,
        ]);

        // 2️⃣ Simpan media
        foreach ($validated['media'] as $media) {
            $album->media()->create(['url' => $media['url']]);
        }

        return response()->json([
            'message' => 'Album & media berhasil dibuat',
            'album' => $album->load('media')
        ], 201);
    }
}
