export interface UserTweets {
    data: Data;
    success: true;
}

export interface Data {
    user_result: DataUserResult;
}

export interface DataUserResult {
    result: PurpleResult;
}

export interface PurpleResult {
    timeline_response: TimelineResponse;
}

export interface TimelineResponse {
    id: string;
    timeline: Timeline;
}

export interface Timeline {
    instructions: Instruction[];
    metadata: TimelineMetadata;
}

export interface Instruction {
    __typename: InstructionTypename;
    entry?: PurpleEntry;
    entries?: EntryElement[];
}

export enum InstructionTypename {
    TimelineAddEntries = "TimelineAddEntries",
    TimelineClearCache = "TimelineClearCache",
    TimelinePinEntry = "TimelinePinEntry",
}

export interface EntryElement {
    content: PurpleContent;
    entryId: string;
    sortIndex: string;
}

export interface PurpleContent {
    __typename: PurpleTypename;
    clientEventInfo?: ItemClientEventInfo;
    content?: FluffyContent;
    footer?: Footer;
    header?: Header;
    items?: ItemElement[];
    moduleDisplayType?: ModuleDisplayType;
    metadata?: ContentMetadata;
    cursorType?: CursorType;
    value?: string;
}

export enum PurpleTypename {
    TimelineTimelineCursor = "TimelineTimelineCursor",
    TimelineTimelineItem = "TimelineTimelineItem",
    TimelineTimelineModule = "TimelineTimelineModule",
}

export interface ItemClientEventInfo {
    component: Ent;
    details: Details;
    element?: Element;
}

export enum Ent {
    SuggestRankedOrganicTweet = "suggest_ranked_organic_tweet",
    SuggestWhoToFollow = "suggest_who_to_follow",
    Tweet = "tweet",
}

export interface Details {
    timelinesDetails: TimelinesDetails;
}

export interface TimelinesDetails {
    controllerData: ControllerData;
    injectionType: InjectionType;
    sourceData?: string;
}

export enum ControllerData {
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3ADbhBsAAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3ADbhBsAAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3DtwJlZAAgAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3DtwJlZAAgAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3E3G9JSAAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3E3G9JsAAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3EEtV5QgAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3EEtV5qgAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3FIiiZvQAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3FIiiZvQAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3HWS3FcQAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3HWS3FcQAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3HgBr1FQAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3HgBr1fQAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3IXT4DcwAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3IXT4dcwAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3IjMM1DAAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3IjMM1dAAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3JBEe5QgAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3JBEe5qgAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3JVhVTZwAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3JVhVtZwAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3Kq2YdbAAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3Kq2YdbAAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3LyWANvQAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3LyWANvQAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3MRjSJdwAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3MRjSJdwAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3MiRFqAAQAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3Mi+RFqAAQAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3Mq2EtsAAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3Mq2EtsAAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3NTSvpcgAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3NtSvpcgAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3NvAcdagAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3NvAcdagAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkZ3OYBaBqwAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkZ3OYBaBqwAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkaDLQoRagAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkaDl+QoRagAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkaDftAEZowAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkaDftAeZowAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkaDgQYFZrAAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkaDgQYFZrAAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkaDi5Oz1AQAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkaDi5Oz1aQAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkaDiGpdNvQAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkaDiGpdNvQAAAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkaDiZdsJowAQAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkaDiZdsJowAQAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkaDjEbfdZgAgAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkaDjEbfdZgAgAAAAA=",
    DAACDAABDAABCGABAAAAAAAAAAAKAAkaDjpXHdcAAAAAAAA = "DAACDAABDAABCgABAAAAAAAAAAAKAAkaDjpXHdcAAAAAAAA=",
    DAACDAACDAABCGABAAAAAAAAAAgAAAAA = "DAACDAACDAABCgABAAAAAAAAAAgAAAAA",
}

export enum InjectionType {
    RankedOrganicTweet = "RankedOrganicTweet",
    WhoToFollow = "WhoToFollow",
}

export enum Element {
    Tweet = "tweet",
    User = "user",
}

export interface FluffyContent {
    __typename: FluffyTypename;
    tweetDisplayType: TweetDisplayType;
    tweetResult: PurpleTweetResult;
}

export enum FluffyTypename {
    TimelineTweet = "TimelineTweet",
    TimelineUser = "TimelineUser",
}

export enum TweetDisplayType {
    Tweet = "Tweet",
    TweetWithVisibilityResults = "TweetWithVisibilityResults",
}

export interface PurpleTweetResult {
    result: FluffyResult;
}

export interface FluffyResult {
    __typename: TweetDisplayType;
    conversation_muted?: boolean;
    core?: PurpleCore;
    edit_control?: PurpleEditControl;
    is_translatable?: boolean;
    legacy?: FluffyLegacy;
    quick_promote_eligibility?: QuickPromoteEligibility;
    quoted_status_result?: FluffyQuotedStatusResult;
    rest_id?: string;
    unmention_data?: UnmentionData;
    view_count_info?: ViewCountInfo;
    note_tweet?: PurpleNoteTweet;
    tweet_card?: TweetCard;
    limited_action_results?: LimitedActionResults;
    tweet?: PurpleTweet;
    previous_counts?: PreviousCounts;
}

export interface PurpleCore {
    user_result: UserResultClass;
}

export interface UserResultClass {
    result: UserResultResult;
}

export interface UserResultResult {
    __typename: UserDisplayType;
    affiliates_highlighted_label: AffiliatesHighlightedLabel;
    exclusive_tweet_following: boolean;
    is_blue_verified: boolean;
    legacy: PurpleLegacy;
    private_super_following: boolean;
    profile_image_shape: ProfileImageShape;
    rest_id: string;
    super_follow_eligible: boolean;
    super_followed_by: boolean;
    super_following: boolean;
}

export enum UserDisplayType {
    User = "User",
    UserUnavailable = "UserUnavailable",
}

export interface AffiliatesHighlightedLabel {
    label?: Label;
}

export interface Label {
    badge: Badge;
    description: string;
    url: LandingURLClass;
    userLabelDisplayType: UserLabelDisplayType;
    userLabelType: UserLabelType;
}

export interface Badge {
    url: string;
}

export interface LandingURLClass {
    url: string;
    urlType: URLType;
}

export enum URLType {
    DeepLink = "DeepLink",
    ExternalURL = "ExternalUrl",
}

export enum UserLabelDisplayType {
    Badge = "Badge",
}

export enum UserLabelType {
    BusinessLabel = "BusinessLabel",
}

export interface PurpleLegacy {
    advertiser_account_service_levels: AdvertiserAccountServiceLevel[];
    advertiser_account_type: AdvertiserAccountType;
    analytics_type: AnalyticsType;
    can_dm: boolean;
    can_media_tag: boolean;
    created_at: string;
    description: string;
    entities: PurpleEntities;
    fast_followers_count: number;
    favourites_count: number;
    followers_count: number;
    friends_count: number;
    geo_enabled: boolean;
    has_custom_timelines: boolean;
    has_extended_profile: boolean;
    id_str: string;
    is_translator: boolean;
    location: string;
    media_count: number;
    name: string;
    normal_followers_count: number;
    pinned_tweet_ids_str: string[];
    profile_background_color: string;
    profile_banner_url?: string;
    profile_image_url_https: string;
    profile_interstitial_type: string;
    profile_link_color: string;
    protected: boolean;
    screen_name: string;
    statuses_count: number;
    translator_type_enum: TranslatorTypeEnum;
    url?: string;
    verified: boolean;
    withheld_in_countries: any[];
    verified_type?: VerifiedType;
    profile_location_place?: Place;
}

export enum AdvertiserAccountServiceLevel {
    Analytics = "analytics",
    Dso = "dso",
    MediaStudio = "media_studio",
    Mms = "mms",
    SMB = "smb",
    Subscription = "subscription",
}

export enum AdvertiserAccountType {
    AccountUser = "account_user",
    None = "none",
    PromotableUser = "promotable_user",
}

export enum AnalyticsType {
    Disabled = "disabled",
    Enabled = "enabled",
}

export interface PurpleEntities {
    description: Description;
    url?: PurpleURL;
}

export interface Description {
    hashtags: Hashtag[];
    symbols: Hashtag[];
    urls: URLElement[];
    user_mentions: UserMention[];
}

export interface Hashtag {
    indices: number[];
    text: string;
}

export interface URLElement {
    display_url: string;
    expanded_url?: string;
    indices: number[];
    url: string;
}

export interface UserMention {
    id_str: string;
    indices: number[];
    name: string;
    screen_name: string;
}

export interface PurpleURL {
    urls: URLElement[];
}

export interface Place {
    country: string;
    country_code: string;
    full_name: string;
    id: string;
    name: string;
    place_type: string;
    bounding_box?: BoundingBox;
}

export interface BoundingBox {
    coordinates: Array<Array<number[]>>;
    type: string;
}

export enum TranslatorTypeEnum {
    None = "None",
    Regular = "Regular",
}

export enum VerifiedType {
    Business = "Business",
}

export enum ProfileImageShape {
    Circle = "Circle",
    Square = "Square",
}

export interface PurpleEditControl {
    __typename: EditControlTypename;
    edit_tweet_ids?: string[];
    editable_until_msecs?: string;
    edits_remaining?: string;
    is_edit_eligible?: boolean;
    edit_control_initial?: EditControlInitialClass;
    initial_tweet_id?: string;
}

export enum EditControlTypename {
    EditControlEdit = "EditControlEdit",
    EditControlInitial = "EditControlInitial",
}

export interface EditControlInitialClass {
    __typename: EditControlTypename;
    edit_tweet_ids: string[];
    editable_until_msecs: string;
    edits_remaining: string;
    is_edit_eligible: boolean;
}

export interface FluffyLegacy {
    bookmark_count: number;
    bookmarked: boolean;
    conversation_id_str: string;
    created_at: string;
    display_text_range: number[];
    entities: Entit;
    favorite_count: number;
    favorited: boolean;
    full_text: string;
    is_quote_status: boolean;
    lang: Lang;
    quote_count: number;
    quoted_status_id_str?: string;
    reply_count: number;
    retweet_count: number;
    retweeted: boolean;
    user_id_str: string;
    extended_entities?: PurpleExtendedEntities;
    possibly_sensitive?: boolean;
    possibly_sensitive_editable?: boolean;
    retweeted_status_result?: PurpleRetweetedStatusResult;
}

export interface Entit {
    hashtags: Hashtag[];
    symbols: Hashtag[];
    timestamps?: Timestamp[];
    urls: URLElement[];
    user_mentions: UserMention[];
}

export interface Timestamp {
    indices: number[];
    seconds: number;
    text: string;
}

export interface PurpleExtendedEntities {
    media: PurpleMedia[];
}

export interface PurpleMedia {
    allow_download_status?: AllowDownloadStatus;
    display_url: string;
    expanded_url: string;
    ext_media_availability: MediaAvailability;
    features?: PurpleFeatures;
    id_str: string;
    indices: number[];
    media_key: string;
    media_url_https: string;
    original_info: OriginalInfo;
    sizes: Sizes;
    type: Type;
    url: string;
    source_status_id_str?: string;
    source_user_id_str?: string;
    ext_alt_text?: string;
    video_info?: VideoInfo;
    additional_media_info?: PurpleAdditionalMediaInfo;
}

export interface PurpleAdditionalMediaInfo {
    monetizable: boolean;
    graphql_source_user?: PurpleGraphqlSourceUser;
}

export interface PurpleGraphqlSourceUser {
    user_results: UserResultClass;
}

export interface AllowDownloadStatus {
    allow_download: boolean;
}

export interface MediaAvailability {
    status: Status;
}

export enum Status {
    Available = "Available",
}

export interface PurpleFeatures {
    large: FeaturesLarge;
    all?: AllClass;
}

export interface AllClass {
    tags: Tag[];
}

export interface Tag {
    name: string;
    screen_name: string;
    user_id: string;
}

export interface FeaturesLarge {
    faces: FocusRect[];
}

export interface FocusRect {
    h: number;
    w: number;
    x: number;
    y: number;
}

export interface OriginalInfo {
    focus_rects: FocusRect[];
    height: number;
    width: number;
}

export interface Sizes {
    large: SizesLarge;
}

export interface SizesLarge {
    h: number;
    w: number;
}

export enum Type {
    AnimatedGIF = "animated_gif",
    Photo = "photo",
    Video = "video",
}

export interface VideoInfo {
    aspect_ratio: number[];
    variants: Variant[];
    duration_millis?: number;
}

export interface Variant {
    bitrate?: number;
    content_type: ContentType;
    url: string;
}

export enum ContentType {
    ApplicationXMPEGURL = "application/x-mpegURL",
    VideoMp4 = "video/mp4",
}

export enum Lang {
    Art = "art",
    CA = "ca",
    En = "en",
    Es = "es",
    Fr = "fr",
    Hu = "hu",
    Ja = "ja",
    Qht = "qht",
    Qme = "qme",
    Qst = "qst",
    Tl = "tl",
    Und = "und",
    Zh = "zh",
    Zxx = "zxx",
}

export interface PurpleRetweetedStatusResult {
    result: TentacledResult;
}

export interface TentacledResult {
    __typename: TweetDisplayType;
    conversation_muted: boolean;
    core: PurpleCore;
    edit_control: PurpleEditControl;
    is_translatable: boolean;
    legacy: StickyLegacy;
    quick_promote_eligibility: QuickPromoteEligibility;
    rest_id: string;
    unmention_data: UnmentionData;
    view_count_info: ViewCountInfo;
    note_tweet?: PurpleNoteTweet;
    tweet_card?: TweetCard;
    quoted_status_result?: PurpleQuotedStatusResult;
    previous_counts?: PreviousCounts;
    article?: Article;
    community?: PurpleCommunity;
    voice_info?: VoiceInfo;
}

export interface Article {
    article_results: ArticleResults;
}

export interface ArticleResults {
    result: ArticleResultsResult;
}

export interface ArticleResultsResult {
    cover_media_results: CoverMediaResults;
    preview_text: string;
    rest_id: string;
    title: string;
}

export interface CoverMediaResults {
    id: string;
    result: DefaultBannerMedia;
}

export interface DefaultBannerMedia {
    __typename?: string;
    media_availability: MediaAvailability;
    media_id: string;
    media_info: MediaInfo;
    media_key: string;
}

export interface MediaInfo {
    __typename: MediaInfoTypename;
    color_info: ColorInfo;
    original_img_height: number;
    original_img_url: string;
    original_img_width: number;
    salient_rect?: SalientRect;
}

export enum MediaInfoTypename {
    APIImage = "ApiImage",
}

export interface ColorInfo {
    palette: Palette[];
}

export interface Palette {
    percentage: number;
    rgb: RGB;
}

export interface RGB {
    blue: number;
    green: number;
    red: number;
}

export interface SalientRect {
    height: number;
    left: number;
    top: number;
    width: number;
}

export interface PurpleCommunity {
    access: string;
    actions: Actions;
    admin_results: AdminResults;
    created_at: number;
    creator_results: AdminResults;
    custom_banner_media: CustomBannerMedia;
    custom_theme: string;
    default_banner_media: DefaultBannerMedia;
    default_theme: string;
    description: string;
    invites_policy: string;
    invites_result: InvitesResultClass;
    is_nsfw: boolean;
    is_pinned: boolean;
    join_policy: string;
    join_requests_result: InvitesResultClass;
    member_count: number;
    members_facepile_results: UserResultElement[];
    moderator_count: number;
    name: NameEnum;
    new_tweet_count_since_last_viewed: number;
    primary_community_topic: PrimaryCommunityTopic;
    rest_id: string;
    role: string;
    rules: Rule[];
    search_tags: any[];
    trending_hashtags_slice: TrendingHashtagsSlice;
}

export interface Actions {
    __typename: string;
    community_spotlight_setup_action_result: CommunitySpotlightSetupActionResult;
    join_action_result: InvitesResultClass;
    leave_action_result: InvitesResultClass;
}

export interface CommunitySpotlightSetupActionResult {
    __typename: string;
    deeplink: string;
}

export interface InvitesResultClass {
    __typename: InvitesResultTypename;
    message: Message;
    reason: Reason;
}

export enum InvitesResultTypename {
    CommunityInvitesUnavailable = "CommunityInvitesUnavailable",
    CommunityJoinActionUnavailable = "CommunityJoinActionUnavailable",
    CommunityJoinRequestsUnavailable = "CommunityJoinRequestsUnavailable",
    CommunityLeaveActionUnavailable = "CommunityLeaveActionUnavailable",
}

export enum Message {
    MustBeAMemberOfTheCommunityToInviteOthers = "Must be a member of the Community to invite others.",
    NotAMember = "Not a member.",
    ViewerIsNotAuthorized = "Viewer is not authorized.",
    YourAccountStateIsNotValid = "Your account state is not valid.",
}

export enum Reason {
    Unavailable = "Unavailable",
    ViewerNotMember = "ViewerNotMember",
}

export interface AdminResults {
    result?: AdminResultsResult;
}

export interface AdminResultsResult {
    __typename: UserDisplayType;
    affiliates_highlighted_label: UnmentionData;
    exclusive_tweet_following: boolean;
    is_blue_verified: boolean;
    legacy: TentacledLegacy;
    private_super_following: boolean;
    profile_image_shape: ProfileImageShape;
    rest_id: string;
    super_follow_eligible: boolean;
    super_followed_by: boolean;
    super_following: boolean;
}

export interface UnmentionData {
}

export interface TentacledLegacy {
    advertiser_account_service_levels: AdvertiserAccountServiceLevel[];
    advertiser_account_type: AdvertiserAccountType;
    analytics_type: AnalyticsType;
    can_dm: boolean;
    can_media_tag: boolean;
    created_at: string;
    description: string;
    entities: FluffyEntities;
    fast_followers_count: number;
    favourites_count: number;
    followers_count: number;
    friends_count: number;
    geo_enabled: boolean;
    has_custom_timelines: boolean;
    has_extended_profile: boolean;
    id_str: string;
    is_translator: boolean;
    location: string;
    media_count: number;
    name: string;
    normal_followers_count: number;
    pinned_tweet_ids_str: string[];
    profile_background_color: ProfileBackgroundColor;
    profile_banner_url: string;
    profile_image_url_https: string;
    profile_interstitial_type: string;
    profile_link_color: PurpleProfileLinkColor;
    protected: boolean;
    screen_name: string;
    statuses_count: number;
    translator_type_enum: TranslatorTypeEnum;
    verified: boolean;
    withheld_in_countries: any[];
}

export interface FluffyEntities {
    description: Description;
}

export enum ProfileBackgroundColor {
    F5F8Fa = "F5F8FA",
    The000000 = "000000",
}

export enum PurpleProfileLinkColor {
    The1Da1F2 = "1DA1F2",
    The9266Cc = "9266CC",
}

export interface CustomBannerMedia {
    media_id: string;
    media_info: MediaInfo;
    media_key: string;
}

export interface UserResultElement {
    result: StickyResult;
}

export interface StickyResult {
    __typename: UserDisplayType;
    affiliates_highlighted_label: UnmentionData;
    exclusive_tweet_following: boolean;
    is_blue_verified: boolean;
    legacy: PurpleLegacy;
    private_super_following: boolean;
    profile_image_shape: ProfileImageShape;
    rest_id: string;
    super_follow_eligible: boolean;
    super_followed_by: boolean;
    super_following: boolean;
}

export enum NameEnum {
    Bitcoin = "Bitcoin",
    Pinned = "Pinned",
}

export interface PrimaryCommunityTopic {
    topic_id: string;
    topic_name: string;
}

export interface Rule {
    name: RuleName;
    rest_id: string;
}

export enum RuleName {
    BeKindAndRespectful = "Be kind and respectful.",
    ExploreAndShare = "Explore and share.",
    KeepPostsOnTopic = "Keep posts on topic.",
    KeepTweetsOnTopic = "Keep Tweets on topic.",
}

export interface TrendingHashtagsSlice {
    items: any[];
}

export interface StickyLegacy {
    bookmark_count: number;
    bookmarked: boolean;
    conversation_id_str: string;
    created_at: string;
    display_text_range: number[];
    entities: Entit;
    extended_entities?: FluffyExtendedEntities;
    favorite_count: number;
    favorited: boolean;
    full_text: string;
    is_quote_status: boolean;
    lang: Lang;
    possibly_sensitive?: boolean;
    possibly_sensitive_editable?: boolean;
    quote_count: number;
    reply_count: number;
    retweet_count: number;
    retweeted: boolean;
    user_id_str: string;
    in_reply_to_screen_name?: string;
    in_reply_to_status_id_str?: string;
    in_reply_to_user_id_str?: string;
    quoted_status_id_str?: string;
}

export interface FluffyExtendedEntities {
    media: FluffyMedia[];
}

export interface FluffyMedia {
    additional_media_info?: FluffyAdditionalMediaInfo;
    allow_download_status?: AllowDownloadStatus;
    display_url: string;
    expanded_url: string;
    ext_media_availability: MediaAvailability;
    id_str: string;
    indices: number[];
    media_key: string;
    media_url_https: string;
    original_info: OriginalInfo;
    sizes: Sizes;
    type: Type;
    url: string;
    video_info?: VideoInfo;
    features?: PurpleFeatures;
    ext_alt_text?: string;
    source_status_id_str?: string;
    source_user_id_str?: string;
}

export interface FluffyAdditionalMediaInfo {
    monetizable: boolean;
    graphql_source_user?: FluffyGraphqlSourceUser;
}

export interface FluffyGraphqlSourceUser {
    user_results: UserResults;
}

export interface UserResults {
    result: IndigoResult;
}

export interface IndigoResult {
    __typename: UserDisplayType;
    affiliates_highlighted_label: UnmentionData;
    exclusive_tweet_following: boolean;
    is_blue_verified: boolean;
    legacy: IndigoLegacy;
    private_super_following: boolean;
    profile_image_shape: ProfileImageShape;
    rest_id: string;
    super_follow_eligible: boolean;
    super_followed_by: boolean;
    super_following: boolean;
}

export interface IndigoLegacy {
    advertiser_account_service_levels: AdvertiserAccountServiceLevel[];
    advertiser_account_type: AdvertiserAccountType;
    analytics_type: AnalyticsType;
    can_dm: boolean;
    can_media_tag: boolean;
    created_at: string;
    description: string;
    entities: PurpleEntities;
    fast_followers_count: number;
    favourites_count: number;
    followers_count: number;
    friends_count: number;
    geo_enabled: boolean;
    has_custom_timelines: boolean;
    has_extended_profile: boolean;
    id_str: string;
    is_translator: boolean;
    location: string;
    media_count: number;
    name: string;
    normal_followers_count: number;
    pinned_tweet_ids_str: string[];
    profile_background_color: string;
    profile_banner_url?: string;
    profile_image_url_https: string;
    profile_interstitial_type: string;
    profile_link_color: FluffyProfileLinkColor;
    protected: boolean;
    screen_name: string;
    statuses_count: number;
    translator_type_enum: TranslatorTypeEnum;
    url: string;
    verified: boolean;
    withheld_in_countries: any[];
    verified_type?: VerifiedType;
}

export enum FluffyProfileLinkColor {
    Ffa207 = "FFA207",
    The009999 = "009999",
    The1Da1F2 = "1DA1F2",
    The3B94D9 = "3B94D9",
}

export interface PurpleNoteTweet {
    is_expandable: boolean;
    note_tweet_results: PurpleNoteTweetResults;
}

export interface PurpleNoteTweetResults {
    id: string;
    result: IndecentResult;
}

export interface IndecentResult {
    __typename: ResultTypename;
    entity_set: Entit;
    id: string;
    media?: ResultMedia;
    richtext?: Richtext;
    text: string;
}

export enum ResultTypename {
    NoteTweet = "NoteTweet",
}

export interface ResultMedia {
    inline_media: InlineMedia[];
}

export interface InlineMedia {
    index: number;
    media_id: string;
}

export interface Richtext {
    richtext_tags: RichtextTag[];
}

export interface RichtextTag {
    from_index: number;
    richtext_types: RichtextType[];
    to_index: number;
}

export enum RichtextType {
    Bold = "Bold",
    Italic = "Italic",
}

export interface PreviousCounts {
    favorite_count: number;
    quote_count: number;
    reply_count: number;
}

export interface QuickPromoteEligibility {
    eligibility: Eligibility;
}

export enum Eligibility {
    IneligibleNotProfessional = "IneligibleNotProfessional",
}

export interface PurpleQuotedStatusResult {
    result: HilariousResult;
}

export interface HilariousResult {
    __typename: TweetDisplayType;
    conversation_muted: boolean;
    core: PurpleCore;
    edit_control: EditControlInitialClass;
    is_translatable: boolean;
    legacy: IndecentLegacy;
    quick_promote_eligibility: QuickPromoteEligibility;
    rest_id: string;
    unmention_data: UnmentionData;
    view_count_info: ViewCountInfo;
    article?: Article;
    note_tweet?: FluffyNoteTweet;
}

export interface IndecentLegacy {
    bookmark_count: number;
    bookmarked: boolean;
    conversation_id_str: string;
    created_at: string;
    display_text_range: number[];
    entities: Entit;
    extended_entities?: TentacledExtendedEntities;
    favorite_count: number;
    favorited: boolean;
    full_text: string;
    is_quote_status: boolean;
    lang: Lang;
    possibly_sensitive?: boolean;
    possibly_sensitive_editable?: boolean;
    quote_count: number;
    reply_count: number;
    retweet_count: number;
    retweeted: boolean;
    user_id_str: string;
    in_reply_to_screen_name?: string;
    in_reply_to_status_id_str?: string;
    in_reply_to_user_id_str?: string;
    quoted_status_id_str?: string;
}

export interface TentacledExtendedEntities {
    media: TentacledMedia[];
}

export interface TentacledMedia {
    display_url: string;
    expanded_url: string;
    ext_media_availability: MediaAvailability;
    features?: PurpleFeatures;
    id_str: string;
    indices: number[];
    media_key: string;
    media_url_https: string;
    original_info: OriginalInfo;
    sizes: Sizes;
    type: Type;
    url: string;
    additional_media_info?: TentacledAdditionalMediaInfo;
    allow_download_status?: AllowDownloadStatus;
    video_info?: VideoInfo;
}

export interface TentacledAdditionalMediaInfo {
    monetizable: boolean;
}

export interface FluffyNoteTweet {
    is_expandable: boolean;
    note_tweet_results: FluffyNoteTweetResults;
}

export interface FluffyNoteTweetResults {
    id: string;
    result: AmbitiousResult;
}

export interface AmbitiousResult {
    __typename: ResultTypename;
    entity_set: Entit;
    id: string;
    text: string;
}

export interface ViewCountInfo {
    count?: string;
    state: State;
}

export enum State {
    Enabled = "Enabled",
    EnabledWithCount = "EnabledWithCount",
}

export interface TweetCard {
    legacy: TweetCardLegacy;
}

export interface TweetCardLegacy {
    binding_values: BindingValue[];
    card_platform: CardPlatform;
    name: LegacyName;
    url: string;
    user_refs_results: UserRefsResult[];
}

export interface BindingValue {
    key: string;
    value: Value;
}

export interface Value {
    image_value?: ImageValue;
    string_value?: string;
    scribe_key?: ScribeKey;
    user_value?: UserValue;
    boolean_value?: boolean;
}

export interface ImageValue {
    height: number;
    url: string;
    width: number;
    alt?: Alt;
}

export enum Alt {
    BackpackExchangeLogo = "Backpack Exchange Logo",
}

export enum ScribeKey {
    CardURL = "card_url",
    PublisherID = "publisher_id",
    VanityURL = "vanity_url",
}

export interface UserValue {
    id_str: string;
}

export interface CardPlatform {
    platform: Platform;
}

export interface Platform {
    audience: Audience;
}

export interface Audience {
    name: AudienceName;
}

export enum AudienceName {
    Production = "production",
}

export enum LegacyName {
    Poll2ChoiceTextOnly = "poll2choice_text_only",
    Summary = "summary",
    SummaryLargeImage = "summary_large_image",
    The3691233323Audiospace = "3691233323:audiospace",
    The745291183405076480Broadcast = "745291183405076480:broadcast",
}

export interface UserRefsResult {
    result: UserRefsResultResult;
}

export interface UserRefsResultResult {
    __typename: UserDisplayType;
    legacy?: HilariousLegacy;
}

export interface HilariousLegacy {
    can_dm: boolean;
    can_media_tag: boolean;
    id_str: string;
    name: string;
    profile_image_url_https: string;
    protected: boolean;
    screen_name: string;
    verified: boolean;
}

export interface VoiceInfo {
    audio_space_id: string;
    audio_space_title: string;
}

export interface LimitedActionResults {
    limited_actions: LimitedAction[];
}

export interface LimitedAction {
    gqlLimitedActionType: string;
    gqlPrompt: GqlPrompt;
}

export interface GqlPrompt {
    __typename: string;
    gqlCtaType: string;
    headline: Headline;
    subtext: Headline;
}

export interface Headline {
    entities: any[];
    text: HeadlineText;
}

export enum HeadlineText {
    PeopleTheAuthorMentionedCanReply = "People the author mentioned can reply",
    WhoCanReply = "Who can reply?",
}

export interface FluffyQuotedStatusResult {
    result?: CunningResult;
}

export interface CunningResult {
    __typename: TweetDisplayType;
    conversation_muted: boolean;
    core: PurpleCore;
    edit_control: PurpleEditControl;
    is_translatable: boolean;
    legacy: AmbitiousLegacy;
    quick_promote_eligibility: QuickPromoteEligibility;
    rest_id: string;
    unmention_data: UnmentionData;
    view_count_info: ViewCountInfo;
    note_tweet?: PurpleNoteTweet;
    article?: Article;
    community?: FluffyCommunity;
    tweet_card?: TweetCard;
    voice_info?: VoiceInfo;
    previous_counts?: PreviousCounts;
}

export interface FluffyCommunity {
    access: string;
    actions: Actions;
    admin_results: AdminResults;
    created_at: number;
    creator_results: AdminResults;
    custom_banner_media: CustomBannerMedia;
    default_banner_media: DefaultBannerMedia;
    default_theme: string;
    description: string;
    invites_policy: string;
    invites_result: InvitesResultClass;
    is_nsfw: boolean;
    is_pinned: boolean;
    join_policy: string;
    join_requests_result: InvitesResultClass;
    member_count: number;
    members_facepile_results: AdminResults[];
    moderator_count: number;
    name: string;
    new_tweet_count_since_last_viewed: number;
    question: string;
    rest_id: string;
    role: string;
    rules: Rule[];
    search_tags: any[];
    trending_hashtags_slice: TrendingHashtagsSlice;
}

export interface AmbitiousLegacy {
    bookmark_count: number;
    bookmarked: boolean;
    conversation_id_str: string;
    created_at: string;
    display_text_range: number[];
    entities: Entit;
    favorite_count: number;
    favorited: boolean;
    full_text: string;
    is_quote_status: boolean;
    lang: Lang;
    quote_count: number;
    reply_count: number;
    retweet_count: number;
    retweeted: boolean;
    user_id_str: string;
    extended_entities?: StickyExtendedEntities;
    possibly_sensitive?: boolean;
    possibly_sensitive_editable?: boolean;
    quoted_status_id_str?: string;
    in_reply_to_screen_name?: string;
    in_reply_to_status_id_str?: string;
    in_reply_to_user_id_str?: string;
    place?: Place;
}

export interface StickyExtendedEntities {
    media: StickyMedia[];
}

export interface StickyMedia {
    allow_download_status?: AllowDownloadStatus;
    display_url: string;
    expanded_url: string;
    ext_media_availability: MediaAvailability;
    features?: PurpleFeatures;
    id_str: string;
    indices: number[];
    media_key: string;
    media_url_https: string;
    original_info: OriginalInfo;
    sizes: Sizes;
    type: Type;
    url: string;
    additional_media_info?: FluffyAdditionalMediaInfo;
    video_info?: VideoInfo;
    source_status_id_str?: string;
    source_user_id_str?: string;
}

export interface PurpleTweet {
    conversation_muted: boolean;
    core: FluffyCore;
    edit_control: EditControlInitialClass;
    is_translatable: boolean;
    legacy: CunningLegacy;
    quick_promote_eligibility: QuickPromoteEligibility;
    rest_id: string;
    unmention_data: UnmentionData;
    view_count_info: ViewCountInfo;
}

export interface FluffyCore {
    user_result: UserResultElement;
}

export interface CunningLegacy {
    bookmark_count: number;
    bookmarked: boolean;
    conversation_control: ConversationControl;
    conversation_id_str: string;
    created_at: string;
    display_text_range: number[];
    entities: Entit;
    favorite_count: number;
    favorited: boolean;
    full_text: string;
    is_quote_status: boolean;
    lang: Lang;
    quote_count: number;
    reply_count: number;
    retweet_count: number;
    retweeted: boolean;
    retweeted_status_result?: FluffyRetweetedStatusResult;
    user_id_str: string;
    quoted_status_id_str?: string;
    extended_entities?: IndigoExtendedEntities;
    possibly_sensitive?: boolean;
    possibly_sensitive_editable?: boolean;
}

export interface ConversationControl {
    conversation_owner: ConversationOwner;
    policy: string;
}

export interface ConversationOwner {
    legacy: ConversationOwnerLegacy;
}

export interface ConversationOwnerLegacy {
    screen_name: string;
}

export interface IndigoExtendedEntities {
    media: IndigoMedia[];
}

export interface IndigoMedia {
    display_url: string;
    expanded_url: string;
    ext_media_availability: MediaAvailability;
    features: FluffyFeatures;
    id_str: string;
    indices: number[];
    media_key: string;
    media_url_https: string;
    original_info: OriginalInfo;
    sizes: Sizes;
    source_status_id_str?: string;
    source_user_id_str?: string;
    type: Type;
    url: string;
    allow_download_status?: AllowDownloadStatus;
}

export interface FluffyFeatures {
    large: FeaturesLarge;
}

export interface FluffyRetweetedStatusResult {
    result: MagentaResult;
}

export interface MagentaResult {
    __typename: TweetDisplayType;
    limited_action_results: LimitedActionResults;
    tweet: FluffyTweet;
}

export interface FluffyTweet {
    conversation_muted: boolean;
    core: TentacledCore;
    edit_control: EditControlInitialClass;
    is_translatable: boolean;
    legacy: MagentaLegacy;
    quick_promote_eligibility: QuickPromoteEligibility;
    rest_id: string;
    unmention_data: UnmentionData;
    view_count_info: ViewCountInfo;
}

export interface TentacledCore {
    user_result: PurpleUserResult;
}

export interface PurpleUserResult {
    result: FriskyResult;
}

export interface FriskyResult {
    __typename: UserDisplayType;
    affiliates_highlighted_label: AffiliatesHighlightedLabel;
    exclusive_tweet_following: boolean;
    is_blue_verified: boolean;
    legacy: IndigoLegacy;
    private_super_following: boolean;
    profile_image_shape: ProfileImageShape;
    rest_id: string;
    super_follow_eligible: boolean;
    super_followed_by: boolean;
    super_following: boolean;
}

export interface MagentaLegacy {
    bookmark_count: number;
    bookmarked: boolean;
    conversation_control: ConversationControl;
    conversation_id_str: string;
    created_at: string;
    display_text_range: number[];
    entities: Entit;
    favorite_count: number;
    favorited: boolean;
    full_text: string;
    is_quote_status: boolean;
    lang: Lang;
    quote_count: number;
    reply_count: number;
    retweet_count: number;
    retweeted: boolean;
    user_id_str: string;
    quoted_status_id_str?: string;
    extended_entities?: IndigoExtendedEntities;
    possibly_sensitive?: boolean;
    possibly_sensitive_editable?: boolean;
}

export enum CursorType {
    Bottom = "Bottom",
    Top = "Top",
}

export interface Footer {
    displayType: DisplayType;
    landingUrl: LandingURLClass;
    text: FooterText;
}

export enum DisplayType {
    Classic = "Classic",
}

export enum FooterText {
    ShowMore = "Show more",
}

export interface Header {
    sticky: boolean;
    text: HeaderText;
}

export enum HeaderText {
    WhoToFollow = "Who to follow",
}

export interface ItemElement {
    entryId: string;
    item: ItemItem;
    dispensable?: boolean;
}

export interface ItemItem {
    clientEventInfo: ItemClientEventInfo;
    content: ItemContent;
}

export interface ItemContent {
    __typename: FluffyTypename;
    userDisplayType?: UserDisplayType;
    userResult?: UserResultClass;
    tweetDisplayType?: TweetDisplayType;
    tweetResult?: FluffyTweetResult;
    socialContext?: SocialContext;
}

export interface SocialContext {
    __typename: SocialContextTypename;
    contextType: ContextType;
    landingUrl?: LandingURLClass;
    text: NameEnum;
}

export enum SocialContextTypename {
    TimelineGeneralContext = "TimelineGeneralContext",
}

export enum ContextType {
    Community = "Community",
    Pin = "Pin",
}

export interface FluffyTweetResult {
    result: MischievousResult;
}

export interface MischievousResult {
    __typename: TweetDisplayType;
    conversation_muted: boolean;
    core: PurpleCore;
    edit_control: EditControlInitialClass;
    is_translatable: boolean;
    legacy: IndecentLegacy;
    quick_promote_eligibility: QuickPromoteEligibility;
    rest_id: string;
    unmention_data: UnmentionData;
    view_count_info: ViewCountInfo;
    quoted_status_result?: TentacledQuotedStatusResult;
    tweet_card?: TweetCard;
    note_tweet?: PurpleNoteTweet;
    community?: PurpleCommunity;
}

export interface TentacledQuotedStatusResult {
    result: BraggadociousResult;
}

export interface BraggadociousResult {
    __typename: TweetDisplayType;
    conversation_muted: boolean;
    core: TentacledCore;
    edit_control: EditControlInitialClass;
    is_translatable: boolean;
    legacy: IndecentLegacy;
    note_tweet?: PurpleNoteTweet;
    quick_promote_eligibility: QuickPromoteEligibility;
    rest_id: string;
    unmention_data: UnmentionData;
    view_count_info: ViewCountInfo;
}

export interface ContentMetadata {
    conversationMetadata: ConversationMetadata;
}

export interface ConversationMetadata {
    allTweetIds: string[];
    enableDeduplication: boolean;
}

export enum ModuleDisplayType {
    Carousel = "Carousel",
    VerticalConversation = "VerticalConversation",
}

export interface PurpleEntry {
    content: TentacledContent;
    entryId: string;
    sortIndex: string;
}

export interface TentacledContent {
    __typename: PurpleTypename;
    clientEventInfo: PurpleClientEventInfo;
    content: StickyContent;
}

export interface PurpleClientEventInfo {
    component: Component;
    element: Ent;
}

export enum Component {
    PinnedTweets = "pinned_tweets",
}

export interface StickyContent {
    __typename: FluffyTypename;
    socialContext: SocialContext;
    tweetDisplayType: TweetDisplayType;
    tweetResult: TentacledTweetResult;
}

export interface TentacledTweetResult {
    result: Result1;
}

export interface Result1 {
    __typename: TweetDisplayType;
    conversation_muted: boolean;
    core: PurpleCore;
    edit_control: EditControlInitialClass;
    is_translatable: boolean;
    legacy: IndecentLegacy;
    note_tweet?: PurpleNoteTweet;
    quick_promote_eligibility: QuickPromoteEligibility;
    rest_id: string;
    unmention_data: UnmentionData;
    view_count_info: ViewCountInfo;
    quoted_status_result?: StickyQuotedStatusResult;
}

export interface StickyQuotedStatusResult {
    result: Result2;
}

export interface Result2 {
    __typename: TweetDisplayType;
    conversation_muted: boolean;
    core: TentacledCore;
    edit_control: EditControlInitialClass;
    is_translatable: boolean;
    legacy: FriskyLegacy;
    note_tweet: PurpleNoteTweet;
    quick_promote_eligibility: QuickPromoteEligibility;
    rest_id: string;
    unmention_data: UnmentionData;
    view_count_info: ViewCountInfo;
}

export interface FriskyLegacy {
    bookmark_count: number;
    bookmarked: boolean;
    conversation_id_str: string;
    created_at: string;
    display_text_range: number[];
    entities: Entit;
    extended_entities?: IndigoExtendedEntities;
    favorite_count: number;
    favorited: boolean;
    full_text: string;
    is_quote_status: boolean;
    lang: Lang;
    possibly_sensitive?: boolean;
    possibly_sensitive_editable?: boolean;
    quote_count: number;
    quoted_status_id_str: string;
    reply_count: number;
    retweet_count: number;
    retweeted: boolean;
    user_id_str: string;
}

export interface TimelineMetadata {
    scribeConfig: ScribeConfig;
}

export interface ScribeConfig {
    page: Page;
}

export enum Page {
    ProfileBest = "profileBest",
}

// Define an interface for the single tweet API response, reusing existing types
export interface TweetApiResponse {
    data?: {
        tweet_result?: {
            result?: {
                __typename?: TweetDisplayType; // Reusing enum from UserTweets.ts
                legacy?: Pick<FluffyLegacy, 'full_text' | 'created_at'>; // Picking required fields
                core?: {
                    user_result?: {
                        result?: {
                            __typename?: UserDisplayType; // Reusing enum from UserTweets.ts
                            legacy?: Pick<PurpleLegacy, 'screen_name'>; // Picking required field
                        };
                    };
                };
            };
        };
    };
    success?: boolean; // For success/error status
    error?: string;
}

export interface User {
    followers: number;
    following: number;
    id: string;
    name: string;
    profile_image_url: string;
    username: string;
}

export interface Media {
    display_url: string;
    expanded_url: string;
    type: string;
    url: string;
    conversation_id_str: string;
    screen_name: string;
}

export type Tweet = {
    text: string;
    date: string;
    user: string;
}

export type ErrorResponse = {
    success: boolean;
    error: string;
}