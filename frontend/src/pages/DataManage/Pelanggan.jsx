import React, { useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import TableCustomer from "../../components/TableCustomer";

const sampleData = [
  {
    id_pelanggan: 1,
    nama_pelanggan: "agus",
    no_hp: "08916161616",
    alamat_pelanggan: "bandung",
  },
  {
    id_pelanggan: 2,
    nama_pelanggan: "mamat",
    no_hp: "08916161615",
    alamat_pelanggan: "Jandung",
  },
];

const formFields = [
  { id: "id_pelanggan", label: "ID" },
  { id: "nama_pelanggan", label: "nama pelanggan" },
  { id: "no_hp", label: "no hp" },
  { id: "alamat_pelanggan", label: "alamat" },
];

export default function Pelanggan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(sampleData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const [newData, setNewData] = useState({
    id_pelanggan: "",
    nama_pelanggan: "",
    no_hp: "",
    alamat_pelanggan: "",
  });

  // Fungsi tambah data
  const handleAddData = () => {
    if (isEditMode) {
      // Update existing data
      const updatedData = [...data];
      updatedData[currentEditIndex] = {
        ...newData,
        id_pelanggan: data[currentEditIndex].id_pelanggan,
      };
      setData(updatedData);
      setIsEditMode(false);
    } else {
      // Add new data
      const newId =
        data.length > 0
          ? Math.max(...data.map((item) => item.id_pelanggan)) + 1
          : 1;

      setData([
        ...data,
        {
          id_pelanggan: newId,
          ...newData,
        },
      ]);
    }

    // Reset form and close modal
    setNewData({
      id_pelanggan: "",
      nama_pelanggan: "",
      no_hp: "",
      alamat_pelanggan: "",
    });
    setIsModalOpen(false);
  };

  // Fungsi edit data
  const handleEditData = (index) => {
    const itemToEdit = data[index];
    setNewData({
      id_pelanggan: itemToEdit.id_pelanggan,
      nama_pelanggan: itemToEdit.nama_pelanggan,
      no_hp: itemToEdit.no_hp,
      alamat_pelanggan: itemToEdit.alamat_pelanggan,
    });
    setIsEditMode(true);
    setCurrentEditIndex(index);
    setIsModalOpen(true);
  };

  // Fungsi hapus data
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
    <div>
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
                    // Reset form for new entry
                    setNewData({
                      id_pelanggan: "",
                      nama_pelanggan: "",
                      no_hp: "",
                      alamat_pelanggan: "",
                    });
                  }}
                >
                  Tambah Data
                </button>
              </div>

              <TableCustomer
                data={data}
                onEdit={handleEditData}
                onDelete={handleDeleteData}
              />
            </div>
          </main>

          {/* Modal for Adding/Editing Data */}
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
                        disabled={field.id === "id_pelanggan" && isEditMode}
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
    </div>
  );
}
