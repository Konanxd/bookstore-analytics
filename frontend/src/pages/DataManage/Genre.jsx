import React, { useState, useEffect } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import TableGenre from "../../components/TableGenre";
import { getGenre } from "../../api";

const formFields = [
  { id: "id_genre", label: "ID" },
  { id: "nama_genre", label: "nama genre" },
];

export default function Pelanggan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const [newData, setNewData] = useState({
    id_genre: "",
    nama_genre: "",
  });

  useEffect(() => {
    async function fetchData() {
      const dataList = await getGenre();
      setData(dataList);
    }

    fetchData();
  }, []);

  // Fungsi tambah data
  const handleAddData = () => {
    if (isEditMode) {
      const updatedData = [...data];
      updatedData[currentEditIndex] = {
        ...newData,
        id_genre: data[currentEditIndex].id,
      };
      setData(updatedData);
      setIsEditMode(false);
    } else {
      addBook(newData)
        .then((response) => {
          setData([
            ...data,
            {
              id_genre: response.data.id,
              ...newData,
            },
          ]);
          alert("Data berhasil ditambahkan!");
        })
        .catch((error) => {
          console.error("Error adding the book:", error);
          alert("Terjadi kesalahan saat menambahkan data.");
        });
    }

    setNewData({
      id_genre: "",
      nama_genre: "",
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

  const handleSaveData = () => {
    const updatedThing = { ...newData };
    updateGenre(updatedThing)
      .then((response) => {
        const updatedData = [...data];
        updatedData[currentEditIndex] = {
          ...updatedThing,
        };
        setData(updatedData);
        alert("Data berhasil diperbarui!");
      })
      .catch((error) => {
        console.error("Error editing the book:", error);
        alert("Terjadi kesalahan saat memperbarui data.");
      });

    setNewData({
      id_genre: "",
      nama_genre: "",
    });

    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleDeleteData = (index) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (confirmDelete) {
      const bookId = data[index].id;

      deleteBook(bookId)
        .then(() => {
          const newData = data.filter((_, i) => i !== index);
          setData(newData);
        })
        .catch((error) => {
          console.error("Error deleting the book:", error);
          alert("Terjadi kesalahan saat menghapus data.");
        });
    }
  };

  return (
    <div>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto flex flex-col gap-3'>
              <div>
                <button
                  type='button'
                  className='bg-violet-500 text-white px-4 py-2 rounded'
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsEditMode(false);
                    // Reset form for new entry
                    setNewData({
                      id_genre: "",
                      nama_genre: "",
                    });
                  }}
                >
                  Tambah Data
                </button>
              </div>

              <TableGenre data={data} onEdit={handleEditData} onDelete={handleDeleteData} />
            </div>
          </main>

          {/* Modal for Adding/Editing Data */}
          {isModalOpen && (
            <div className='fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 z-50 overflow-y-scroll py-10'>
              <div className='bg-white p-6 rounded shadow-lg w-[800px]'>
                <h2 className='text-lg font-bold mb-4'>
                  {isEditMode ? "Edit Data" : "Tambah Data"}
                </h2>
                <div className='grid grid-cols-2 gap-4'>
                  {formFields.map((field) => (
                    <div key={field.id} className='mb-4'>
                      <label className='block text-sm font-medium mb-2'>{field.label}</label>
                      <input
                        type='text'
                        className='w-full px-3 py-2 border rounded'
                        value={newData[field.id]}
                        onChange={(e) => setNewData({ ...newData, [field.id]: e.target.value })}
                        disabled={field.id === "id_genre" && isEditMode}
                      />
                    </div>
                  ))}
                </div>

                <div className='flex justify-end space-x-2 mt-4'>
                  <button
                    className='bg-gray-500 text-white px-4 py-2 rounded'
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal
                  </button>
                  <button
                    className='bg-violet-500 text-white px-4 py-2 rounded'
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
