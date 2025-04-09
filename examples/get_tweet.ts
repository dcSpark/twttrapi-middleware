import TwttrApi, { Tweet, ErrorResponse } from "npm:twttrapi-middleware"

export type CONFIG = {
    apiKey: string;
};

export type INPUTS = {
    tweetId: string;
};

export type OUTPUT = {
    data?: Tweet;
    error?: string;
};

/**
 * Retrieves a specific tweet by its ID using the Twitter API.
 * 
 * @param {CONFIG} config - Configuration object containing the API key
 * @param {string} config.apiKey - Twitter API key for authentication
 * @param {INPUTS} inputs - Input parameters for the tweet retrieval
 * @param {string} inputs.tweetId - The ID of the tweet to retrieve
 * @returns {Promise<OUTPUT>} A promise that resolves to an object containing either:
 *   - data: The Tweet object with tweet details if successful
 *   - error: An error message if the request fails
 * 
 * @example
 * const result = await run(
 *   { apiKey: "your-api-key" },
 *   { tweetId: "1234567890" }
 * );
 * if (result.data) {
 *   console.log(result.data);
 * }
 */
export async function run(config: CONFIG, inputs: INPUTS): Promise<OUTPUT> {
    const { apiKey } = config;
    const { tweetId } = inputs;
    
    try {
      const twttr = new TwttrApi.default(apiKey, true);
      const response = await twttr.getTweetById(tweetId);
      if ((response as ErrorResponse).error) throw new Error(`Error fetching tweet: ${(response as ErrorResponse).error}`);
      return { data: (response as Tweet) };
    } catch(e: any) {
       return { error: e.message };
    }
}
