import { artifacts } from "../_constants/dummy";
import { ArtifactCard } from "@/components/common/artifactCard";

interface Props {
  projectName: string;
}

export function ViewArtifactDrawer({ projectName }: Props) {
  return (
    <div className="p-6 space-y-4">
      {/* Project Name */}
      <div className="text-[#000000] font-bold text-lg shadow-sm">
        <h1>{projectName}</h1>
      </div>

      {/* <div className="border-b border-gray-300 my-4"></div> */}

      <p className="text-md font-bold text-[#363636] p-4">Artefacts</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {artifacts.map((artifact, index) => (
          <ArtifactCard
            key={index}
            filename={artifact.filename}
            size={artifact.size}
            date={artifact.date}
            author={artifact.author}
          />
        ))}

        {/* More Button */}
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
    </div>
  );
}
