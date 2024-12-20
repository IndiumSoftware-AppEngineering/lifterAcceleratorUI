import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";

interface MicroservicesCardProps {
  imageSrc: string;
  title: string;
  benefit: string;
  risk: string;
}

export default function MicroservicesCard({
  imageSrc,
  title,
  benefit,
  risk,
}: MicroservicesCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden h-[200px]">
      <CardContent className="pt-6">
        <div className="flex items-center gap-6">
          <div className="s">
            <Image
              src={imageSrc}
              alt={`${title} image`}
              width={122}
              height={144}
            />
          </div>
          <div className="space-y-5">
            <h3 className="text-sm  font-bold">{title}</h3>
            <div>
              <p className="text-sm  text-[#28A745] font-bold">Benefit:</p>
              <p className="text-sm text-muted-foreground truncate w-full verflow-hidden text-ellipsis whitespace-nowrap " style={{ maxWidth: "200px" }}>{benefit}</p>
            </div>
            <div>
              <p className="text-sm  text-[#DC3545] font-bold">Risks:</p>
              <p className="text-sm text-muted-foreground truncate w-full verflow-hidden text-ellipsis whitespace-nowrap" style={{ maxWidth: "200px" }}>{risk}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


