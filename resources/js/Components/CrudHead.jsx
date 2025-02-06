export default function CrudHead({ title, ...props }) {
    return (
        <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-bold uppercase">{title}</h1>
            <button
                {...props}
                type="button"
                className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold uppercase text-white hover:bg-blue-400"
            >
                tambah
            </button>
        </div>
    );
}
