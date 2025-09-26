<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProdukHukum extends Model
{
    protected $fillable = [
        'judul',
        'deskripsi',
        'dokumen',
    ];
}
