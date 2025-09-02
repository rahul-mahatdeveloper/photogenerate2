
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse, Part } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const buildPrompt = (clothing: string, background: string): string => {
  return `
    You are a professional photographer's AI assistant. Your task is to edit this portrait for a professional setting like LinkedIn.

    **CRITICAL INSTRUCTIONS:**
    1.  **PRESERVE IDENTITY (DO NOT CHANGE):** The person's face, facial features (eyes, nose, mouth), skin texture (including pores and minor imperfections), hair, and body structure MUST remain 100% identical to the original photo. Do not alter, morph, or regenerate any part of the person.
    2.  **MODIFY ATTIRE:** Change the clothing to a professional '${clothing}'.
    3.  **MODIFY BACKGROUND:** Replace the background with a '${background}' setting.
    4.  **APPLY PHOTOGRAPHIC STYLE:** Emulate the look of a high-end DSLR camera. This includes natural, soft lighting, a shallow depth of field (bokeh) to make the subject stand out, and professional color grading.
    5.  **MAINTAIN REALISM:** The final image must look like a real photograph, not an AI creation. Avoid any plastic-like skin or unnatural artifacts.

    Output only the edited image. Do not output any text.
  `;
};

export const generateProfessionalPortrait = async (
  base64ImageData: string,
  mimeType: string,
  clothing: string,
  background: string
): Promise<{ image: string | null; text: string | null }> => {
  const model = 'gemini-2.5-flash-image-preview';
  const prompt = buildPrompt(clothing, background);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let generatedImage: string | null = null;
    let generatedText: string | null = null;
    
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                generatedImage = part.inlineData.data;
            } else if (part.text) {
                generatedText = part.text;
            }
        }
    }
    
    if(!generatedImage) {
        throw new Error("The API response did not contain an image. " + (generatedText || ''));
    }

    return { image: generatedImage, text: generatedText };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(`Failed to generate portrait: ${error instanceof Error ? error.message : String(error)}`);
  }
};
