"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2, SquarePen } from "lucide-react"

import { Button } from "@/components/ui/button"

export type Credentials = {
  name: string;
  keyType: string;
  lastUpdated: string;
  createdOn: string;
  createdBy: string;
  logo: string;
}

export const columns: ColumnDef<Credentials>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-black font-semibold text-transform:capitalize">Name</div>,
  },
  {
    accessorKey: "keyType",
    header: () => <div className="text-black font-semibold text-transform:capitalize">Key Type</div>,
    cell: ({ row }) => {
      const key = row.getValue("keyType") as string;
      const imageUrl = row.original.logo; // Access the `imageUrl` field from the row's original data.

      return (
        <div className="flex items-center space-x-4">
          <img
            src={imageUrl}
            alt="Logo"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span>{key}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: () => <div className="text-black font-semibold text-transform:capitalize">Last Updated</div>,
  },
  {
    accessorKey: "createdOn",
    header: () => <div className="text-black font-semibold text-transform:capitalize">Created On</div>,
  },
  {
    accessorKey: "createdBy",
    header: () => <div className="text-black font-semibold text-transform:capitalize">Created By</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <SquarePen className="h-4 w-4 text-gray-400" />
          </Button>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Trash2 className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      )
    },
  },
]
