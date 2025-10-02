<?php

namespace App\Http\Controllers;

use App\Models\LaporanKegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LaporanKegiatanController extends Controller
{
    public function index(){
        $laporan_kegiatan = LaporanKegiatan::all();
        return Inertia::render("laporan-kegiatan/index", compact('laporan_kegiatan'));
    }

    public function create(){
        return Inertia::render("laporan-kegiatan/create",[]);
    }

    public function store(Request $request){
        $request->validate([
            'judul' => 'required|string|max:255',
            'penyelenggara' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
        ]);

        $path = null;
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('laporan-kegiatan', 'public');
        }

        LaporanKegiatan::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'penyelenggara' => $request->penyelenggara,
            'lokasi' => $request->lokasi,
            'file' => $path,
        ]);

        return redirect()->route('laporan-kegiatan.index')->with('message', 'laporan kegiatan berhasil ditambahkan');
    }

    public function edit(LaporanKegiatan $laporanKegiatan){
        return Inertia::render("laporan-kegiatan/edit", compact('laporanKegiatan'));
    }

    public function update(Request $request, LaporanKegiatan $laporanKegiatan){
        // Make validation more flexible - use sometimes to only validate if present
        $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'penyelenggara' => 'sometimes|required|string|max:255',
            'lokasi' => 'sometimes|required|string|max:255',
            'deskripsi' => 'sometimes|required|string|max:255',
            'file' => 'nullable|file|mimes:pdf,png,jpeg|max:10240',
        ]);

        // Prepare data array with existing values as defaults
        $updateData = [
            'judul' => $request->input('judul', $laporanKegiatan->judul),
            'penyelenggara' => $request->input('penyelenggara', $laporanKegiatan->penyelenggara),
            'lokasi' => $request->input('lokasi', $laporanKegiatan->lokasi),
            'deskripsi' => $request->input('deskripsi', $laporanKegiatan->deskripsi),
        ];

        // Handle file upload
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($laporanKegiatan->file && Storage::disk('public')->exists($laporanKegiatan->file)) {
                Storage::disk('public')->delete($laporanKegiatan->file);
            }
            $updateData['file'] = $request->file('file')->store('laporan-kegiatan', 'public');
        }

        $laporanKegiatan->update($updateData);

        return redirect()->route('laporan-kegiatan.index')->with('message', 'Laporan kegiatan berhasil diperbarui');
    }

    public function destroy(LaporanKegiatan $laporanKegiatan){
        // Delete associated file when deleting record
        if ($laporanKegiatan->file && Storage::disk('public')->exists($laporanKegiatan->file)) {
            Storage::disk('public')->delete($laporanKegiatan->file);
        }
        
        $laporanKegiatan->delete();
        return redirect()->route('laporan-kegiatan.index')->with('message','Laporan kegiatan berhasil dihapus');
    }
}