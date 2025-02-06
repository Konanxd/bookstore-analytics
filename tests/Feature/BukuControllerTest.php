<?php

// tests/Feature/BukuControllerTest.php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Buku;
use App\Models\Pesanan;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BukuControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_returns_a_list_of_books()
    {
        // Create a few books for testing
        Buku::factory()->count(3)->create();

        // Make a GET request to the index route
        $response = $this->get(route('buku.index'));

        // Assert that Inertia is being used and that the data includes 'books'
        $response->assertInertia(
            fn(Assert $page) =>
            $page->has('buku', 3)
        );
    }


    /** @test */
    public function it_creates_a_book()
    {
        $data = [
            'judul' => 'Test Book',
            'id_penuls' => 1,
            'isbn' => '1234567890123',
            'id_penerbit' => 1,
            'tahun_terbit' => '2025-01-01',
            'id_genre' => 1,
            'harga' => 10000,
            'stok' => 50,
        ];

        // Post a new book
        $response = $this->post(route('buku.store'), $data);

        // Assert the book is created in the database
        $this->assertDatabaseHas('buku', [
            'judul' => 'Test Book',
        ]);

        // Assert response is no content
        $response->assertNoContent();
    }

    /** @test */
    public function it_validates_book_creation()
    {
        $data = [
            'judul' => '', // Invalid data for title
            'id_penuls' => 1,
            'isbn' => '1234567890123',
            'id_penerbit' => 1,
            'tahun_terbit' => '2025-01-01',
            'id_genre' => 1,
            'harga' => 10000,
            'stok' => 50,
        ];

        $response = $this->post(route('buku.store'), $data);

        // Assert that validation fails
        $response->assertSessionHasErrors('judul');
    }

    /** @test */
    public function it_updates_a_book()
    {
        $book = Buku::factory()->create();

        $updatedData = [
            'judul' => 'Updated Book Title',
            'id_penuls' => $book->id_penuls,
            'isbn' => $book->isbn,
            'id_penerbit' => $book->id_penerbit,
            'tahun_terbit' => '2025-02-02',
            'id_genre' => $book->id_genre,
            'harga' => $book->harga,
            'stok' => $book->stok,
        ];

        $response = $this->put(route('buku.update', $book->id_buku), $updatedData);

        $response->assertNoContent();

        // Assert the book title was updated
        $this->assertDatabaseHas('buku', [
            'judul' => 'Updated Book Title',
        ]);
    }

    /** @test */
    public function it_cannot_delete_a_book_with_relations()
    {
        $book = Buku::factory()->create();
        Pesanan::create(['id_buku' => $book->id_buku, 'user_id' => 1]); // Create a relation in another table

        $response = $this->delete(route('buku.destroy', $book->id_buku));

        // Assert that the book is not deleted and an error message is returned
        $response->assertRedirect(route('buku.index'));
        $response->assertSessionHasErrors('message');
    }

    /** @test */
    public function it_deletes_a_book_without_relations()
    {
        $book = Buku::factory()->create();

        $response = $this->delete(route('buku.destroy', $book->id_buku));

        // Assert that the book is deleted from the database
        $this->assertDatabaseMissing('buku', [
            'id_buku' => $book->id_buku
        ]);

        $response->assertNoContent();
    }
}
