import { Button } from '@/components/ui/button';
import { SignInButtonProps } from '../dashboard/_constants/type';
export default function SignInButton({
  type,
  isLogin,
  isForgotPassword,
  isResetPasswordEnabled,
}: SignInButtonProps) {
  return (
    <Button
      type={type}
      disabled={isForgotPassword && !isResetPasswordEnabled}
      className={`
        w-full py-3 px-4 border rounded-md shadow-sm text-base font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-all duration-300 ease-in-out
        hover:scale-[1.02] active:scale-95
        ${
          isLogin || isForgotPassword
            ? 'text-white'
            : 'text-[#000000] bg-white border-gray-300 hover:bg-gray-50 focus:ring-indigo-500 font-medium'
        }
      `}
      style={
        isLogin || isForgotPassword
          ? {
              background:
                'transparent linear-gradient(263deg, #47F3D0 0%, #278EF1 52%, #CB5EDC 100%) 0% 0% no-repeat padding-box',
            }
          : undefined
      }
    >
      {isForgotPassword ? 'Reset Password' : isLogin ? 'Log In' : 'Sign In using Microsoft'}
    </Button>
  );
}