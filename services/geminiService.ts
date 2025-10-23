
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, DocumentAnalysisResult, AISummary } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeDocument(
  base64Image: string,
  documentType: string,
  mimeType: string
): Promise<DocumentAnalysisResult> {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: base64Image,
                    },
                },
                {
                    text: `You are a document verification assistant. Analyze the attached image.
                    Is this a "${documentType}"? 
                    Extract key information such as the full name, dates, ID numbers, address, grades, or subjects relevant to this document type.
                    Respond in JSON format: {"isCorrectDocumentType": boolean, "summary": "A brief summary of the document content.", "extractedData": {"fullName": "...", "relevantInfo": "..."}}`
                },
            ],
        },
    });

    const text = response.text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(text);
    return { documentType, ...parsed };
  } catch (error) {
    console.error(`Error analyzing ${documentType}:`, error);
    return {
      documentType,
      error: `Failed to analyze the document. The AI model could not process the image.`,
    };
  }
}


export async function generateAdminSummary(
  formData: FormData,
  analysisResults: DocumentAnalysisResult[]
): Promise<AISummary> {
  const prompt = `
    You are an expert scholarship application reviewer with exceptional attention to detail. Your task is to analyze the provided user-submitted form data and the AI-extracted data from their uploaded documents.

    **User-Submitted Data:**
    ${JSON.stringify(formData, null, 2)}

    **AI-Extracted Data from Documents:**
    ${JSON.stringify(analysisResults, null, 2)}

    **Your Tasks:**
    1.  **Cross-Reference Data:** Meticulously compare the user-submitted data with the information extracted from the documents. Identify every single discrepancy. For example, compare names, birthdates, addresses, etc.
    2.  **Document Verification:** For each document, assess if the AI analysis confirmed it was the correct document type and if the extracted data seems valid.
    3.  **Create a Summary:** Write a brief, professional summary of the applicant based on all available information.
    4.  **Determine Final Status:** Based on your analysis, set the verificationStatus to "Verified" if there are no discrepancies, or "Discrepancies Found" if there are any mismatches.

    Your final output must be a JSON object that strictly adheres to the provided schema. Do not include any text or markdown formatting outside of the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 32768 },
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    applicantSummary: { type: Type.STRING },
                    verificationStatus: { type: Type.STRING },
                    discrepancies: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                field: { type: Type.STRING },
                                userValue: { type: Type.STRING },
                                documentValue: { type: Type.STRING },
                                documentType: { type: Type.STRING },
                            },
                        },
                    },
                    documentChecks: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                documentType: { type: Type.STRING },
                                status: { type: Type.STRING },
                                notes: { type: Type.STRING },
                            },
                        },
                    },
                },
            },
        },
    });
    
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as AISummary;

  } catch (error) {
    console.error('Error generating admin summary:', error);
    throw new Error('Failed to generate the AI summary.');
  }
}
