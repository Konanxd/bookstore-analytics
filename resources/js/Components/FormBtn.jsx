export default function FormBtn(...props) {
    return (
        <div className="flex w-full flex-row justify-end gap-4">
            <button
                className="rounded-md bg-blue-500 px-4 py-2 uppercase text-white"
                type="submit"
            >
                submit
            </button>
            <button
                onClick={() => setTambahOpen(false)}
                className="rounded-md bg-zinc-500 px-4 py-2 uppercase text-white"
            >
                cancel
            </button>
        </div>
    );
}
