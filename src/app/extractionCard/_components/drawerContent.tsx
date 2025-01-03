import { useEffect, useState } from "react";
import { ArtifactCard } from "@/components/common/cards/artifactCard";
import { projectNameProp } from "../_constants/type";

export function ViewArtifactDrawer({ projectName }: projectNameProp) {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch artifact data from the API
    async function fetchArtifacts() {
      try {
        const response = await fetch("/api/artifacts?projid=1"); // Adjust projid dynamically as needed
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch artifacts.");
          setLoading(false);
          return;
        }
        const data = await response.json();
        setArtifacts(data);
      } catch (err) {
        console.error("Error fetching artifacts:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchArtifacts();
  }, []);

  return (
    <div className="p-6 space-y-4">
    
        <div className="text-[#000000] font-bold text-lg shadow-sm">
          <h1>{projectName}</h1>
        </div>
     
          <p className="text-md font-bold text-[#363636] p-4">Artifacts</p>

          {/* Handle loading and error states */}
          {loading && <p>Loading artifacts...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {artifacts.map((artifact: { artifact_name: string; artifact_type: string; created_on: string; created_by: string }, index: number) => (
                <ArtifactCard
                  key={index}
                  filename={artifact.artifact_name}
                  type={artifact.artifact_type} // Update as per your `ArtifactCard` prop requirements
                  date={artifact.created_on}
                  author={artifact.created_by}
                />
              ))}

              <div className="flex justify-center items-center">
                <button
                  className="px-6 py-2 text-sm font-semibold rounded-md"
                  style={{
                    backgroundColor: "#E8E6FF",
                    color: "#172B9E",
                  }}
                >
                  + More
                </button>
              </div>
            </div>
          )}
        </div>
  );
}