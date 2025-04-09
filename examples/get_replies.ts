import TwttrApi, { Tweet } from "npm:twttrapi-middleware"

export type CONFIG = {
    apiKey: string;
};

export type INPUTS = {
    username: string;
};

export type OUTPUT = {
    data?: Tweet[];
    error?: string;
};

/**
 * Retrieves all replies made by a specific Twitter user.
 * 
 * @param {CONFIG} config - Configuration object containing the API key
 * @param {string} config.apiKey - Twitter API key for authentication
 * @param {INPUTS} inputs - Input parameters for the replies retrieval
 * @param {string} inputs.username - The Twitter username to get replies for
 * @returns {Promise<OUTPUT>} A promise that resolves to an object containing either:
 *   - data: An array of Tweet objects containing the user's replies
 *   - error: An error message if the request fails
 * 
 * @example
 * const result = await run(
 *   { apiKey: "your-api-key" },
 *   { username: "elonmusk" }
 * );
 * if (result.data) {
 *   console.log(`Found ${result.data.length} replies`);
 * }
 */
export async function run(config: CONFIG, inputs: INPUTS): Promise<OUTPUT> {
    const { apiKey } = config;
    const { username } = inputs;
    
    try {
      const twttr = new TwttrApi.default(apiKey);
      const response = await twttr.getUserReplies(username);
      if (response.error) throw new Error(`Error fetching tweet: ${response.error}`);
      return { data: response };
    } catch(e: any) {
       return { error: e.message };
    }
}
