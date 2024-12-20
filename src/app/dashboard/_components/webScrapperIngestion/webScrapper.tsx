"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { domainData } from "../../_constants/dummy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@/components/common/datagrid/dataGrid";
import { URL_PATTERN } from "../../_constants/constants";
import { DomainData } from "../../_constants/type";

const columns: ColumnDef<DomainData>[] = [
  {
    accessorKey: "domainURL",
    header: () => <span className="font-bold text-[#000000]">Domain URL</span>,
    cell: ({ getValue }) => (
      <div className="text-[#8B8B8B]">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "selectors",
    header: () => <span className="font-bold text-[#000000]">Selectors</span>,
    cell: ({ getValue }) => (
      <div className="text-[#8B8B8B]">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <span className="font-bold text-[#000000]">Status</span>,
    cell: ({ getValue }) => {
      const value = getValue<string>();

      const statusColor =
        value === "Active" ? "text-[#40B139]" : "text-[#DC3545]";
      return <div className={`font-bold ${statusColor}`}>{value}</div>;
    },
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <button>
        <DeleteOutlineIcon className="text-[#8B8B8B]" />
      </button>
    ),
  },
];

export default function WebScrapper() {
  const [showForm, setShowForm] = useState(false);
  const [authenticationRequired, setAuthenticationRequired] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState("");
  const [url, seturl] = useState("");
  const [isUrlValid, setIsValidUrl] = useState(true);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = () => {
    seturl("");
    setSelectedCredential("");
    setAuthenticationRequired(false);
 
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    seturl(newUrl);
    setIsValidUrl(URL_PATTERN.test(newUrl));
  };

  return (
    <div className="p-4">
      <div>
        {!showForm ? (
          <>
            <div className="justify-between items-center flex flex-col md:flex-row mb-4">
              <h2 className="text-lg font-semibold">Domain Lists</h2>
              <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                <button className="bg-white text-[#172B9E] px-4 py-2 mr-2 rounded border border-[#172B9E] font-semibold">
                  Migrate
                </button>
                <button
                  className="bg-[#172B9E] text-white px-4 py-2 rounded font-bold"
                  onClick={toggleForm}
                >
                  +Add New
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex">
            <h2 className="text-lg font-semibold text-[#172B9E] ml-auto justify-end">
              Domain Lists
            </h2>
          </div>
        )}
      </div>
      
      {showForm ? (
        <div className="p-4">
          <form>
            <div className="mb-4">
              <label htmlFor="url" className="block mb-2 font-bold">
                URL
              </label>
              <input
                id="url"
                type="text"
                value={url}
                className={`w-full p-2 border rounded ${
                  isUrlValid ? "border-gray-300" : "border-red-500"
                }`}
                placeholder="Enter domain URL"
                onChange={handleUrlChange}
                required
              />
              {!isUrlValid && <p className="text-red-500 mt-1">Invalid URL</p>}
            </div>

            <div className="mb-4 flex items-center">
              <input
                id="authRequired"
                type="checkbox"
                checked={authenticationRequired}
                onChange={() =>
                  setAuthenticationRequired(!authenticationRequired)
                }
                className="mr-2"
              />
              <label htmlFor="authRequired">Authentication Required?</label>
            </div>

            {authenticationRequired && (
              <div className="mb-4">
                <label htmlFor="credentials" className="block mb-2 font-bold">
                  Credentials
                </label>
                <select
                  id="credentials"
                  value={selectedCredential}
                  onChange={(e) => setSelectedCredential(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Credential</option>
                  <option value="basic">Basic Auth</option>
                  <option value="oauth">OAuth</option>
                </select>
              </div>
            )}
    
            <div className="flex justify-center items-center mt-4">
              <button
                type="button"
                className="bg-[#172B9E] text-white px-4 py-2 rounded font-bold"
                onClick = {handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <DataGrid columns={columns} data={domainData} />
      )}
    </div>
  );
}
