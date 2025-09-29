<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProdukHukum extends Model
{
    protected $fillable = [
        'dokumens_id',
        'judul',
        'deskripsi',
    ];

    public function dokumens()
    {
        return $this->belongsTo(Dokumen::class, "dokumens_id");
    }
}
