// src/ai/flows/suggest-image-features.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests relevant image processing features based on the input image.
 *
 * - suggestImageFeatures - The main function to suggest image features.
 * - SuggestImageFeaturesInput - The input type for the suggestImageFeatures function.
 * - SuggestImageFeaturesOutput - The output type for the suggestImageFeatures function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImageFeaturesInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestImageFeaturesInput = z.infer<typeof SuggestImageFeaturesInputSchema>;

const SuggestImageFeaturesOutputSchema = z.object({
  suggestedFeatures: z
    .array(z.string())
    .describe('A list of suggested image processing features.'),
});
export type SuggestImageFeaturesOutput = z.infer<typeof SuggestImageFeaturesOutputSchema>;

export async function suggestImageFeatures(
  input: SuggestImageFeaturesInput
): Promise<SuggestImageFeaturesOutput> {
  return suggestImageFeaturesFlow(input);
}

const suggestImageFeaturesPrompt = ai.definePrompt({
  name: 'suggestImageFeaturesPrompt',
  input: {schema: SuggestImageFeaturesInputSchema},
  output: {schema: SuggestImageFeaturesOutputSchema},
  prompt: `You are an AI assistant designed to suggest image processing features.
  Based on the input image, suggest a list of relevant image processing features that the user might want to apply.
  Here is the input image: {{media url=photoDataUri}}
  Respond with a JSON array of strings, where each string is a suggested feature.
  The suggested features should be short, descriptive, and relevant to the image.
`,
});

const suggestImageFeaturesFlow = ai.defineFlow(
  {
    name: 'suggestImageFeaturesFlow',
    inputSchema: SuggestImageFeaturesInputSchema,
    outputSchema: SuggestImageFeaturesOutputSchema,
  },
  async input => {
    const {output} = await suggestImageFeaturesPrompt(input);
    return output!;
  }
);
