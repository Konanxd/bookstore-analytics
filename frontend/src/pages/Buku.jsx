import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Table from "../components/table";

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

  //array data baru
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

  // fungsi tambah data
  const handleAddData = () => {
    setData([...data, { id: data.length + 1, ...newData }]);
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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto flex flex-col gap-3">
            {/* Add Data Button */}
            <div className="">
              <button
                type="button"
                className="bg-violet-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                Tambah Data
              </button>
            </div>

            {/* Table Component */}
            <Table data={data} />
          </div>
        </main>

        {/* Modal for Adding Data */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 z-50 overflow-y-scroll py-10">
            <div className="bg-white p-6 rounded shadow-lg w-[800px]">
              {" "}
              {/* Increased width */}
              <h2 className="text-lg font-bold mb-4">Tambah Data</h2>
              <div className="grid grid-cols-2 gap-4">
                {" "}
                {/* Grid for form fields */}
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
                    />
                  </div>
                ))}
              </div>
              {/* Buttons in their own div outside the grid */}
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
                  Tambah
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
