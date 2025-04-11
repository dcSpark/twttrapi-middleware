import { UserTweets, TweetApiResponse, User, Media, Tweet, ErrorResponse } from "./types";

class TwttrApi {
    private BASE_URL: string;
    private RAPID_API_KEY: string;
    private DEBUG: boolean;
    private MAX_RETRIES: number = 3;
    private RETRY_DELAY: number = 5000; // 1 second

    public constructor(rapidapiKey: string, debug: boolean = false) {
        this.RAPID_API_KEY = rapidapiKey;
        this.BASE_URL = 'https://twttrapi.p.rapidapi.com';
        this.DEBUG = debug;
    }

    /**
     * Fetches data from the API with retry logic for 429 errors and timeouts
     * @param url The URL to fetch from
     * @param options Fetch options
     * @param retryCount Current retry count
     * @returns Promise with the fetch response
     */
    private async fetchWithRetry(url: string, options: RequestInit, retryCount: number = 0): Promise<Response> {
        try {
            const response = await fetch(url, options);
            
            // If we get a 429 (Too Many Requests) error, retry after delay
            if (response.status === 429 && retryCount < this.MAX_RETRIES) {
                if (this.DEBUG) {
                    console.log(`Rate limited (429). Retrying in ${this.RETRY_DELAY}ms (attempt ${retryCount + 1}/${this.MAX_RETRIES})`);
                }
                
                // Wait for the specified delay
                await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
                
                // Retry the request
                return this.fetchWithRetry(url, options, retryCount + 1);
            }
            
            return response;
        } catch (error) {
            // Handle network errors or timeouts
            if (retryCount < this.MAX_RETRIES) {
                if (this.DEBUG) {
                    console.log(`Network error or timeout. Retrying in ${this.RETRY_DELAY}ms (attempt ${retryCount + 1}/${this.MAX_RETRIES})`);
                }
                
                // Wait for the specified delay
                await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
                
                // Retry the request
                return this.fetchWithRetry(url, options, retryCount + 1);
            }
            
            // If we've exhausted all retries, throw the error
            throw error;
        }
    }

    public async getTweetById(id: string): Promise<Tweet | ErrorResponse> {
        try {
            // Use the imported interface
            const response = await this.fetchWithRetry(this.BASE_URL + '/get-tweet?tweet_id=' + id, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });

            if (!response.ok) {
                console.error('API Error:', response.statusText);
                return { success: false, error: `Failed to get tweet by ID: ${response.statusText}` };
            }

            const data = await response.json() as TweetApiResponse;

            // Check for explicit error response from API
            if (data.success === false) {
                console.error('API Error:', data.error);
                return { success: false, error: data.error || 'Failed to get tweet by ID (API error)' };
            }

            // Extract data using optional chaining for safety
            const result = data?.data?.tweet_result?.result;
            const text = result?.legacy?.full_text;
            const date = result?.legacy?.created_at;
            const user = result?.core?.user_result?.result?.legacy?.screen_name;

            // Validate required fields
            if (result?.__typename === 'Tweet' && text && date && user) {
                const tweet: Tweet = {
                    text: text,
                    date: date,
                    user: `@${user}` // Prepend '@' to the screen name for consistency
                };
                return tweet;
            } else {
                console.error('Failed to parse tweet data from response:', data);
                // Attempt to return API error if present in the unexpected structure
                if (data?.error) {
                    return { success: false, error: data.error };
                }
                return { success: false, error: 'Failed to parse tweet data from response' };
            }
        } catch (error) {
            console.error('Fetch request failed:', error);
            return { success: false, error: 'Failed to get tweet by ID (Unknown error)' };
        }
    }

    public async getUserTweets(username: string): Promise<Tweet[] | ErrorResponse> {
        try {
            const username_clean = username.replace(/^@/, '').trim();
            if (!username_clean) {
                console.error('Username is not valid', username);
                return { success: false, error: 'Username is not valid' };
            }
            
            const response = await this.fetchWithRetry(this.BASE_URL + '/user-tweets?username=' + username_clean, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (!response.ok) {
                console.error('API Error:', response.statusText);
                return { success: false, error: `Failed to get user tweets: ${response.statusText}` };
            }
            
            const data = await response.json() as UserTweets;
            
            if ((data as unknown as ErrorResponse).success === false) {
                console.error(data);
                return { success: false, error: (data as unknown as ErrorResponse).error || 'Failed to get user tweets' };
            }
            
            const tweets: Tweet[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING] @${username_clean}`);
            }
            
            const instructions = data.data.user_result.result.timeline_response.timeline.instructions;
            
            for (const instruction of instructions) {
                if (instruction.entry) {
                    const content = instruction.entry.content.content;
                    const tweet = content.tweetResult.result;
                    if (tweet) {
                        const item: Tweet = {
                            text: tweet.legacy.full_text,
                            date: tweet.legacy.created_at,
                            user: `@${username_clean}`
                        }
                        if (this.DEBUG) {
                            console.log(item);
                        }
                        tweets.push(item);
                    } else {
                        console.log('If you see this, we are not parsing some tweets (0x01)', content);
                    }
                }
                
                if (instruction.entries) {
                    for (const entry of instruction.entries) {
                        if (entry.content.content) {
                            const content = entry.content.content;
                            const tweet = content.tweetResult.result;
                            const tweet2 = content.tweetResult.result.tweet;
                            
                            if (tweet && tweet.legacy) {
                                const item: Tweet = {
                                    text: tweet.legacy.full_text,
                                    date: tweet.legacy.created_at,
                                    user: `@${username_clean}`
                                }
                                if (this.DEBUG) {
                                    console.log(item);
                                }
                                tweets.push(item);
                            } else if (tweet2) {
                                const item: Tweet = {
                                    text: tweet2.legacy.full_text,
                                    date: tweet2.legacy.created_at,
                                    user: `@${username_clean}`
                                }
                                if (this.DEBUG) {
                                    console.log(item);
                                }
                                tweets.push(item);
                            } else {
                                console.log('If you see this, we are not parsing some tweets (0x02)', content);
                            }
                        }

                        if (entry.content.items) {
                            for (const item of entry.content.items) {
                                const tweet = item.item.content.tweetResult;
                                if (tweet) {
                                    const item: Tweet = {
                                        text: tweet.result.legacy.full_text,
                                        date: tweet.result.legacy.created_at,
                                        user: `@${username_clean}`
                                    }
                                    if (this.DEBUG) {
                                        console.log(item);
                                    }
                                    tweets.push(item);
                                } else {
                                    const i = item.item.content;
                                    if (i.userResult) {
                                        // We dont care about users.
                                    } else {
                                        console.log('If you see this, we are not parsing some tweets (0x03)', i);
                                    }
                                }
                            }
                        }

                        if (!entry.content.content && !entry.content.items) {
                            if (entry.content.__typename === 'TimelineTimelineCursor') {
                                // All good.
                            } else {
                                console.log('If you see this, we are not parsing some tweets (0x04)', entry);
                            }
                        }
                    }
                }
                
                if (!instruction.entry && !instruction.entries) {
                    if (instruction.__typename === 'TimelineClearCache') {
                        // All good.
                    } else {
                        console.log('If you see this, we are not parsing some tweets (0x05)', instruction);
                    }
                }
            }
            
            return tweets;
        } catch (error) {
            console.error(error);
            return { success: false, error: 'Failed to get user tweets' };
        }
    };

    public async getUserReplies(username: string): Promise<Tweet[] | ErrorResponse> {
        try {
            const username_clean = username.replace(/^@/, '').trim();
            if (!username_clean) {
                console.error('Username is not valid', username);
                return { success: false, error: 'Username is not valid' };
            }
            
            const response = await this.fetchWithRetry(this.BASE_URL + '/user-replies?username=' + username_clean, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (!response.ok) {
                console.error('API Error:', response.statusText);
                return { success: false, error: `Failed to get user replies: ${response.statusText}` };
            }
            
            const data = await response.json() as UserTweets;
            
            if ((data as unknown as ErrorResponse).success === false) {
                console.error(data);
                return { success: false, error: (data as unknown as ErrorResponse).error || 'Failed to get user replies' };
            }
            
            const tweets: Tweet[] = [];
            const userData = data.data;
            
            if (!userData?.user_result?.result?.timeline_response?.timeline?.instructions) {
                return { success: false, error: 'No user replies data found' };
            }
            
            const instructions = userData.user_result.result.timeline_response.timeline.instructions;
            
            for (const instruction of instructions) {
                // Process entry instruction
                if (instruction.entry) {
                    const content = instruction.entry.content.content;
                    const tweet = content.tweetResult?.result;
                    if (tweet && tweet.legacy) {
                        tweets.push({
                            text: tweet.legacy.full_text,
                            date: tweet.legacy.created_at,
                            user: `@${username_clean}`
                        });
                    }
                }
                
                // Process entries instruction
                if (instruction.entries) {
                    for (const entry of instruction.entries) {
                        // Direct tweet content
                        if (entry.content.content) {
                            const content = entry.content.content;
                            const tweet = content.tweetResult?.result;
                            const tweet2 = tweet?.tweet;
                            
                            if (tweet && tweet.legacy) {
                                tweets.push({
                                    text: tweet.legacy.full_text,
                                    date: tweet.legacy.created_at,
                                    user: `@${username_clean}`
                                });
                            } else if (tweet2) {
                                tweets.push({
                                    text: tweet2.legacy.full_text,
                                    date: tweet2.legacy.created_at,
                                    user: `@${username_clean}`
                                });
                            }
                        }
                        
                        // Process items array
                        if (entry.content.items) {
                            for (const item of entry.content.items) {
                                const itemContent = item.item.content;
                                const tweet = itemContent.tweetResult;
                                
                                if (tweet && tweet.result && tweet.result.legacy) {
                                    tweets.push({
                                        text: tweet.result.legacy.full_text,
                                        date: tweet.result.legacy.created_at,
                                        user: `@${username_clean}`
                                    });
                                }
                            }
                        }
                    }
                }
            }
            
            return tweets;
        } catch (error) {
            console.error('Error fetching user replies:', error);
            return { success: false, error: 'Failed to get user replies' };
        }
    }

    public async getUserMedia(username: string): Promise<Media[] | ErrorResponse> {
        try {
            const username_clean = username.replace(/^@/, '').trim();
            if (!username_clean) {
                console.error('Username is not valid', username);
                return { success: false, error: 'Username is not valid' };
            }
            
            const response = await this.fetchWithRetry(this.BASE_URL + '/user-media?username=' + username_clean, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (!response.ok) {
                console.error('API Error:', response.statusText);
                return { success: false, error: `Failed to get user media: ${response.statusText}` };
            }
            
            const data = await response.json();
            
            if ((data as unknown as ErrorResponse).success === false) {
                console.error(data);
                return { success: false, error: (data as unknown as ErrorResponse).error || 'Failed to get user media' };
            }
            
            const media: Media[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING MEDIA] @${username_clean}`);
            }
            
            const userData = data.data;
            
            if (!userData?.user_result?.result?.timeline_response?.timeline?.instructions) {
                return { success: false, error: 'No user media data found' };
            }
            
            const instructions = userData.user_result.result.timeline_response.timeline.instructions;
            
            for (const instruction of instructions) {
                // Process entries in the instructions
                if (instruction.entries) {
                    for (const entry of instruction.entries) {
                        if (entry.content?.__typename === 'TimelineTimelineItem' && 
                            entry.content.content?.__typename === 'TimelineTweet') {
                            
                            const tweetResult = entry.content.content.tweetResult?.result;
                            if (tweetResult) {
                                const screen_name = tweetResult.core?.user_result?.result?.legacy?.screen_name || username_clean;
                                const conversation_id_str = tweetResult.legacy?.conversation_id_str || '';
                                
                                // Check for extended_entities media
                                if (tweetResult.legacy?.extended_entities?.media) {
                                    for (const mediaItem of tweetResult.legacy.extended_entities.media) {
                                        media.push({
                                            display_url: mediaItem.display_url,
                                            expanded_url: mediaItem.expanded_url,
                                            type: mediaItem.type,
                                            url: mediaItem.url,
                                            conversation_id_str,
                                            screen_name
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            return media;
        } catch (error) {
            console.error('Error fetching user media:', error);
            return { success: false, error: 'Failed to get user media' };
        }
    }
    
    public async searchTop(query: string): Promise<Tweet[] | ErrorResponse> {
        try {
            if (!query || query.trim() === '') {
                console.error('Search query is not valid', query);
                return { success: false, error: 'Search query is not valid' };
            }
            
            const response = await this.fetchWithRetry(this.BASE_URL + '/search-top?query=' + encodeURIComponent(query), {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (!response.ok) {
                console.error('API Error:', response.statusText);
                return { success: false, error: `Failed to search top tweets: ${response.statusText}` };
            }
            
            const data = await response.json();
            
            if ((data as unknown as ErrorResponse).success === false) {
                console.error(data);
                return { success: false, error: (data as unknown as ErrorResponse).error || 'Failed to search top tweets' };
            }
            
            const tweets: Tweet[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING SEARCH TOP] "${query}"`);
            }
            
            const instructions = data.data.search.timeline_response.timeline.instructions;
            
            for (const instruction of instructions) {
                if (instruction.__typename === "TimelineAddEntries" && instruction.entries) {
                    for (const entry of instruction.entries) {
                        if (entry.content?.__typename === "TimelineTimelineCursor") {
                            continue;
                        }
                        
                        if (entry.content?.__typename === "TimelineTimelineItem" && 
                            entry.content.content?.__typename === "TimelineTweet" &&
                            entry.content.content.tweetResult?.result) {
                            
                            const tweetResult = entry.content.content.tweetResult.result;
                            
                            if (tweetResult.legacy) {
                                const username = tweetResult.core?.user_results?.result?.legacy?.screen_name || '';
                                
                                tweets.push({
                                    text: tweetResult.legacy.full_text,
                                    date: tweetResult.legacy.created_at,
                                    user: `@${username}`
                                });
                            }
                            
                            if (tweetResult.quoted_status_result?.result?.legacy) {
                                const quotedTweet = tweetResult.quoted_status_result.result;
                                const quotedUsername = quotedTweet.core?.user_results?.result?.legacy?.screen_name || '';
                                
                                tweets.push({
                                    text: quotedTweet.legacy.full_text,
                                    date: quotedTweet.legacy.created_at,
                                    user: `@${quotedUsername}`
                                });
                            }
                        }
                    }
                }
            }
            
            return tweets;
        } catch (error) {
            console.error('Error searching top tweets:', error);
            return { success: false, error: 'Failed to search top tweets' };
        }
    }

    public async searchLatest(query: string): Promise<Tweet[] | ErrorResponse> {
        try {
            if (!query || query.trim() === '') {
                console.error('Search query is not valid', query);
                return { success: false, error: 'Search query is not valid' };
            }
            
            const response = await this.fetchWithRetry(this.BASE_URL + '/search-latest?query=' + encodeURIComponent(query), {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (!response.ok) {
                console.error('API Error:', response.statusText);
                return { success: false, error: `Failed to search latest tweets: ${response.statusText}` };
            }
            
            const data = await response.json();
            
            if ((data as unknown as ErrorResponse).success === false) {
                console.error(data);
                return { success: false, error: (data as unknown as ErrorResponse).error || 'Failed to search latest tweets' };
            }
            
            const tweets: Tweet[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING SEARCH LATEST] "${query}"`);
            }
            
            const instructions = data.data.search.timeline_response.timeline.instructions;
            
            for (const instruction of instructions) {
                if (instruction.__typename === "TimelineAddEntries" && instruction.entries) {
                    for (const entry of instruction.entries) {
                        if (entry.content?.__typename === "TimelineTimelineCursor") {
                            continue;
                        }
                        
                        if (entry.content?.__typename === "TimelineTimelineItem" && 
                            entry.content.content?.__typename === "TimelineTweet" &&
                            entry.content.content.tweetResult?.result) {
                            
                            const tweetResult = entry.content.content.tweetResult.result;
                            
                            if (tweetResult.legacy) {
                                const username = tweetResult.core?.user_results?.result?.legacy?.screen_name || '';
                                
                                tweets.push({
                                    text: tweetResult.legacy.full_text,
                                    date: tweetResult.legacy.created_at,
                                    user: `@${username}`
                                });
                            }
                            
                            if (tweetResult.quoted_status_result?.result?.legacy) {
                                const quotedTweet = tweetResult.quoted_status_result.result;
                                const quotedUsername = quotedTweet.core?.user_results?.result?.legacy?.screen_name || '';
                                
                                tweets.push({
                                    text: quotedTweet.legacy.full_text,
                                    date: quotedTweet.legacy.created_at,
                                    user: `@${quotedUsername}`
                                });
                            }
                        }
                    }
                }
            }
            
            return tweets;
        } catch (error) {
            console.error('Error searching latest tweets:', error);
            return { success: false, error: 'Failed to search latest tweets' };
        }
    }

    public async searchUsers(query: string): Promise<User[] | ErrorResponse> {
        try {
            if (!query || query.trim() === '') {
                console.error('Search query is not valid', query);
                return { success: false, error: 'Search query is not valid' };
            }
            
            const response = await this.fetchWithRetry(this.BASE_URL + '/search-users?query=' + encodeURIComponent(query), {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (!response.ok) {
                console.error('API Error:', response.statusText);
                return { success: false, error: `Failed to search users: ${response.statusText}` };
            }
            
            const data = await response.json();
            
            if ((data as unknown as ErrorResponse).success === false) {
                console.error(data);
                return { success: false, error: (data as unknown as ErrorResponse).error || 'Failed to search users' };
            }
            
            const users: User[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING SEARCH USERS] "${query}"`);
            }
            
            const instructions = data.data.search.timeline_response.timeline.instructions;
            
            for (const instruction of instructions) {
                if (instruction.__typename === "TimelineAddEntries" && instruction.entries) {
                    for (const entry of instruction.entries) {
                        if (entry.content?.__typename === "TimelineTimelineItem" && 
                            entry.content.content?.__typename === "TimelineUser") {
                            
                            const userResult = entry.content.content.userResult?.result;
                            
                            if (userResult && userResult.legacy) {
                                users.push({
                                    followers: userResult.legacy.followers_count,
                                    following: userResult.legacy.friends_count,
                                    id: userResult.legacy.id_str,
                                    name: userResult.legacy.name,
                                    profile_image_url: userResult.legacy.profile_image_url_https,
                                    username: userResult.legacy.screen_name
                                });
                            }
                        }
                    }
                }
            }
            
            return users;
        } catch (error) {
            console.error('Error searching users:', error);
            return { success: false, error: 'Failed to search users' };
        }
    }

    public async getUser(username: string): Promise<User | ErrorResponse> {
        try {
            const username_clean = username.replace(/^@/, '').trim();
            if (!username_clean) {
                console.error('Username is not valid', username);
                return { success: false, error: 'Username is not valid' };
            }

            const response = await this.fetchWithRetry(this.BASE_URL + '/get-user?username=' + username_clean, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });

            if (!response.ok) {
                console.error('API Error:', response.statusText);
                return { success: false, error: `Failed to get user data: ${response.statusText}` };
            }
            
            const userData = await response.json();
            
            if ((userData as unknown as ErrorResponse).success === false) {
                console.error(userData);
                return { success: false, error: 'Failed to get user data' };
            }
            
            if (!userData) {
                return { success: false, error: 'No user data returned' };
            }
            
            const user: User = {
                followers: userData.followers_count,
                following: userData.friends_count,
                id: userData.id_str,
                name: userData.name,
                profile_image_url: userData.profile_image_url_https,
                username: userData.screen_name
            };
            
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            return { success: false, error: 'Failed to get user data' };
        }
    }

    public async getUserFollowers(username: string): Promise<User[] | ErrorResponse> {
        try {
            const username_clean = username.replace(/^@/, '').trim();
            if (!username_clean) {
                console.error('Username is not valid', username);
                return { success: false, error: 'Username is not valid' };
            }
            
            const response = await this.fetchWithRetry(this.BASE_URL + '/user-followers?username=' + username_clean, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (!response.ok) {
                console.error('API Error:', response.statusText);
                return { success: false, error: `Failed to get user followers: ${response.statusText}` };
            }
            
            const data = await response.json();
            
            if ((data as unknown as ErrorResponse).success === false) {
                console.error(data);
                return { success: false, error: (data as unknown as ErrorResponse).error || 'Failed to get user followers' };
            }
            
            const users: User[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING FOLLOWERS] @${username_clean}`);
            }
            
            const instructions = data.data.user.timeline_response.timeline.instructions;
            
            for (const instruction of instructions) {
                if (instruction.__typename === "TimelineAddEntries" && instruction.entries) {
                    for (const entry of instruction.entries) {
                        if (entry.content.__typename === "TimelineTimelineItem" && 
                            entry.content.content?.__typename === "TimelineUser") {
                            
                            const userResult = entry.content.content.userResult?.result;
                            if (userResult && userResult.legacy) {
                                users.push({
                                    followers: userResult.legacy.followers_count,
                                    following: userResult.legacy.friends_count,
                                    id: userResult.legacy.id_str,
                                    name: userResult.legacy.name,
                                    profile_image_url: userResult.legacy.profile_image_url_https,
                                    username: userResult.legacy.screen_name
                                });
                            }
                        }
                    }
                }
            }
            
            return users;
        } catch (error) {
            console.error('Error fetching user followers:', error);
            return { success: false, error: 'Failed to get user followers' };
        }
    }

    public async getUserFollowing(username: string): Promise<User[] | ErrorResponse> {
        try {
            const username_clean = username.replace(/^@/, '').trim();
            if (!username_clean) {
                console.error('Username is not valid', username);
                return { success: false, error: 'Username is not valid' };
            }
            
            const response = await this.fetchWithRetry(this.BASE_URL + '/user-following?username=' + username_clean, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (!response.ok) {
                console.error('API Error:', response.statusText);
                return { success: false, error: `Failed to get user following: ${response.statusText}` };
            }
            
            const data = await response.json();
            
            if ((data as unknown as ErrorResponse).success === false) {
                console.error(data);
                return { success: false, error: (data as unknown as ErrorResponse).error || 'Failed to get user following' };
            }
            
            const users: User[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING FOLLOWING] @${username_clean}`);
            }
            
            const instructions = data.data.user.timeline_response.timeline.instructions;
            
            for (const instruction of instructions) {
                if (instruction.__typename === "TimelineAddEntries" && instruction.entries) {
                    for (const entry of instruction.entries) {
                        if (entry.content.__typename === "TimelineTimelineItem" && 
                            entry.content.content?.__typename === "TimelineUser") {
                            
                            const userResult = entry.content.content.userResult?.result;
                            if (userResult && userResult.legacy) {
                                users.push({
                                    followers: userResult.legacy.followers_count,
                                    following: userResult.legacy.friends_count,
                                    id: userResult.legacy.id_str,
                                    name: userResult.legacy.name,
                                    profile_image_url: userResult.legacy.profile_image_url_https,
                                    username: userResult.legacy.screen_name
                                });
                            }
                        }
                    }
                }
            }
            
            return users;
        } catch (error) {
            console.error('Error fetching user following:', error);
            return { success: false, error: 'Failed to get user following' };
        }
    }
}

export default TwttrApi;