import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { Document } from "langchain/document";

export const loadAndSplitTheDocs = async (fileBuffer: Buffer): Promise<Document[]> => {
  try {
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    const loader = new PDFLoader(blob);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 0,
    });

    const allSplits = await textSplitter.splitDocuments(docs);
    return allSplits;
  } catch (error) {
    console.error("Error loading and splitting documents:", error);
    throw error;
  }
};

export const vectorSaveAndSearch = async (splits: Document[], question: string): Promise<Document[]> => {
  try {
    const embeddings = new OpenAIEmbeddings({//using openAi Embeddings
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const vectorStore = await MemoryVectorStore.fromDocuments(
      splits,
      embeddings
    );

    const searches = await vectorStore.similaritySearch(question);
    return searches;
  } catch (error) {
    console.error("Error saving and searching vectors:", error);
    throw error;
  }
};

export const generatePrompt = async (searches: Document[], question: string): Promise<string> => {
  try {
    let context = "";
    searches.forEach((search) => {
      context = context + "\n\n" + search.pageContent;
    });

    const prompt = PromptTemplate.fromTemplate(`
      Answer the question based only on the following context:
      
      {context}
      
      ---
      
      Answer the question based on the above context: {question}
    `);

    const formattedPrompt = await prompt.format({
      context: context,
      question: question,
    });
    return formattedPrompt;
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
};

