"use client"
import { ColumnDef } from "@tanstack/react-table"

export type Credentials = {
  projectName: string;
  version: number;
  lastUpdated: String;
  owner: string;
}

export const columns: ColumnDef<Credentials>[] = [
  {
    accessorKey: "projectName",
    header: () => (
      <div className="text-black p-4 font-semibold capitalize">Project Name</div>
    ),
    cell: ({ row }) => (
      <div className="text-neutral-500 p-4 h-10 flex items-center">{row.getValue("projectName")}</div>
    ),
  },
  {
    accessorKey: "version",
    header: () => (
      <div className="text-black p-4 font-semibold capitalize">Version</div>
    ),
    cell: ({ row }) => (
       <div className="text-neutral-500 p-4 h-10 flex items-center">{row.getValue("version")}</div>
    ),
  },
  {
    accessorKey: "lastUpdated",
    header: () => (
      <div className="text-black p-4 font-semibold capitalize">Last Updated</div>
    ),
    cell: ({ row }) => (
       <div className="text-neutral-500 p-4 h-10 flex items-center">{row.getValue("lastUpdated")}</div>
    ),
  },
  {
    accessorKey: "owner",
    header: () => (
      <div className="text-black p-4 font-semibold capitalize">Owner</div>
    ),
    cell: ({ row }) => (
       <div className="text-neutral-500 p-4 h-10 flex items-center">{row.getValue("owner")}</div>
    ),
  },
]
