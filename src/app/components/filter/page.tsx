import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";

const FilterComponent: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h1 className="text-xl font-bold">Projects</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          Filter
        </Button>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Input placeholder="Search" className="pl-8" />
        </div>

        <div className="relative">
          <Plus
            size={16}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#FFFFFF] font-bold"
          />
          <Button
            backgroundColor="#172B9E"
            color="#FFFFFF"
            className="font-bold pl-8"
          >
            New Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
