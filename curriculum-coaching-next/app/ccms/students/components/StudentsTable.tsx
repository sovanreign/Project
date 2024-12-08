"use client";

import Button from "@/app/components/Button";
import Dropdown from "@/app/components/Dropdown";
import {
  ArrowUpTrayIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import TableWithCheckboxes from "./SampleTable";
import Modal from "../../components/Modal";

interface TableRow {
  id: number;
  name: string;
  email: string;
}

const StudentsTable: React.FC = () => {
  // Initial data for the table
  const initialRows: TableRow[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alex Johnson", email: "alex.johnson@example.com" },
    { id: 4, name: "Emily Davis", email: "emily.davis@example.com" },
    { id: 5, name: "Michael Brown", email: "michael.brown@example.com" },
    { id: 6, name: "Sarah Wilson", email: "sarah.wilson@example.com" },
    { id: 7, name: "David Lee", email: "david.lee@example.com" },
    { id: 8, name: "Sophie Miller", email: "sophie.miller@example.com" },
    { id: 9, name: "James Taylor", email: "james.taylor@example.com" },
    { id: 10, name: "Olivia Moore", email: "olivia.moore@example.com" },
  ];

  // State to manage rows
  const [rows, setRows] = useState<TableRow[]>(initialRows);

  // State to manage selected rows
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Handle selection changes from the child component
  const handleSelectionChange = (newSelectedIds: number[]) => {
    setSelectedIds(newSelectedIds);
  };

  // Handle delete action for selected rows
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;

    if (window.confirm("Are you sure you want to delete the selected rows?")) {
      setRows((prevRows) =>
        prevRows.filter((row) => !selectedIds.includes(row.id))
      );
      setSelectedIds([]);
    }
  };

  // Handle edit action for a specific row
  const handleEdit = (id: number) => {
    alert(`Edit row with id: ${id}`);
    // Implement your edit logic here, e.g., navigate to edit page or open a modal
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal to add a new student
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle the form submission and add a new student
  const handleAddStudent = (newStudent: { name: string; email: string }) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        name: newStudent.name,
        email: newStudent.email,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={"Students"}
      ></Modal>

      {/* Search and Filters */}
      <div className="flex justify-between">
        {/* Search Input */}
        <div className="w-full min-w-[200px] max-w-sm">
          <div className="relative">
            <input
              className="border-slate-200 hover:border-slate-300 focus:border-slate-400 bg-transparent shadow-sm focus:shadow py-3 pr-28 pl-3 border rounded-md w-full text-slate-700 placeholder:text-slate-400 transition duration-300 ease focus:outline-none"
              placeholder="Search for students"
              type="text"
            />
            <Button
              type="button"
              variant="primary"
              isLoading={false}
              buttonLoadingText="Loading"
              className="top-0 right-1 bottom-0 absolute flex items-center my-1 px-2.5 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Search</span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Dropdown
            data={[
              { value: "FIRST", label: "1st Year" },
              { value: "SECOND", label: "2nd Year" },
              { value: "THIRD", label: "3rd Year" },
              { value: "FOURTH", label: "4th Year" },
              { value: "FIFTH", label: "5th Year" },
            ]}
            name="year"
            placeholder="Filter by Year"
            className="py-2 border rounded-md w-full min-w-[200px] max-w-sm cursor-pointer"
          />
          <Dropdown
            data={[
              { value: "1", label: "BSIT" },
              { value: "2", label: "BSCS" },
              { value: "3", label: "BSCE" },
            ]}
            name="course"
            placeholder="Filter by Course"
            className="py-2 border rounded-md w-full min-w-[200px] max-w-sm cursor-pointer"
          />
        </div>
      </div>

      {/* Delete and Add Buttons */}
      <div className="flex justify-between items-center">
        {/* Delete Selected Button at the Bottom */}
        <div className="flex justify-end gap-1">
          {selectedIds.length > 0 && (
            <Button
              type="button"
              variant="primary"
              isLoading={false}
              buttonLoadingText="Deleting..."
              className={`flex items-center gap-1 px-4 py-2 bg-[#d9534f] text-white rounded-md hover:bg-[#d9534f] ${
                selectedIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleDeleteSelected}
              disabled={selectedIds.length === 0}
            >
              <TrashIcon className="w-5 h-5" />
              Delete <span className="font-semibold">
                {selectedIds.length}
              </span>{" "}
              Selected
            </Button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            isLoading={false}
            buttonLoadingText="Add Students"
            className="flex items-center gap-2"
            onClick={handleOpenModal}
          >
            <PlusIcon className="w-5 h-5" />
            Add Students
          </Button>
          <Button
            type="button"
            variant="primary"
            isLoading={false}
            buttonLoadingText="Upload Students"
            className="flex items-center gap-2"
            onClick={() => alert("Upload Students functionality")}
          >
            <ArrowUpTrayIcon className="w-5 h-5" />
            Upload Students
          </Button>
        </div>
      </div>

      {/* Table Component */}
      <TableWithCheckboxes
        rows={rows}
        selectedIds={selectedIds}
        onSelectionChange={handleSelectionChange}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default StudentsTable;
