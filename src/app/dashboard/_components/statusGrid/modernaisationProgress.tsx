"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"; // Import your custom tooltip components

export interface BaseItem {
  id: string;
  projectName: string;
  modernisationProgress: number;
}

export const modernisationColumns: ColumnDef<BaseItem>[] = [
  {
    accessorKey: "projectName",
    header: () => <span className="font-bold text-[#000000]">Project Name</span>,
    cell: ({ getValue }) => <div className="text-[#8B8B8B]">{getValue<string>()}</div>,
  },
  {
    accessorKey: "modernisationProgress",
    header: () => <span className="font-bold text-[#000000]">Modernisation Progress</span>,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 w-full">
                <Progress value={value} color='#172B9E' height="18px" roundedStyle="slight" />
                <span className="text-sm text-muted-foreground">{value}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <p>Modernisation Progress: {value}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];

export const modernisationData: BaseItem[] = [
  {
    id: '1',
    projectName: "Natural Language Processing Engine",
    modernisationProgress: 90,
  },
  {
    id: '2',
    projectName: "AI Chatbot Integration",
    modernisationProgress: 45,
  },
  {
    id: '3',
    projectName: "E-Commerce Recommendation System",
    modernisationProgress: 80,
  },
  {
    id: '4',
    projectName: "Real-Time Analytics Dashboard",
    modernisationProgress: 60,
  },
];