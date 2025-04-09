import TwttrApi, { Tweet } from "npm:twttrapi-middleware"

export type CONFIG = {
    apiKey: string;
};

export type INPUTS = {
    query: string;
};

export type OUTPUT = {
    data?: Tweet[];
    error?: string;
};

/**
 * Searches for tweets from users matching a specific query.
 * 
 * @param {CONFIG} config - Configuration object containing the API key
 * @param {string} config.apiKey - Twitter API key for authentication
 * @param {INPUTS} inputs - Input parameters for the search
 * @param {string} inputs.query - The search query to find tweets from matching users
 * @returns {Promise<OUTPUT>} A promise that resolves to an object containing either:
 *   - data: An array of Tweet objects from users matching the search query
 *   - error: An error message if the request fails
 * 
 * @example
 * const result = await run(
 *   { apiKey: "your-api-key" },
 *   { query: "tech journalists" }
 * );
 * if (result.data) {
 *   console.log(`Found ${result.data.length} tweets from matching users`);
 * }
 */
export async function run(config: CONFIG, inputs: INPUTS): Promise<OUTPUT> {
    const { apiKey } = config;
    const { query } = inputs;
    
    try {
      const twttr = new TwttrApi.default(apiKey);
      const response = await twttr.searchTop(query);
      if (response.error) throw new Error(`Error fetching followers: ${response.error}`);
      return { data: response };
    } catch(e: any) {
       return { error: e.message };
    }
}