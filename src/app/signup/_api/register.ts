import { SignupPayload } from "@/app/dashboard/_constants/type";

export async function registerUser(formData: SignupPayload) {
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    console.log('Registration successful:', data); 
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}
