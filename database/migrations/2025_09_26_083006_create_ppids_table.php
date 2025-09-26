<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ppids', function (Blueprint $table) {
            $table->id();
            $table->foreignId('galeris_id')->constrained('galeris')->onDelete('cascade');
            $table->string('judul');
            $table->string('file');
            $table->string('dokumen');
            $table->string('deskripsi');
            $table->string('cover_image');
            $table->string('lokasi');
            $table->string('tabel')->default('ppid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppids');
    }
};
