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

const commonCellClass = "py-5";
const commonHeaderClass =
  "py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3 cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-500/20";

export default function Table({ data = sampleData }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Sort handler
  const handleSort = (field) => {
    let direction = "ascending";

    if (sortConfig.key === field && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key: field, direction });
  };

  // Sort function
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      // Handle numeric fields
      if (sortConfig.key === "id" || sortConfig.key === "stok") {
        return sortConfig.direction === "ascending"
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      }

      // Handle price (remove currency symbol and convert to number)
      if (sortConfig.key === "harga") {
        const priceA = parseFloat(a[sortConfig.key].replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b[sortConfig.key].replace(/[^0-9.]/g, ""));
        return sortConfig.direction === "ascending"
          ? priceA - priceB
          : priceB - priceA;
      }

      // Handle string fields
      return sortConfig.direction === "ascending"
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });
  }, [data, sortConfig]);

  // Sort indicator component
  const SortIndicator = ({ field }) => {
    if (sortConfig.key !== field) return <span className="ml-1"></span>;
    return (
      <span className="ml-1">
        {sortConfig.direction === "ascending" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    // table
    <table className="w-full border-collapse dark:bg-gray-600/10 bg-white rounded-md drop-shadow-md">
      <thead>
        <tr className="bg-gray-100/50 dark:bg-gray-200/10 border-b-2 border-gray-300 dark:border-gray-500 text-gray-500 dark:text-white capitalize font-semibold text-center">
          {tableHeaders.map((header, index) => (
            <th
              key={header}
              className={commonHeaderClass}
              onClick={() => handleSort(tableFields[index])}
            >
              <div className="flex items-center justify-center gap-1">
                {header}
                <SortIndicator field={tableFields[index]} />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
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
  ),
};
