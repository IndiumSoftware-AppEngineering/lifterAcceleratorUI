import { useState } from 'react';

export const useForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const forgotPassword = async (email: string, newPassword: string, confirmPassword: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3002/api/forgot-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, error, loading };
};