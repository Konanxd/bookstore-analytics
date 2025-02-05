import React, { useState } from "react";
import PropTypes from "prop-types";

const tableHeaders = [
  "ID Buku",
  "Judul",
  "Penulis",
  "ISBN",
  "Penerbit",
  "Tahun Terbit",
  "Genre",
  "Harga",
  "Stok",
  "Aksi",
];

const tableFields = [
  "id",
  "judul",
  "penulis",
  "isbn",
  "penerbit",
  "tahunTerbit",
  "genre",
  "harga",
  "stok",
];

const commonCellClass = "py-5 relative";
const commonHeaderClass =
  "py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3 cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-500/20";

export default function TableBook({ data, onEdit, onDelete }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleSort = (field) => {
    let direction = "ascending";

    if (sortConfig.key === field && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key: field, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (sortConfig.key === "id" || sortConfig.key === "stok") {
        return sortConfig.direction === "ascending"
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      }

      if (sortConfig.key === "harga") {
        const priceA = parseFloat(a[sortConfig.key].replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b[sortConfig.key].replace(/[^0-9.]/g, ""));
        return sortConfig.direction === "ascending"
          ? priceA - priceB
          : priceB - priceA;
      }

      return sortConfig.direction === "ascending"
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });
  }, [data, sortConfig]);

  const SortIndicator = ({ field }) => {
    if (sortConfig.key !== field) return <span className="ml-1"></span>;
    return (
      <span className="ml-1">
        {sortConfig.direction === "ascending" ? "↑" : "↓"}
      </span>
    );
  };

  const SettingsDropdown = ({ rowIndex }) => {
    return (
      <div className="absolute top-full right-0 z-10 bg-white dark:bg-gray-700 shadow-lg rounded-md border dark:border-gray-600">
        <button
          onClick={() => onEdit(rowIndex)}
          className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(rowIndex)}
          className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
          Hapus
        </button>
      </div>
    );
  };

  const MoreVerticalIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );

  return (
    <table className="w-full border-collapse dark:bg-gray-600/10 bg-white rounded-md drop-shadow-md">
      <thead>
        <tr className="bg-gray-100/50 dark:bg-gray-200/10 border-b-2 border-gray-300 dark:border-gray-500 text-gray-500 dark:text-white capitalize font-semibold text-center">
          {tableHeaders.map((header, index) => (
            <th
              key={header}
              className={commonHeaderClass}
              onClick={() => index < 9 && handleSort(tableFields[index])}
            >
              <div className="flex items-center justify-center gap-1">
                {header}
                {index < 9 && <SortIndicator field={tableFields[index]} />}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr
            key={row.id}
            className="border-b-2 border-gray-200 dark:border-gray-400 last:border-0 text-gray-500 dark:text-white text-center"
          >
            {tableFields.map((field) => (
              <td
                key={`${row.id}-${field}`}
                className={`${commonCellClass} ${
                  field === "judul" ? "line-clamp-4" : ""
                }`}
              >
                {row[field]}
              </td>
            ))}
            <td className={`${commonCellClass} relative`}>
              <div className="flex justify-center">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === index ? null : index)
                  }
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                >
                  <MoreVerticalIcon />
                </button>
                {activeDropdown === index && (
                  <SettingsDropdown rowIndex={index} />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableBook.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      judul: PropTypes.string.isRequired,
      penulis: PropTypes.string.isRequired,
      isbn: PropTypes.string.isRequired,
      penerbit: PropTypes.string.isRequired,
      tahunTerbit: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      harga: PropTypes.string.isRequired,
      stok: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
