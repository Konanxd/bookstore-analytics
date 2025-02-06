import Navbar from '@/Components/navbar';
import TableBook from '@/Components/Table/TableBook';

export default function Dashboard() {
    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="h-screen w-full overflow-y-scroll">
                <TableBook books={books}></TableBook>
            </div>
        </div>
    );
}
