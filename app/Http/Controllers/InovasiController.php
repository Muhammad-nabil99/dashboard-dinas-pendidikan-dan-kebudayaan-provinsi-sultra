<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Media;
use App\Models\Inovasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InovasiController extends Controller
{
    public function index()
    {
        $inovasi = Inovasi::with('medias')->latest()->get();
        return Inertia::render('inovasi/index', compact('inovasi'));
    }

    public function create()
    {
        return Inertia::render('inovasi/create', []);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul'       => 'required|string|max:255',
            'deskripsi'   => 'required|string',
            'cover_image' => 'required|image|mimes:jpg,jpeg,png|max:20048',
            'files.*'     => 'nullable|mimes:jpg,jpeg,png,mp4,mov,avi|max:50000',
            'category'    => 'nullable|in:foto,video',
            'instansi'    => 'required|in:umum,sma,smk,slb',
            'lokasi'      => 'required|string|max:200',
            'video_urls'  => 'nullable|array',
            'video_urls.*'=> 'url',
        ]);

        // simpan cover image
        $coverPath = $request->file('cover_image')->store('inovasi/cover', 'public');

        // simpan semua media ke array JSON
        $mediaFiles = [];

        // upload file gambar/video lokal
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('inovasi/file', 'public');
                $type = in_array($file->extension(), ['mp4','mov','avi']) ? 'video' : 'foto';
                $mediaFiles[] = ['file' => $path, 'type' => $type];
            }
        }

        // simpan link video
        if ($request->video_urls) {
            foreach ($request->video_urls as $url) {
                $mediaFiles[] = ['file' => $url, 'type' => 'video'];
            }
        }

        // buat media
        $media = Media::create([
            'file' => $mediaFiles
        ]);

        // buat inovasi
        Inovasi::create([
            'medias_id'   => $media->id,
            'judul'       => $request->judul,
            'deskripsi'   => $request->deskripsi,
            'cover_image' => $coverPath,
            'category'    => $request->category,
            'instansi'    => $request->instansi,
            'lokasi'      => $request->lokasi,
            'tabel'       => 'inovasi',
        ]);

        return redirect()->route('inovasi.index')
            ->with('message', 'Inovasi berhasil ditambahkan');
    }

    public function edit($id)
    {
        $inovasi = Inovasi::with('medias')->findOrFail($id);
        return Inertia::render('inovasi/edit', compact('inovasi'));
    }

    public function update(Request $request, Inovasi $inovasi)
    {
        $request->validate([
            'judul'       => 'required|string|max:255',
            'deskripsi'   => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:20048',
            'files.*'     => 'nullable|mimes:jpg,jpeg,png,mp4,mov,avi|max:50000',
            'category'    => 'nullable|in:foto,video',
            'instansi'    => 'required|in:umum,sma,smk,slb',
            'lokasi'      => 'required|string|max:200',
            'video_urls'  => 'nullable|array',
            'video_urls.*'=> 'url',
        ]);

        // update cover image jika ada
        if ($request->hasFile('cover_image')) {
            $coverPath = $request->file('cover_image')->store('inovasi/cover', 'public');
            $inovasi->cover_image = $coverPath;
        }

        // handle media
        $mediaFiles = [];

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('inovasi/file', 'public');
                $type = in_array($file->extension(), ['mp4','mov','avi']) ? 'video' : 'foto';
                $mediaFiles[] = ['file' => $path, 'type' => $type];
            }
        }

        if ($request->video_urls) {
            foreach ($request->video_urls as $url) {
                $mediaFiles[] = ['file' => $url, 'type' => 'video'];
            }
        }

        // update media jika ada
        if ($inovasi->medias) {
            $inovasi->medias->update(['file' => $mediaFiles]);
        }

        // update inovasi
        $inovasi->update([
            'judul'       => $request->judul,
            'deskripsi'   => $request->deskripsi,
            'category'    => $request->category,
            'instansi'    => $request->instansi,
            'lokasi'      => $request->lokasi,
        ]);

        return redirect()->route('inovasi.index')
            ->with('message', 'Inovasi berhasil diperbarui');
    }

    public function destroy($id)
    {
        $inovasi = Inovasi::with('medias')->findOrFail($id);

        // Hapus cover image di storage
        if ($inovasi->cover_image && Storage::disk('public')->exists($inovasi->cover_image)) {
            Storage::disk('public')->delete($inovasi->cover_image);
        }

        // Hapus semua file media
        if ($inovasi->medias && is_array($inovasi->medias->file)) {
            foreach ($inovasi->medias->file as $media) {
                if (isset($media['file']) && !preg_match('/^https?:\/\//', $media['file'])) {
                    // hanya hapus file lokal
                    if (Storage::disk('public')->exists($media['file'])) {
                        Storage::disk('public')->delete($media['file']);
                    }
                }
            }

            // Hapus record medias
            $inovasi->medias->delete();
        }

        // Hapus record inovasi
        $inovasi->delete();

        return redirect()->route('inovasi.index')
            ->with('message', 'Inovasi berhasil dihapus beserta media terkait');
    }
}
