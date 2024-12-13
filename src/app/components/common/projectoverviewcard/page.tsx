import React from "react";

interface KeyValuePair {
  key: string;
  value: string | string[];
}

interface DynamicCardProps {
  title: string;
  keyValuePairs: KeyValuePair[];
  imageUrl: string;
  onViewAll?: () => void;
}

const ProjectOverviewCard: React.FC<DynamicCardProps> = ({
  title,
  keyValuePairs,
  imageUrl,
  onViewAll,
}) => {
  // Calculate the maximum key length
  const maxKeyLength = Math.max(
    ...keyValuePairs.map((pair) => pair.key.length)
  );

  // Determine if the "View All" button should be shown
  const showViewAll = keyValuePairs.length > 5;

  // Limit the keyValuePairs to the first 5 if the "View All" button is shown
  const displayedKeyValuePairs = showViewAll
    ? keyValuePairs.slice(0, 5)
    : keyValuePairs;

  // Calculate the width for the key container
  // Assuming 8 pixels per character for a monospace font
  const keyWidth = maxKeyLength * 9 + 20; // Add some padding

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-[575px] h-[260px] flex flex-col mt-3">
      <div className="relative p-4 flex items-center">
        <img src={imageUrl} alt="Logo" className="w-7 h-7 object-cover mr-4" />
        <h2 className="text-lg font-bold text-black">{title}</h2>
        {showViewAll && (
          <button
            onClick={onViewAll}
            className="absolute top-4 right-4 text-[#172B9E] text-[18px] font-bold px-3 py-1 rounded-md"
          >
            View All
          </button>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          {displayedKeyValuePairs.map((pair, index) => (
            <div
              key={index}
              className="flex items-start"
              style={{ width: '100%' }}
            >
              <div
                className="text-[17px] font-semibold mr-2 text-[#444A61]"
                style={{ width: `${keyWidth}px`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {pair.key}
              </div>
              <p className="text-[17px] text-[#7E7E80] flex-grow">
                {Array.isArray(pair.value) ? (
                  pair.value.map((item, idx) => (
                    <span key={idx}>
                      {title === "Compliance" && item.includes("(Action Required)") ? (
                        <>
                          {item.split("(Action Required)")[0]}
                          <span className="text-[#DC3545]">(Action Required)</span>
                        </>
                      ) : (
                        item
                      )}
                      {idx < pair.value.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : title === "Compliance" && pair.value.includes("(Action Required)") ? (
                  <>
                    {pair.value.split("(Action Required)")[0]}
                    <span className="text-[#DC3545]">(Action Required)</span>
                  </>
                ) : (
                  pair.value
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewCard;