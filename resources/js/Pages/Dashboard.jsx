import TableBook from '@/Components/Table/TableBook';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    const booksData = [
        {
            id: 1,
            judul: 'Buku A',
            penulis: 'Penulis A',
            isbn: '12345',
            penerbit: 'Penerbit A',
            tahun_terbit: 2020,
            genre: 'Fiksi',
            harga: 50000,
            stok: 10,
        },
        {
            id: 2,
            judul: 'Buku B',
            penulis: 'Penulis B',
            isbn: '67890',
            penerbit: 'Penerbit B',
            tahun_terbit: 2021,
            genre: 'Non-Fiksi',
            harga: 60000,
            stok: 5,
        },
    ];
    return (
        <AuthenticatedLayout>
            <div className="h-screen w-full overflow-y-scroll">
                <TableBook books={booksData}></TableBook>
            </div>
        </AuthenticatedLayout>
    );
}
