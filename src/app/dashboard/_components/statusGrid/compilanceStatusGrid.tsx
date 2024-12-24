"use client";
import { ColumnDef } from "@tanstack/react-table";
import { complianceData } from "/_constants/dummy";
import { DataGrid } from "@/components/common/datagrid/dataGrid";
import { ComplianceData } from "../../_constants/type";

const columns: ColumnDef<ComplianceData>[] = [
  {
    accessorKey: "projectName",
    header: () => <span className="font-bold text-[#000000] px-2 py-1">Project Name</span>,
    cell: ({ getValue }) => <div className="text-[#8B8B8B] px-2 py-1">{getValue<string>()}</div>,
  },
  {
    accessorKey: "lastUpdated",
    header: () => <span className="font-bold text-[#000000] px-2 py-1 whitespace-nowrap overflow-hidden text-ellipsis">Last Updated</span>,
    cell: ({ getValue }) => <div className="text-[#8B8B8B] px-2 py-1">{getValue<string>()}</div>,
  },
  {
    accessorKey: "owner",
    header: () => <span className="font-bold text-[#000000] px-2 py-1">Owner</span>,
    cell: ({ getValue }) => <div className="text-[#8B8B8B] px-2 py-1">{getValue<string>()}</div>,
  },
  {
    accessorKey: "status",
    header: () => <span className="font-bold text-[#000000] px-2 py-1">Status</span>,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const statusColor = value === "Compliant" ? "text-[#22D94B]" : "text-[#DC3545]";
      return <div className={`font-bold ${statusColor} px-2 py-1`}>{value}</div>;
    },
  },
];

export default function ComplianceStatus() {
  return (
    <div className="p-4">
      <h2 className="text-md font-semibold mb-4 text-[#000000] border-b-2 pb-2">Compliance Status</h2>
      <p className="text-sm font-bold mb-4 mt-10 text-[#363636]">Compliance Details</p>
      <DataGrid columns={columns} data={complianceData} />
    </div>
  );
}
