import TwttrApi, { User } from "npm:twttrapi-middleware"

export type CONFIG = {
    apiKey: string;
};

export type INPUTS = {
    query: string;
};

export type OUTPUT = {
    data?: User[];
    error?: string;
};

/**
 * Searches for Twitter users matching a specific query, sorted by relevance.
 * 
 * @param {CONFIG} config - Configuration object containing the API key
 * @param {string} config.apiKey - Twitter API key for authentication
 * @param {INPUTS} inputs - Input parameters for the search
 * @param {string} inputs.query - The search query to find matching users
 * @returns {Promise<OUTPUT>} A promise that resolves to an object containing either:
 *   - data: An array of User objects matching the search query, sorted by relevance
 *   - error: An error message if the request fails
 * 
 * @example
 * const result = await run(
 *   { apiKey: "your-api-key" },
 *   { query: "tech entrepreneur" }
 * );
 * if (result.data) {
 *   console.log(`Found ${result.data.length} matching users`);
 * }
 */
export async function run(config: CONFIG, inputs: INPUTS): Promise<OUTPUT> {
    const { apiKey } = config;
    const { query } = inputs;
    
    try {
      const twttr = new TwttrApi.default(apiKey);
      const response = await twttr.searchUsers(query);
      if (response.error) throw new Error(`Error searching users: ${response.error}`);
      return { data: response };
    } catch(e: any) {
       return { error: e.message };
    }
}
