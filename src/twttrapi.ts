import { UserTweets, TweetApiResponse, User, Media, Tweet, ErrorResponse } from "./types";
import axios from "axios";

class TwttrApi {
    private static instance: TwttrApi;
    private BASE_URL: string;
    private RAPID_API_KEY: string;
    private DEBUG: boolean;

    private constructor() {
        this.RAPID_API_KEY = process.env.RAPID_API_KEY || '';
        this.BASE_URL = 'https://twttrapi.p.rapidapi.com';
        this.DEBUG = process.env.DEBUG === 'true';
    }

    public static getInstance(): TwttrApi {
        if (!TwttrApi.instance) {
            TwttrApi.instance = new TwttrApi();
        }
        return TwttrApi.instance;
    }

    public async getTweetById(id: string): Promise<Tweet | ErrorResponse> {
        try {
            // Use the imported interface
            const response = await axios.get<TweetApiResponse>(this.BASE_URL + '/get-tweet?tweet_id=' + id, {
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });

            // Check for explicit error response from API
            if (response.data.success === false) {
                console.error('API Error:', response.data.error);
                return { success: false, error: response.data.error || 'Failed to get tweet by ID (API error)' };
            }

            // Extract data using optional chaining for safety
            const result = response.data?.data?.tweet_result?.result;
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
                console.error('Failed to parse tweet data from response:', response.data);
                // Attempt to return API error if present in the unexpected structure
                if (response.data?.error) {
                    return { success: false, error: response.data.error };
                }
                return { success: false, error: 'Failed to parse tweet data from response' };
            }
        } catch (error) {
            console.error('Axios request failed:', error);
            // Check if error is an Axios error to potentially extract more details
             if (axios.isAxiosError(error) && error.response) {
                 console.error('API Response Data:', error.response.data);
                 // Try to cast response data to ErrorResponse or the new interface
                 const errorData = error.response.data as (ErrorResponse | TweetApiResponse);
                 return { success: false, error: errorData.error || 'Failed to get tweet by ID (Request failed)' };
             }
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
            
            const response = await axios.get<UserTweets>(this.BASE_URL + '/user-tweets?username=' + username_clean, {
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (response.status > 399 || ((response.data as unknown as ErrorResponse).success === false)) {
                console.error(response.data);
                return { success: false, error: (response.data as unknown as ErrorResponse).error || 'Failed to get user tweets' };
            }
            
            const tweets: Tweet[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING] @${username_clean}`);
            }
            
            const instructions = response.data.data.user_result.result.timeline_response.timeline.instructions;
            
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
            
            const response = await axios.get<UserTweets>(this.BASE_URL + '/user-replies?username=' + username_clean, {
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (response.status > 399 || ((response.data as unknown as ErrorResponse).success === false)) {
                console.error(response.data);
                return { success: false, error: (response.data as unknown as ErrorResponse).error || 'Failed to get user replies' };
            }
            
            const tweets: Tweet[] = [];
            const data = response.data.data;
            
            if (!data?.user_result?.result?.timeline_response?.timeline?.instructions) {
                return { success: false, error: 'No user replies data found' };
            }
            
            const instructions = data.user_result.result.timeline_response.timeline.instructions;
            
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
            if (axios.isAxiosError(error) && error.response) {
                return { success: false, error: `Failed to get user replies: ${error.response.statusText}` };
            }
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
            
            const response = await axios.get(this.BASE_URL + '/user-media?username=' + username_clean, {
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (response.status > 399 || ((response.data as unknown as ErrorResponse).success === false)) {
                console.error(response.data);
                return { success: false, error: (response.data as unknown as ErrorResponse).error || 'Failed to get user media' };
            }
            
            const media: Media[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING MEDIA] @${username_clean}`);
            }
            
            const data = response.data.data;
            
            if (!data?.user_result?.result?.timeline_response?.timeline?.instructions) {
                return { success: false, error: 'No user media data found' };
            }
            
            const instructions = data.user_result.result.timeline_response.timeline.instructions;
            
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
            if (axios.isAxiosError(error) && error.response) {
                return { success: false, error: `Failed to get user media: ${error.response.statusText}` };
            }
            return { success: false, error: 'Failed to get user media' };
        }
    }
    
    public async searchTop(query: string): Promise<Tweet[] | ErrorResponse> {
        try {
            if (!query || query.trim() === '') {
                console.error('Search query is not valid', query);
                return { success: false, error: 'Search query is not valid' };
            }
            
            const response = await axios.get(this.BASE_URL + '/search-top?query=' + encodeURIComponent(query), {
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (response.status > 399 || ((response.data as unknown as ErrorResponse).success === false)) {
                console.error(response.data);
                return { success: false, error: (response.data as unknown as ErrorResponse).error || 'Failed to search top tweets' };
            }
            
            const tweets: Tweet[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING SEARCH TOP] "${query}"`);
            }
            
            const instructions = response.data.data.search.timeline_response.timeline.instructions;
            
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
            if (axios.isAxiosError(error) && error.response) {
                return { success: false, error: `Failed to search top tweets: ${error.response.statusText}` };
            }
            return { success: false, error: 'Failed to search top tweets' };
        }
    }

    public async searchLatest(query: string): Promise<Tweet[] | ErrorResponse> {
        try {
            if (!query || query.trim() === '') {
                console.error('Search query is not valid', query);
                return { success: false, error: 'Search query is not valid' };
            }
            
            const response = await axios.get(this.BASE_URL + '/search-latest?query=' + encodeURIComponent(query), {
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (response.status > 399 || ((response.data as unknown as ErrorResponse).success === false)) {
                console.error(response.data);
                return { success: false, error: (response.data as unknown as ErrorResponse).error || 'Failed to search latest tweets' };
            }
            
            const tweets: Tweet[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING SEARCH LATEST] "${query}"`);
            }
            
            const instructions = response.data.data.search.timeline_response.timeline.instructions;
            
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
            if (axios.isAxiosError(error) && error.response) {
                return { success: false, error: `Failed to search latest tweets: ${error.response.statusText}` };
            }
            return { success: false, error: 'Failed to search latest tweets' };
        }
    }

    public async searchUsers(query: string): Promise<User[] | ErrorResponse> {
        try {
            if (!query || query.trim() === '') {
                console.error('Search query is not valid', query);
                return { success: false, error: 'Search query is not valid' };
            }
            
            const response = await axios.get(this.BASE_URL + '/search-users?query=' + encodeURIComponent(query), {
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (response.status > 399 || ((response.data as unknown as ErrorResponse).success === false)) {
                console.error(response.data);
                return { success: false, error: (response.data as unknown as ErrorResponse).error || 'Failed to search users' };
            }
            
            const users: User[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING SEARCH USERS] "${query}"`);
            }
            
            const instructions = response.data.data.search.timeline_response.timeline.instructions;
            
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
            if (axios.isAxiosError(error) && error.response) {
                return { success: false, error: `Failed to search users: ${error.response.statusText}` };
            }
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

            const response = await axios.get(this.BASE_URL + '/get-user?username=' + username_clean, {
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });

            if (response.status > 399 || ((response.data as unknown as ErrorResponse).success === false)) {
                console.error(response.data);
                return { success: false, error: 'Failed to get user data' };
            }
            
            // Extract the requested fields from the user data
            const userData = response.data;
            
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
            
            const response = await axios.get(this.BASE_URL + '/user-followers?username=' + username_clean, {
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (response.status > 399 || ((response.data as unknown as ErrorResponse).success === false)) {
                console.error(response.data);
                return { success: false, error: (response.data as unknown as ErrorResponse).error || 'Failed to get user followers' };
            }
            
            const users: User[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING FOLLOWERS] @${username_clean}`);
            }
            
            const instructions = response.data.data.user.timeline_response.timeline.instructions;
            
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
            if (axios.isAxiosError(error) && error.response) {
                return { success: false, error: `Failed to get user followers: ${error.response.statusText}` };
            }
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
            
            const response = await axios.get(this.BASE_URL + '/user-following?username=' + username_clean, {
                headers: {
                    'x-rapidapi-host': 'twttrapi.p.rapidapi.com',
                    'x-rapidapi-key': this.RAPID_API_KEY
                }
            });
            
            if (response.status > 399 || ((response.data as unknown as ErrorResponse).success === false)) {
                console.error(response.data);
                return { success: false, error: (response.data as unknown as ErrorResponse).error || 'Failed to get user following' };
            }
            
            const users: User[] = [];
            
            if (this.DEBUG) {
                console.log(`[PROCESSING FOLLOWING] @${username_clean}`);
            }
            
            const instructions = response.data.data.user.timeline_response.timeline.instructions;
            
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
            if (axios.isAxiosError(error) && error.response) {
                return { success: false, error: `Failed to get user following: ${error.response.statusText}` };
            }
            return { success: false, error: 'Failed to get user following' };
        }
    }
}

export default TwttrApi;