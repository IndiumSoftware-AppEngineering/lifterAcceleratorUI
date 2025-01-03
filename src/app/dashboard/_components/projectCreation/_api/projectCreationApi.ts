import { FormData } from '@/app/dashboard/_constants/type';

// Function to create a project
export async function createProject(formData: FormData) {
  try {
    // Ensure org_id is included in the request body
    const requestBody = {
      name: formData.name,
      description: formData.description,
      active: formData.status,
      org_id: 1, // Hardcoded org_id
      created_by: 'user_1',
    };

    console.log('Request body:', requestBody);

    const response = await fetch('/api/projectCreation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create project');
    }

    const data = await response.json();
    return { success: true, data }; // Assuming the API returns { success: true, data: project }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create project';
    return {
      success: false,
      error: errorMessage,
    };
  }
}
