<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    protected $fillable = [
        'galeri_id',
        'judul',
        'deskripsi',
        'file',
        'cover_image',
        'category',
        'instansi',
        'lokasi',
        'tabel',
    ];
}
