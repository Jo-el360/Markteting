
import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedCopy } from '../types.ts';
import { CopyType } from '../types.ts';

export const generateMarketingCopy = async (
  productName: string,
  productDescription: string
): Promise<GeneratedCopy[]> => {
  // Initialize the client here to ensure `process.env` is available.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const prompt = `
    You are an expert marketing copywriter. 
    Your task is to generate three pieces of marketing copy for a product based on its name and description.
    
    Product Name: ${productName}
    Product Description: ${productDescription}

    Generate the following three types of copy:
    1. A social media post (SOCIAL_MEDIA_POST): Engaging, includes hashtags, and is around 280 characters.
    2. An ad headline (AD_HEADLINE): Short, punchy, and attention-grabbing.
    3. An email subject line (EMAIL_SUBJECT): Intriguing and designed to maximize open rates.

    Return the result as a JSON array. Do not include any markdown formatting like \`\`\`json.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: {
                type: Type.STRING,
                enum: [CopyType.SOCIAL_MEDIA_POST, CopyType.AD_HEADLINE, CopyType.EMAIL_SUBJECT],
                description: 'The type of marketing copy.',
              },
              content: {
                type: Type.STRING,
                description: 'The generated marketing copy text.',
              },
            },
            required: ["type", "content"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Basic validation of the parsed data structure
    if (!Array.isArray(parsedData) || parsedData.some(item => typeof item.type !== 'string' || typeof item.content !== 'string')) {
        throw new Error("API returned data in an unexpected format.");
    }

    return parsedData as GeneratedCopy[];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
