import StudentsTable from "./components/StudentsTable";

const StudentsPage = () => {
  return (
    <div className="flex flex-col flex-1 gap-4 bg-gray-200 scroll-m-1 p-4 rounded-b-none rounded-tl-2xl overflow-y-auto">
      {/* Header */}
      <div className="px-8">
        <h1 className="font-semibold text-xl">List of Students</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-4 bg-white shadow-sm px-8 py-8 rounded-2xl">
        <StudentsTable />
      </div>
    </div>
  );
};

export default StudentsPage;
