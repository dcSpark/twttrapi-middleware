import TwttrApi, { User } from "npm:twttrapi-middleware"

export type CONFIG = {
    apiKey: string;
};

export type INPUTS = {
    username: string;
};

export type OUTPUT = {
    data?: User;
    error?: string;
};

/**
 * Retrieves user information for a specific Twitter username.
 * 
 * @param {CONFIG} config - Configuration object containing the API key
 * @param {string} config.apiKey - Twitter API key for authentication
 * @param {INPUTS} inputs - Input parameters for the user retrieval
 * @param {string} inputs.username - The Twitter username to look up
 * @returns {Promise<OUTPUT>} A promise that resolves to an object containing either:
 *   - data: The User object with user details if successful
 *   - error: An error message if the request fails
 * 
 * @example
 * const result = await run(
 *   { apiKey: "your-api-key" },
 *   { username: "elonmusk" }
 * );
 * if (result.data) {
 *   console.log(result.data);
 * }
 */
export async function run(config: CONFIG, inputs: INPUTS): Promise<OUTPUT> {
    const { apiKey } = config;
    const { username } = inputs;
    
    try {
      const twttr = new TwttrApi.default(apiKey);
      const response = await twttr.getUser(username);
      if (response.error) throw new Error(`Error fetching user: ${response.error}`);
      return { data: response };
    } catch(e: any) {
       return { error: e.message };
    }
}
