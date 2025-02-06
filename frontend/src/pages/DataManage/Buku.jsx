import React, { useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import TableBook from "../../components/TableBook";

const sampleData = [
  {
    id: 1,
    judul: "The Great Gatsby",
    penulis: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    penerbit: "Scribner",
    tahunTerbit: "1925",
    genre: "Fiction",
    harga: "$10.99",
    stok: 50,
  },
  {
    id: 2,
    judul: "To Kill a Mockingbird",
    penulis: "Harper Lee",
    isbn: "9780061120084",
    penerbit: "J.B. Lippincott & Co.",
    tahunTerbit: "1960",
    genre: "Fiction",
    harga: "$12.99",
    stok: 30,
  },
];

const formFields = [
  { id: "id", label: "ID" },
  { id: "judul", label: "Judul" },
  { id: "penulis", label: "Penulis" },
  { id: "isbn", label: "ISBN" },
  { id: "penerbit", label: "Penerbit" },
  { id: "tahunTerbit", label: "Tahun Terbit" },
  { id: "genre", label: "Genre" },
  { id: "harga", label: "Harga" },
  { id: "stok", label: "Stok" },
];

export default function Buku() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(sampleData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const [newData, setNewData] = useState({
    id: "",
    judul: "",
    penulis: "",
    isbn: "",
    penerbit: "",
    tahunTerbit: "",
    genre: "",
    harga: "",
    stok: "",
  });

  const handleAddData = () => {
    if (isEditMode) {
      // Update existing data
      const updatedData = [...data];
      updatedData[currentEditIndex] = {
        ...newData,
        id: data[currentEditIndex].id,
      };
      setData(updatedData);
      setIsEditMode(false);
    } else {
      // Add new data
      const newId =
        data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;

      setData([
        ...data,
        {
          id: newId,
          ...newData,
        },
      ]);
    }

    // Reset form and close modal
    setNewData({
      id: "",
      judul: "",
      penulis: "",
      isbn: "",
      penerbit: "",
      tahunTerbit: "",
      genre: "",
      harga: "",
      stok: "",
    });
    setIsModalOpen(false);
  };

  const handleEditData = (index) => {
    const itemToEdit = data[index];
    setNewData({
      ...itemToEdit,
    });
    setIsEditMode(true);
    setCurrentEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteData = (index) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto flex flex-col gap-3">
            <div>
              <button
                type="button"
                className="bg-violet-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsEditMode(false);
                  setNewData({
                    id: "",
                    judul: "",
                    penulis: "",
                    isbn: "",
                    penerbit: "",
                    tahunTerbit: "",
                    genre: "",
                    harga: "",
                    stok: "",
                  });
                }}
              >
                Tambah Data
              </button>
            </div>

            <TableBook
              data={data}
              onEdit={handleEditData}
              onDelete={handleDeleteData}
            />
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 z-50 overflow-y-scroll py-10">
            <div className="bg-white p-6 rounded shadow-lg w-[800px]">
              <h2 className="text-lg font-bold mb-4">
                {isEditMode ? "Edit Data" : "Tambah Data"}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {formFields.map((field) => (
                  <div key={field.id} className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded"
                      value={newData[field.id]}
                      onChange={(e) =>
                        setNewData({ ...newData, [field.id]: e.target.value })
                      }
                      disabled={field.id === "id" && isEditMode}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button
                  className="bg-violet-500 text-white px-4 py-2 rounded"
                  onClick={handleAddData}
                >
                  {isEditMode ? "Simpan Perubahan" : "Tambah"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
