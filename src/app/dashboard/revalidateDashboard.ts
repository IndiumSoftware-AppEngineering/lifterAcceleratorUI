// src/actions/revalidateDashboard.ts
'use server';

import { revalidatePath } from 'next/cache';
import { ProjectStatusCardServer } from '@/components/common/cards/_api/projectStatus';

export async function revalidateDashboard() {
  try {
    // Call the API logic
    const data = await ProjectStatusCardServer();

    // Revalidate the /dashboard path
    revalidatePath('/dashboard');

    return data;
  } catch (error) {
    console.error('Error revalidating dashboard:', error);
    throw error;
  }
}