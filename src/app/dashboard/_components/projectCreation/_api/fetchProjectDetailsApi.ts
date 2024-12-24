export const fetchAllProjectDetails = async () => {
  try {
    // Fetch project details from the API
    const response = await fetch('/api/projectDetails');

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response data
    const data = await response.json();
    console.log('All project details:', data);

    return data; // Return the fetched data
  } catch (error) {
    // Log and re-throw the error for upstream handling
    console.error('Error fetching all project details:', error);
    throw error;
  }
};
