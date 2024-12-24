import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

//  function to handle GET request
export async function GET() {
  try {
    const getAllProjectsQuery = 'SELECT * FROM public.project';
    const result = await query({ query: getAllProjectsQuery });
    console.log(result.rows);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
