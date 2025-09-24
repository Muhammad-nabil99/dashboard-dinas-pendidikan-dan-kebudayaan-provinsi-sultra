<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProdukHukumController extends Controller
{
    public function index() {
        return Inertia::render("produk-hukum/index", []);
    }
}
