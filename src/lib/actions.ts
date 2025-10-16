// src/lib/actions.ts
'use server';

import {
  suggestImageFeatures as suggestImageFeaturesFlow,
  type SuggestImageFeaturesInput,
} from '@/ai/flows/suggest-image-features';

export async function suggestImageFeatures(input: SuggestImageFeaturesInput) {
  try {
    const result = await suggestImageFeaturesFlow(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in suggestImageFeatures flow:', error);
    return { success: false, error: 'Failed to get AI suggestions.' };
  }
}
