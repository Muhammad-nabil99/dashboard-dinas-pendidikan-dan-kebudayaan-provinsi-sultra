<?php

namespace App\Http\Controllers;

use App\Models\LaporanKegiatan;
use Illuminate\Http\Request;
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
        // dd($request);

        $request->validate([
            'judul' => 'required|string|max:255',
            'penyelenggara' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'file' => 'nullable|file|mimes:pdf,png,jpeg|max:10240',
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
        $request->validate([
            'judul' => 'required|string|max:255',
            'penyelenggara' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'file' => 'nullable|file|mimes:pdf,png,jpeg|max:10240',
        ]);

        $path = $laporanKegiatan->file;
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('laporan-kegiatan', 'public');
        }

        $laporanKegiatan->update([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'penyelenggara' => $request->penyelenggara,
            'lokasi' => $request->lokasi,
            'file' => $path,
        ]);

        return redirect()->route('laporan-kegiatan.index')->with('message', 'Laporan kegiatan berhasil diperbarui');
    }
    public function destroy(LaporanKegiatan $laporanKegiatan){
        $laporanKegiatan->delete();
        return redirect()->route('laporan-kegiatan.index')->with('message','Laporan kegiatan berhasil dihapus');
    }
}
