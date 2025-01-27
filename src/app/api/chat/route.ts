import { NextRequest, NextResponse } from 'next/server';
import { createOllama } from 'ollama-ai-provider';
import { streamText } from 'ai';


const ollama = createOllama({});

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  let messages: any[]; // An array to store the messages
  let file: File | null = null;
  let projectId: string;
  const contentType = req.headers.get('content-type');
  if (contentType && contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    messages = JSON.parse(formData.get('messages') as string);
    file = formData.get('file') as File | null;
    projectId = (formData.get('projectId') as string);
  } else {
    const body = await req.json();
    messages = body.messages;
    projectId = body.projectId;
  }

  let context = '';
  const lastMessage = messages[messages.length - 1]?.content;
  if (lastMessage) {
    // Replace `1` with your actual project_id or make it dynamic.
    const projectId1 = '1';
    const queryParams = new URLSearchParams({
      project_id: projectId,
      query: lastMessage,
    });

    // Call the Python server to get the context
    const contextResponse = await fetch(
      process.env.EMBEDDING_URL as string+`${queryParams.toString()}`,
      { method: 'GET' }
    );

    if (contextResponse.ok) {
      context = await contextResponse.text(); // Assuming the context is returned as plain text
    } else {
      console.error('Error retrieving context:', await contextResponse.text());
    }
  }

  console.log(context,"context");
  try {
    const result = await streamText({
      model: ollama("llama3.2"),
      messages: [
        ...(context ? [{ role: 'system', content: context }] : []),
        ...messages,
      ],
      temperature: 0
    });

    return new NextResponse(result.textStream, {
      headers: { 'Content-Type': 'text/plain' },
    });
  
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}