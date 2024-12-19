import { Button } from "@/components/ui/button";
import { SignUpButtonProps } from "../dashboard/_constants/type";
export default function SignUpButton({ isAgreed, onClick }: SignUpButtonProps) {
  return (
    <Button
      type="submit"
      disabled={!isAgreed}
      className="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      style={{
        background:
          "transparent linear-gradient(263deg, #47F3D0 0%, #278EF1 52%, #CB5EDC 100%) 0% 0% no-repeat padding-box",
        opacity: isAgreed ? 1 : 0.2,
        cursor: isAgreed ? "pointer" : "not-allowed",
      }}
      onClick={onClick}
    >
      Register
    </Button>
  );
}