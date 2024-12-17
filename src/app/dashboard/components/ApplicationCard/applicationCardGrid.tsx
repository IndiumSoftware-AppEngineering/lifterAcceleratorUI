import { useEffect, useState } from "react";
import { columns, Credentials } from "./applicationCardGridColumns";
import { DataGrid } from "@/components/common/dataGrid";
import { Separator } from "@/components/ui/separator";

async function getData(): Promise<Credentials[]> {
  // Fetch data from your API here.
  return [
    {
      projectName: "Apollo Dashboard ",
      version: 1.2,
      lastUpdated: "2024-04-15",
      owner: "Alice Johnson",
    },
    {
      projectName: "Neptune Data Sync",
      version: 2.0,
      lastUpdated: "2024-05-10",
      owner: "Bob Smith",
    },
    {
      projectName: "Zeus API Gateway",
      version: 3.4,
      lastUpdated: "2024-03-22",
      owner: "Charlie Brown",
    },
    {
      projectName: "Hermes Notification Service",
      version: 1.8,
      lastUpdated: "2024-02-18",
      owner: "Diana Ross",
    },
    {
      projectName: "Atlas Monitoring Tool",
      version: 4.5,
      lastUpdated: "2024-01-25",
      owner: "Edward Davis",
    },
    {
      projectName: "Poseidon Cloud Storage",
      version: 2.1,
      lastUpdated: "2024-03-12",
      owner: "Fiona Harris",
    },
    {
      projectName: "Hera CI/CD Pipeline",
      version: 3.0,
      lastUpdated: "2024-04-01",
      owner: "George Miller",
    },
    {
      projectName: "Chronos Time Tracker",
      version: 1.5,
      lastUpdated: "2024-04-20",
      owner: "Helen Carter",
    },
    {
      projectName: "Artemis Bug Tracker",
      version: 2.8,
      lastUpdated: "2024-02-28",
      owner: "Isaac Newton",
    },
    {
      projectName: "Helios Frontend Framework",
      version: 5.0,
      lastUpdated: "2024-05-05",
      owner: "Jennifer Lee",
    },
  ];
}

export default function ApplicationCardGrid() {
  const [data, setData] = useState<Credentials[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getData();
      setData(response);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full">
      <p className="text-black font-semibold capitalize text-lg">Application/Projects</p>
      <Separator />
      <div className="flex flex-col gap-4">
      <p className="text-black font-semibold capitalize text-md">Application needs update</p>
        <div className="min-h-full">
          <DataGrid columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
