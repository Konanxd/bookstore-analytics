<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;

class BukuController extends Controller
{
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'id_penuls' => 'sometimes|required|integer|max_digits:10',
            'isbn' => 'nullable|string|max:13',
            'id_penerbit' => 'sometimes|required|integer|max_digits:10',
            'tahun_terbit' => 'sometimes|required|dateTime',
            'id_genre' => 'sometimes|required|integer|max_digits:10',
            'harga' => 'sometimes|required|integer',
            'stok' => 'sometimes|required|integer|max_digits:5'
        ]);

        $book = Buku::findOrFaill($id);
        $book->update($validated);

        return redirect()->route('books.index', [], 303);
    }
}
