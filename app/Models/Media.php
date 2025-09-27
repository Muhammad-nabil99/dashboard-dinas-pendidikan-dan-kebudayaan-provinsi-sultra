<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'medias';
    protected $fillable = [
        'file',
    ];

    public function beritas()
    {
        return $this->hasMany(Berita::class);
    }
}
