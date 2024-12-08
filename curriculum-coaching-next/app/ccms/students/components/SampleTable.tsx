import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface TableRow {
  id: number;
  name: string;
  email: string;
}

interface TableWithCheckboxesProps {
  rows: TableRow[];
  selectedIds: number[];
  onSelectionChange: (selectedIds: number[]) => void;
  onEdit: (id: number) => void;
}

const TableWithCheckboxes: React.FC<TableWithCheckboxesProps> = ({
  rows,
  selectedIds,
  onSelectionChange,
  onEdit,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of rows per page

  // Calculate the rows to display based on pagination
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows = rows.slice(startIndex, startIndex + pageSize);

  // Handle individual checkbox change
  const handleCheckboxChange = (id: number) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedIds.length === rows.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(rows.map((row) => row.id));
    }
  };

  const allSelected = selectedIds.length === rows.length && rows.length > 0;

  // Pagination controls
  const totalPages = Math.ceil(rows.length / pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="border rounded-lg text-center overflow-x-auto">
      <table className="table-fixed w-full">
        <thead className="bg-gray-200 text-center">
          <tr>
            <th className="py-3 text-center">
              <input
                type="checkbox"
                className="cursor-pointer accent-primary-500"
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-2 py-3 w-2/12 text-left">Student ID</th>
            <th className="px-2 py-3 w-4/12 text-left">Student Name</th>
            <th className="px-2 py-3 w-4/12 text-left">Email</th>
            <th className="px-2 py-3 w-1/12 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-t`}
            >
              <td className="px-2 py-3 text-center">
                <input
                  type="checkbox"
                  className="accent-primary-500"
                  checked={selectedIds.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </td>
              <td className="px-2 py-3 text-left">{row.id}</td>
              <td className="px-2 py-3 text-left">{row.name}</td>
              <td className="px-2 py-3 text-left">{row.email}</td>
              <td className="px-2 py-3 text-center">
                <button
                  onClick={() => onEdit(row.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <PencilIcon className="inline-block w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 text-gray-600">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          Prev
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableWithCheckboxes;
