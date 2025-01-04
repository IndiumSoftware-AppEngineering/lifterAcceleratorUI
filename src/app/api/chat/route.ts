/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import OpenAI from 'openai';
import { loadAndSplitTheDocs, vectorSaveAndSearch, generatePrompt } from '@/lib/rag';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  let messages: any[]; // An array to store the messages
  let file: File | null = null;

  const contentType = req.headers.get('content-type');
  if (contentType && contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    messages = JSON.parse(formData.get('messages') as string);
    file = formData.get('file') as File | null;
  } else {
    const body = await req.json();
    messages = body.messages;
  }

  let context = '';

  if (file) {
    const fileBuffer = await file.arrayBuffer();
    const splits = await loadAndSplitTheDocs(Buffer.from(fileBuffer));
    const lastMessage = messages[messages.length - 1];
    const searches = await vectorSaveAndSearch(splits, lastMessage.content);
    context = await generatePrompt(searches, lastMessage.content);
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        ...(context ? [{ role: 'system', content: context }] : []),//combines the context with message(Request)
        ...messages,
      ],
      stream: true, // Enable streaming
    });

    // Create a ReadableStream for the response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          controller.enqueue(encoder.encode(content));
        }
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}