import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Avatar {
  name: string;
  color: string;
}

interface Icon {
  name: string;
  link: string;
  iconPath: string;
}

interface CardProps {
  id: string;
  title: string;
  status: string;
  date: string;
  extractionStatus: string;
  avatars: Avatar[];
  icons: Icon[];
  progress?: number;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  status,
  date,
  extractionStatus,
  avatars,
  icons,
  progress,
}) => {
  let extractionStatusColor = "";
  let extractionStatusBgColor = "";

  switch (extractionStatus) {
    case "Extraction Completed":
      extractionStatusColor = "text-[#0C7603]";
      extractionStatusBgColor = "bg-[#CFFCD0]";
      break;
    case "Approval Pending":
      extractionStatusColor = "text-[#FFD4B7]";
      extractionStatusBgColor = "bg-[#BA6107]";
      break;
    case "Feedback Needed":
      extractionStatusColor = "text-[#FFD700]";
      extractionStatusBgColor = "bg-[#FFFFE0]";
      break;
    case "Extraction Failed":
      extractionStatusColor = "text-[#DD1C1E]";
      extractionStatusBgColor = "bg-[#FFE5E5]";
      break;
    case "Extraction in Progress":
      extractionStatusColor = "text-[#F8E7AA]";
      extractionStatusBgColor = "bg-[#8E6F05]";
      break;
    default:
      extractionStatusColor = "text-[#0C7603]";
      extractionStatusBgColor = "bg-[#CFFCD0]";
  }

  return (
    <div className="border rounded-[7px] p-4 shadow-[0px_0px_2px_#0000001A] bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[24px] font-bold text-[#444A61] mb-2">{`#${id}`}</h3>
          <div className="flex items-center gap-3">
            <h2 className="text-[21px] font-bold text-[#444A61]">{title}</h2>
            <p
              className={`text-[21px] font-bold ${
                status === "Active" ? "text-[#0C7603]" : "text-[#DD1C1E]"
              }`}
            >
              {status}
            </p>
          </div>
        </div>
        <p className="text-[20px] text-[#8B8B8B] whitespace-nowrap">{date}</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-col items-start gap-3">
          {extractionStatus === "Extraction in Progress" &&
          progress !== undefined ? (
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center text-[15px] font-base ${extractionStatusColor} ${extractionStatusBgColor} px-2 py-1 rounded-md`}
              >
                <span>{extractionStatus}</span>
              </div>
              <div className="flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Progress
                        value={progress}
                        color="#40B139"
                        className="w-[100px] h-2.5 mr-2"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Progress: {progress}%</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-[15px] font-bold text-[#40B139] min-w-[40px]">
                  {progress}%
                </span>
              </div>
            </div>
          ) : (
            <div
              className={`flex items-center text-[15px] font-bold ${extractionStatusColor} ${extractionStatusBgColor} px-2 py-1 rounded-md w-full`}
            >
              <span>{extractionStatus}</span>
            </div>
          )}

          <div className="flex items-center -space-x-2">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${avatar.color} transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
              >
                {avatar.name[0]}
              </div>
            ))}
            <Image
              src="/images/plus.svg"
              alt="plus icon"
              width={16}
              height={16}
              className="w-4 h-4 font-bold stroke-2"
              style={{ marginLeft: "8px" }}
            />
          </div>
        </div>

        <div className="flex gap-1">
          {icons.map((icon, index) => (
            <Button key={index} variant="ghost" className="p-1">
              <a href={icon.link} target="_blank">
                <Image
                  src={icon.iconPath}
                  alt={icon.name}
                  width={30}
                  height={30}
                  className="w-6 h-6 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md"
                />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
