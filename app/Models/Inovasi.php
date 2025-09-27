<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inovasi extends Model
{
    protected $fillable = [
        'medias_id',
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
