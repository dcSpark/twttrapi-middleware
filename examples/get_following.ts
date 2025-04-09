import TwttrApi, { User } from "npm:twttrapi-middleware"

export type CONFIG = {
    apiKey: string;
};

export type INPUTS = {
    username: string;
};

export type OUTPUT = {
    data?: User[];
    error?: string;
};

/**
 * Retrieves the list of accounts that a specific Twitter user is following.
 * 
 * @param {CONFIG} config - Configuration object containing the API key
 * @param {string} config.apiKey - Twitter API key for authentication
 * @param {INPUTS} inputs - Input parameters for the following retrieval
 * @param {string} inputs.username - The Twitter username to get following list for
 * @returns {Promise<OUTPUT>} A promise that resolves to an object containing either:
 *   - data: An array of User objects representing the accounts the user is following
 *   - error: An error message if the request fails
 * 
 * @example
 * const result = await run(
 *   { apiKey: "your-api-key" },
 *   { username: "elonmusk" }
 * );
 * if (result.data) {
 *   console.log(`Found ${result.data.length} accounts being followed`);
 * }
 */
export async function run(config: CONFIG, inputs: INPUTS): Promise<OUTPUT> {
    const { apiKey } = config;
    const { username } = inputs;
    
    try {
      const twttr = new TwttrApi.default(apiKey);
      const response = await twttr.getUserFollowing(username);
      if (response.error) throw new Error(`Error fetching following: ${response.error}`);
      return { data: response };
    } catch(e: any) {
       return { error: e.message };
    }
}
