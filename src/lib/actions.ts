// src/lib/actions.ts
'use server';

import {
  suggestImageFeatures as suggestImageFeaturesFlow,
  type SuggestImageFeaturesInput,
  type SuggestImageFeaturesOutput,
} from '@/ai/flows/suggest-image-features';

export async function suggestImageFeatures(input: SuggestImageFeaturesInput): Promise<SuggestImageFeaturesOutput> {
  try {
    const result = await suggestImageFeaturesFlow(input);
    return result;
  } catch (error) {
    console.error('Error in suggestImageFeatures flow:', error);
    // Return a valid but empty response in case of error
    return { suggestedFeatures: [] };
  }
}
