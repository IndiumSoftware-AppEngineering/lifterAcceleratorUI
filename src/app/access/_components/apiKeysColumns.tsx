"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2, SquarePen, Copy, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export type Credentials = {
  name: string;
  apiKey: string;
  usage: number;
  createdOn: string;
  createdBy: string;
}

export const columns: ColumnDef<Credentials>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-black font-semibold text-transform:capitalize">Name</div>,
  },
  {
    accessorKey: "apiKey",
    header: () => (
      <div className="text-black font-semibold text-transform:capitalize">API Key</div>
    ),
    cell: ({ row }) => {
      const apiKey = row.getValue<string>("apiKey");
      const [showFull, setShowFull] = useState(false);

      const toggleVisibility = () => {
        setShowFull((prev) => !prev);
      };

      const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        alert("API Key copied to clipboard!");
      };

      const maskedApiKey = `${apiKey.slice(0, 2)}${"*".repeat(
        apiKey.length - 4
      )}${apiKey.slice(-2)}`;

      return (
        <div className="flex items-center space-x-2">
          <span>{showFull ? apiKey : maskedApiKey}</span>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-700"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-700"
            onClick={toggleVisibility}
          >
            {showFull ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "usage",
    header: () => <div className="text-black font-semibold text-transform:capitalize">Usage</div>,
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
