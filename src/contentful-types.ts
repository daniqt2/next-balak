export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Circle: { input: any; output: any; }
  DateTime: { input: string; output: string; }
  Dimension: { input: any; output: any; }
  HexColor: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Quality: { input: any; output: any; }
  Rectangle: { input: any; output: any; }
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  collCollection?: Maybe<CollCollection>;
  customAssetCollection?: Maybe<CustomAssetCollection>;
  entryCollection?: Maybe<EntryCollection>;
  interestSpotCollection?: Maybe<InterestSpotCollection>;
  routeCollection?: Maybe<RouteCollection>;
  routeGroupCollection?: Maybe<RouteGroupCollection>;
};


export type AssetLinkingCollectionsCollCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsCustomAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsInterestSpotCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsRouteCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsRouteGroupCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/coll) */
export type Coll = Entry & _Node & {
  __typename?: 'Coll';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<CollDescription>;
  header?: Maybe<Asset>;
  imagesCollection?: Maybe<AssetCollection>;
  linkedFrom?: Maybe<CollLinkingCollections>;
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  variantsCollection?: Maybe<CollVariantsCollection>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/coll) */
export type CollDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/coll) */
export type CollHeaderArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/coll) */
export type CollImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/coll) */
export type CollLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/coll) */
export type CollLocationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/coll) */
export type CollNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/coll) */
export type CollSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/coll) */
export type CollVariantsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CollCollection = {
  __typename?: 'CollCollection';
  items: Array<Maybe<Coll>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CollDescription = {
  __typename?: 'CollDescription';
  json: Scalars['JSON']['output'];
  links: CollDescriptionLinks;
};

export type CollDescriptionAssets = {
  __typename?: 'CollDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type CollDescriptionEntries = {
  __typename?: 'CollDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type CollDescriptionLinks = {
  __typename?: 'CollDescriptionLinks';
  assets: CollDescriptionAssets;
  entries: CollDescriptionEntries;
  resources: CollDescriptionResources;
};

export type CollDescriptionResources = {
  __typename?: 'CollDescriptionResources';
  block: Array<CollDescriptionResourcesBlock>;
  hyperlink: Array<CollDescriptionResourcesHyperlink>;
  inline: Array<CollDescriptionResourcesInline>;
};

export type CollDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'CollDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type CollDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'CollDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type CollDescriptionResourcesInline = ResourceLink & {
  __typename?: 'CollDescriptionResourcesInline';
  sys: ResourceSys;
};

export type CollFilter = {
  AND?: InputMaybe<Array<InputMaybe<CollFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CollFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  header_exists?: InputMaybe<Scalars['Boolean']['input']>;
  imagesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  location_exists?: InputMaybe<Scalars['Boolean']['input']>;
  location_within_circle?: InputMaybe<Scalars['Circle']['input']>;
  location_within_rectangle?: InputMaybe<Scalars['Rectangle']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  variantsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CollLinkingCollections = {
  __typename?: 'CollLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type CollLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum CollOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/collVariant) */
export type CollVariant = Entry & _Node & {
  __typename?: 'CollVariant';
  _id: Scalars['ID']['output'];
  accumulatedHeight?: Maybe<Scalars['Float']['output']>;
  contentfulMetadata: ContentfulMetadata;
  difficulty?: Maybe<Scalars['String']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  linkedFrom?: Maybe<CollVariantLinkingCollections>;
  slopePercentage?: Maybe<Scalars['Float']['output']>;
  startLocation?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/collVariant) */
export type CollVariantAccumulatedHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/collVariant) */
export type CollVariantDifficultyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/collVariant) */
export type CollVariantInternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/collVariant) */
export type CollVariantLengthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/collVariant) */
export type CollVariantLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/collVariant) */
export type CollVariantSlopePercentageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/collVariant) */
export type CollVariantStartLocationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CollVariantCollection = {
  __typename?: 'CollVariantCollection';
  items: Array<Maybe<CollVariant>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CollVariantFilter = {
  AND?: InputMaybe<Array<InputMaybe<CollVariantFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CollVariantFilter>>>;
  accumulatedHeight?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_exists?: InputMaybe<Scalars['Boolean']['input']>;
  accumulatedHeight_gt?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_gte?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  accumulatedHeight_lt?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_lte?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_not?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  difficulty_contains?: InputMaybe<Scalars['String']['input']>;
  difficulty_exists?: InputMaybe<Scalars['Boolean']['input']>;
  difficulty_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  difficulty_not?: InputMaybe<Scalars['String']['input']>;
  difficulty_not_contains?: InputMaybe<Scalars['String']['input']>;
  difficulty_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  length?: InputMaybe<Scalars['Float']['input']>;
  length_exists?: InputMaybe<Scalars['Boolean']['input']>;
  length_gt?: InputMaybe<Scalars['Float']['input']>;
  length_gte?: InputMaybe<Scalars['Float']['input']>;
  length_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  length_lt?: InputMaybe<Scalars['Float']['input']>;
  length_lte?: InputMaybe<Scalars['Float']['input']>;
  length_not?: InputMaybe<Scalars['Float']['input']>;
  length_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  slopePercentage?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slopePercentage_gt?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_gte?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  slopePercentage_lt?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_lte?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_not?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  startLocation_contains?: InputMaybe<Scalars['String']['input']>;
  startLocation_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startLocation_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startLocation_not?: InputMaybe<Scalars['String']['input']>;
  startLocation_not_contains?: InputMaybe<Scalars['String']['input']>;
  startLocation_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CollVariantLinkingCollections = {
  __typename?: 'CollVariantLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  routeCollection?: Maybe<RouteCollection>;
};


export type CollVariantLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CollVariantLinkingCollectionsRouteCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<CollVariantLinkingCollectionsRouteCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum CollVariantLinkingCollectionsRouteCollectionOrder {
  ElevationAsc = 'elevation_ASC',
  ElevationDesc = 'elevation_DESC',
  EndLocationNameAsc = 'endLocationName_ASC',
  EndLocationNameDesc = 'endLocationName_DESC',
  LengthAsc = 'length_ASC',
  LengthDesc = 'length_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  StartLocationNameAsc = 'startLocationName_ASC',
  StartLocationNameDesc = 'startLocationName_DESC',
  StravaIdAsc = 'stravaId_ASC',
  StravaIdDesc = 'stravaId_DESC',
  StravaLinkAsc = 'stravaLink_ASC',
  StravaLinkDesc = 'stravaLink_DESC',
  SubTitleAsc = 'subTitle_ASC',
  SubTitleDesc = 'subTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TimeAsc = 'time_ASC',
  TimeDesc = 'time_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum CollVariantOrder {
  AccumulatedHeightAsc = 'accumulatedHeight_ASC',
  AccumulatedHeightDesc = 'accumulatedHeight_DESC',
  DifficultyAsc = 'difficulty_ASC',
  DifficultyDesc = 'difficulty_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  LengthAsc = 'length_ASC',
  LengthDesc = 'length_DESC',
  SlopePercentageAsc = 'slopePercentage_ASC',
  SlopePercentageDesc = 'slopePercentage_DESC',
  StartLocationAsc = 'startLocation_ASC',
  StartLocationDesc = 'startLocation_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type CollVariantsCollection = {
  __typename?: 'CollVariantsCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  concepts: Array<Maybe<TaxonomyConcept>>;
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataConceptsFilter = {
  descendants?: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataFilter = {
  concepts?: InputMaybe<ContentfulMetadataConceptsFilter>;
  concepts_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/customAsset) */
export type CustomAsset = Entry & _Node & {
  __typename?: 'CustomAsset';
  _id: Scalars['ID']['output'];
  asset?: Maybe<Asset>;
  bottomText?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<CustomAssetLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/customAsset) */
export type CustomAssetAssetArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/customAsset) */
export type CustomAssetBottomTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/customAsset) */
export type CustomAssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/customAsset) */
export type CustomAssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/customAsset) */
export type CustomAssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CustomAssetCollection = {
  __typename?: 'CustomAssetCollection';
  items: Array<Maybe<CustomAsset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CustomAssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<CustomAssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CustomAssetFilter>>>;
  asset_exists?: InputMaybe<Scalars['Boolean']['input']>;
  bottomText?: InputMaybe<Scalars['String']['input']>;
  bottomText_contains?: InputMaybe<Scalars['String']['input']>;
  bottomText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  bottomText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bottomText_not?: InputMaybe<Scalars['String']['input']>;
  bottomText_not_contains?: InputMaybe<Scalars['String']['input']>;
  bottomText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CustomAssetLinkingCollections = {
  __typename?: 'CustomAssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type CustomAssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum CustomAssetOrder {
  BottomTextAsc = 'bottomText_ASC',
  BottomTextDesc = 'bottomText_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  /** AVIF image format. */
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpot = Entry & _Node & {
  __typename?: 'InterestSpot';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fullDescription?: Maybe<InterestSpotFullDescription>;
  headerImage?: Maybe<Asset>;
  linkedFrom?: Maybe<InterestSpotLinkingCollections>;
  location?: Maybe<Location>;
  locationName?: Maybe<Scalars['String']['output']>;
  services?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  stopType?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpotDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpotFullDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpotHeaderImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpotLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpotLocationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpotLocationNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpotServicesArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpotStopTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpotTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/interestSpot) */
export type InterestSpotTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InterestSpotCollection = {
  __typename?: 'InterestSpotCollection';
  items: Array<Maybe<InterestSpot>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type InterestSpotFilter = {
  AND?: InputMaybe<Array<InputMaybe<InterestSpotFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<InterestSpotFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fullDescription_contains?: InputMaybe<Scalars['String']['input']>;
  fullDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fullDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  headerImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  locationName_contains?: InputMaybe<Scalars['String']['input']>;
  locationName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  locationName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  locationName_not?: InputMaybe<Scalars['String']['input']>;
  locationName_not_contains?: InputMaybe<Scalars['String']['input']>;
  locationName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  location_exists?: InputMaybe<Scalars['Boolean']['input']>;
  location_within_circle?: InputMaybe<Scalars['Circle']['input']>;
  location_within_rectangle?: InputMaybe<Scalars['Rectangle']['input']>;
  services_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  services_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  services_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  services_exists?: InputMaybe<Scalars['Boolean']['input']>;
  stopType?: InputMaybe<Scalars['String']['input']>;
  stopType_contains?: InputMaybe<Scalars['String']['input']>;
  stopType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  stopType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stopType_not?: InputMaybe<Scalars['String']['input']>;
  stopType_not_contains?: InputMaybe<Scalars['String']['input']>;
  stopType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InterestSpotFullDescription = {
  __typename?: 'InterestSpotFullDescription';
  json: Scalars['JSON']['output'];
  links: InterestSpotFullDescriptionLinks;
};

export type InterestSpotFullDescriptionAssets = {
  __typename?: 'InterestSpotFullDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type InterestSpotFullDescriptionEntries = {
  __typename?: 'InterestSpotFullDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type InterestSpotFullDescriptionLinks = {
  __typename?: 'InterestSpotFullDescriptionLinks';
  assets: InterestSpotFullDescriptionAssets;
  entries: InterestSpotFullDescriptionEntries;
  resources: InterestSpotFullDescriptionResources;
};

export type InterestSpotFullDescriptionResources = {
  __typename?: 'InterestSpotFullDescriptionResources';
  block: Array<InterestSpotFullDescriptionResourcesBlock>;
  hyperlink: Array<InterestSpotFullDescriptionResourcesHyperlink>;
  inline: Array<InterestSpotFullDescriptionResourcesInline>;
};

export type InterestSpotFullDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'InterestSpotFullDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type InterestSpotFullDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'InterestSpotFullDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type InterestSpotFullDescriptionResourcesInline = ResourceLink & {
  __typename?: 'InterestSpotFullDescriptionResourcesInline';
  sys: ResourceSys;
};

export type InterestSpotLinkingCollections = {
  __typename?: 'InterestSpotLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  routeCollection?: Maybe<RouteCollection>;
};


export type InterestSpotLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type InterestSpotLinkingCollectionsRouteCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<InterestSpotLinkingCollectionsRouteCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum InterestSpotLinkingCollectionsRouteCollectionOrder {
  ElevationAsc = 'elevation_ASC',
  ElevationDesc = 'elevation_DESC',
  EndLocationNameAsc = 'endLocationName_ASC',
  EndLocationNameDesc = 'endLocationName_DESC',
  LengthAsc = 'length_ASC',
  LengthDesc = 'length_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  StartLocationNameAsc = 'startLocationName_ASC',
  StartLocationNameDesc = 'startLocationName_DESC',
  StravaIdAsc = 'stravaId_ASC',
  StravaIdDesc = 'stravaId_DESC',
  StravaLinkAsc = 'stravaLink_ASC',
  StravaLinkDesc = 'stravaLink_DESC',
  SubTitleAsc = 'subTitle_ASC',
  SubTitleDesc = 'subTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TimeAsc = 'time_ASC',
  TimeDesc = 'time_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum InterestSpotOrder {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  LocationNameAsc = 'locationName_ASC',
  LocationNameDesc = 'locationName_DESC',
  StopTypeAsc = 'stopType_ASC',
  StopTypeDesc = 'stopType_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Location = {
  __typename?: 'Location';
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _node?: Maybe<_Node>;
  _nodes: Array<Maybe<_Node>>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  coll?: Maybe<Coll>;
  collCollection?: Maybe<CollCollection>;
  collVariant?: Maybe<CollVariant>;
  collVariantCollection?: Maybe<CollVariantCollection>;
  customAsset?: Maybe<CustomAsset>;
  customAssetCollection?: Maybe<CustomAssetCollection>;
  entryCollection?: Maybe<EntryCollection>;
  interestSpot?: Maybe<InterestSpot>;
  interestSpotCollection?: Maybe<InterestSpotCollection>;
  route?: Maybe<Route>;
  routeCollection?: Maybe<RouteCollection>;
  routeGroup?: Maybe<RouteGroup>;
  routeGroupCollection?: Maybe<RouteGroupCollection>;
};


export type Query_NodeArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type Query_NodesArgs = {
  ids: Array<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryCollArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCollCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<CollOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CollFilter>;
};


export type QueryCollVariantArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCollVariantCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<CollVariantOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CollVariantFilter>;
};


export type QueryCustomAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCustomAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<CustomAssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CustomAssetFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryInterestSpotArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryInterestSpotCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<InterestSpotOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<InterestSpotFilter>;
};


export type QueryRouteArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryRouteCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<RouteOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RouteFilter>;
};


export type QueryRouteGroupArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryRouteGroupCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<RouteGroupOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RouteGroupFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type Route = Entry & _Node & {
  __typename?: 'Route';
  _id: Scalars['ID']['output'];
  coffeStopsCollection?: Maybe<RouteCoffeStopsCollection>;
  collsCollection?: Maybe<RouteCollsCollection>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  elevation?: Maybe<Scalars['Float']['output']>;
  endLocation?: Maybe<Location>;
  endLocationName?: Maybe<Scalars['String']['output']>;
  gpx?: Maybe<Asset>;
  headerImage?: Maybe<Asset>;
  interestSpotsCollection?: Maybe<RouteInterestSpotsCollection>;
  length?: Maybe<Scalars['Float']['output']>;
  linkedFrom?: Maybe<RouteLinkingCollections>;
  mainCarouselCollection?: Maybe<AssetCollection>;
  mountainsCollection?: Maybe<RouteMountainsCollection>;
  slug?: Maybe<Scalars['String']['output']>;
  startLocation?: Maybe<Location>;
  startLocationName?: Maybe<Scalars['String']['output']>;
  stravaId?: Maybe<Scalars['String']['output']>;
  stravaLink?: Maybe<Scalars['String']['output']>;
  subTitle?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  time?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteCoffeStopsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<RouteCoffeStopsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<InterestSpotFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteCollsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<RouteCollsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CollVariantFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteElevationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteEndLocationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteEndLocationNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteGpxArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteHeaderImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteInterestSpotsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<RouteInterestSpotsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<InterestSpotFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteLengthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteMainCarouselCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteMountainsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<RouteMountainsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<InterestSpotFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteStartLocationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteStartLocationNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteStravaIdArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteStravaLinkArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteSubTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteTimeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/route) */
export type RouteTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RouteCoffeStopsCollection = {
  __typename?: 'RouteCoffeStopsCollection';
  items: Array<Maybe<InterestSpot>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum RouteCoffeStopsCollectionOrder {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  LocationNameAsc = 'locationName_ASC',
  LocationNameDesc = 'locationName_DESC',
  StopTypeAsc = 'stopType_ASC',
  StopTypeDesc = 'stopType_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type RouteCollection = {
  __typename?: 'RouteCollection';
  items: Array<Maybe<Route>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type RouteCollsCollection = {
  __typename?: 'RouteCollsCollection';
  items: Array<Maybe<CollVariant>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum RouteCollsCollectionOrder {
  AccumulatedHeightAsc = 'accumulatedHeight_ASC',
  AccumulatedHeightDesc = 'accumulatedHeight_DESC',
  DifficultyAsc = 'difficulty_ASC',
  DifficultyDesc = 'difficulty_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  LengthAsc = 'length_ASC',
  LengthDesc = 'length_DESC',
  SlopePercentageAsc = 'slopePercentage_ASC',
  SlopePercentageDesc = 'slopePercentage_DESC',
  StartLocationAsc = 'startLocation_ASC',
  StartLocationDesc = 'startLocation_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type RouteFilter = {
  AND?: InputMaybe<Array<InputMaybe<RouteFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<RouteFilter>>>;
  coffeStops?: InputMaybe<CfInterestSpotNestedFilter>;
  coffeStopsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  colls?: InputMaybe<CfCollVariantNestedFilter>;
  collsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  elevation?: InputMaybe<Scalars['Float']['input']>;
  elevation_exists?: InputMaybe<Scalars['Boolean']['input']>;
  elevation_gt?: InputMaybe<Scalars['Float']['input']>;
  elevation_gte?: InputMaybe<Scalars['Float']['input']>;
  elevation_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  elevation_lt?: InputMaybe<Scalars['Float']['input']>;
  elevation_lte?: InputMaybe<Scalars['Float']['input']>;
  elevation_not?: InputMaybe<Scalars['Float']['input']>;
  elevation_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  endLocationName?: InputMaybe<Scalars['String']['input']>;
  endLocationName_contains?: InputMaybe<Scalars['String']['input']>;
  endLocationName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  endLocationName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  endLocationName_not?: InputMaybe<Scalars['String']['input']>;
  endLocationName_not_contains?: InputMaybe<Scalars['String']['input']>;
  endLocationName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  endLocation_exists?: InputMaybe<Scalars['Boolean']['input']>;
  endLocation_within_circle?: InputMaybe<Scalars['Circle']['input']>;
  endLocation_within_rectangle?: InputMaybe<Scalars['Rectangle']['input']>;
  gpx_exists?: InputMaybe<Scalars['Boolean']['input']>;
  headerImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  interestSpots?: InputMaybe<CfInterestSpotNestedFilter>;
  interestSpotsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  length_exists?: InputMaybe<Scalars['Boolean']['input']>;
  length_gt?: InputMaybe<Scalars['Float']['input']>;
  length_gte?: InputMaybe<Scalars['Float']['input']>;
  length_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  length_lt?: InputMaybe<Scalars['Float']['input']>;
  length_lte?: InputMaybe<Scalars['Float']['input']>;
  length_not?: InputMaybe<Scalars['Float']['input']>;
  length_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  mainCarouselCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  mountains?: InputMaybe<CfInterestSpotNestedFilter>;
  mountainsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startLocationName?: InputMaybe<Scalars['String']['input']>;
  startLocationName_contains?: InputMaybe<Scalars['String']['input']>;
  startLocationName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startLocationName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startLocationName_not?: InputMaybe<Scalars['String']['input']>;
  startLocationName_not_contains?: InputMaybe<Scalars['String']['input']>;
  startLocationName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startLocation_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startLocation_within_circle?: InputMaybe<Scalars['Circle']['input']>;
  startLocation_within_rectangle?: InputMaybe<Scalars['Rectangle']['input']>;
  stravaId?: InputMaybe<Scalars['String']['input']>;
  stravaId_contains?: InputMaybe<Scalars['String']['input']>;
  stravaId_exists?: InputMaybe<Scalars['Boolean']['input']>;
  stravaId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stravaId_not?: InputMaybe<Scalars['String']['input']>;
  stravaId_not_contains?: InputMaybe<Scalars['String']['input']>;
  stravaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stravaLink?: InputMaybe<Scalars['String']['input']>;
  stravaLink_contains?: InputMaybe<Scalars['String']['input']>;
  stravaLink_exists?: InputMaybe<Scalars['Boolean']['input']>;
  stravaLink_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stravaLink_not?: InputMaybe<Scalars['String']['input']>;
  stravaLink_not_contains?: InputMaybe<Scalars['String']['input']>;
  stravaLink_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  subTitle_contains?: InputMaybe<Scalars['String']['input']>;
  subTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  subTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subTitle_not?: InputMaybe<Scalars['String']['input']>;
  subTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  subTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  time?: InputMaybe<Scalars['String']['input']>;
  time_contains?: InputMaybe<Scalars['String']['input']>;
  time_exists?: InputMaybe<Scalars['Boolean']['input']>;
  time_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  time_not?: InputMaybe<Scalars['String']['input']>;
  time_not_contains?: InputMaybe<Scalars['String']['input']>;
  time_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroup = Entry & _Node & {
  __typename?: 'RouteGroup';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  headerImage?: Maybe<Asset>;
  linkedFrom?: Maybe<RouteGroupLinkingCollections>;
  location?: Maybe<Location>;
  locationLabel?: Maybe<Scalars['String']['output']>;
  locationLength?: Maybe<Scalars['Int']['output']>;
  mapIframe?: Maybe<RouteGroupMapIframe>;
  routesCollection?: Maybe<RouteGroupRoutesCollection>;
  slug?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupHeaderImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupLocationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupLocationLabelArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupLocationLengthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupMapIframeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupRoutesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<RouteGroupRoutesCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RouteFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupSubtitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/ugkekn878kho/content_types/routeGroup) */
export type RouteGroupTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RouteGroupCollection = {
  __typename?: 'RouteGroupCollection';
  items: Array<Maybe<RouteGroup>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type RouteGroupFilter = {
  AND?: InputMaybe<Array<InputMaybe<RouteGroupFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<RouteGroupFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  headerImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  locationLabel?: InputMaybe<Scalars['String']['input']>;
  locationLabel_contains?: InputMaybe<Scalars['String']['input']>;
  locationLabel_exists?: InputMaybe<Scalars['Boolean']['input']>;
  locationLabel_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  locationLabel_not?: InputMaybe<Scalars['String']['input']>;
  locationLabel_not_contains?: InputMaybe<Scalars['String']['input']>;
  locationLabel_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  locationLength?: InputMaybe<Scalars['Int']['input']>;
  locationLength_exists?: InputMaybe<Scalars['Boolean']['input']>;
  locationLength_gt?: InputMaybe<Scalars['Int']['input']>;
  locationLength_gte?: InputMaybe<Scalars['Int']['input']>;
  locationLength_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  locationLength_lt?: InputMaybe<Scalars['Int']['input']>;
  locationLength_lte?: InputMaybe<Scalars['Int']['input']>;
  locationLength_not?: InputMaybe<Scalars['Int']['input']>;
  locationLength_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  location_exists?: InputMaybe<Scalars['Boolean']['input']>;
  location_within_circle?: InputMaybe<Scalars['Circle']['input']>;
  location_within_rectangle?: InputMaybe<Scalars['Rectangle']['input']>;
  mapIframe_contains?: InputMaybe<Scalars['String']['input']>;
  mapIframe_exists?: InputMaybe<Scalars['Boolean']['input']>;
  mapIframe_not_contains?: InputMaybe<Scalars['String']['input']>;
  routes?: InputMaybe<CfRouteNestedFilter>;
  routesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  subtitle_contains?: InputMaybe<Scalars['String']['input']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subtitle_not?: InputMaybe<Scalars['String']['input']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_contains?: InputMaybe<Scalars['String']['input']>;
  type_exists?: InputMaybe<Scalars['Boolean']['input']>;
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_not?: InputMaybe<Scalars['String']['input']>;
  type_not_contains?: InputMaybe<Scalars['String']['input']>;
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type RouteGroupLinkingCollections = {
  __typename?: 'RouteGroupLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type RouteGroupLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RouteGroupMapIframe = {
  __typename?: 'RouteGroupMapIframe';
  json: Scalars['JSON']['output'];
  links: RouteGroupMapIframeLinks;
};

export type RouteGroupMapIframeAssets = {
  __typename?: 'RouteGroupMapIframeAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type RouteGroupMapIframeEntries = {
  __typename?: 'RouteGroupMapIframeEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type RouteGroupMapIframeLinks = {
  __typename?: 'RouteGroupMapIframeLinks';
  assets: RouteGroupMapIframeAssets;
  entries: RouteGroupMapIframeEntries;
  resources: RouteGroupMapIframeResources;
};

export type RouteGroupMapIframeResources = {
  __typename?: 'RouteGroupMapIframeResources';
  block: Array<RouteGroupMapIframeResourcesBlock>;
  hyperlink: Array<RouteGroupMapIframeResourcesHyperlink>;
  inline: Array<RouteGroupMapIframeResourcesInline>;
};

export type RouteGroupMapIframeResourcesBlock = ResourceLink & {
  __typename?: 'RouteGroupMapIframeResourcesBlock';
  sys: ResourceSys;
};

export type RouteGroupMapIframeResourcesHyperlink = ResourceLink & {
  __typename?: 'RouteGroupMapIframeResourcesHyperlink';
  sys: ResourceSys;
};

export type RouteGroupMapIframeResourcesInline = ResourceLink & {
  __typename?: 'RouteGroupMapIframeResourcesInline';
  sys: ResourceSys;
};

export enum RouteGroupOrder {
  LocationLabelAsc = 'locationLabel_ASC',
  LocationLabelDesc = 'locationLabel_DESC',
  LocationLengthAsc = 'locationLength_ASC',
  LocationLengthDesc = 'locationLength_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC'
}

export type RouteGroupRoutesCollection = {
  __typename?: 'RouteGroupRoutesCollection';
  items: Array<Maybe<Route>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum RouteGroupRoutesCollectionOrder {
  ElevationAsc = 'elevation_ASC',
  ElevationDesc = 'elevation_DESC',
  EndLocationNameAsc = 'endLocationName_ASC',
  EndLocationNameDesc = 'endLocationName_DESC',
  LengthAsc = 'length_ASC',
  LengthDesc = 'length_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  StartLocationNameAsc = 'startLocationName_ASC',
  StartLocationNameDesc = 'startLocationName_DESC',
  StravaIdAsc = 'stravaId_ASC',
  StravaIdDesc = 'stravaId_DESC',
  StravaLinkAsc = 'stravaLink_ASC',
  StravaLinkDesc = 'stravaLink_DESC',
  SubTitleAsc = 'subTitle_ASC',
  SubTitleDesc = 'subTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TimeAsc = 'time_ASC',
  TimeDesc = 'time_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type RouteInterestSpotsCollection = {
  __typename?: 'RouteInterestSpotsCollection';
  items: Array<Maybe<InterestSpot>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum RouteInterestSpotsCollectionOrder {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  LocationNameAsc = 'locationName_ASC',
  LocationNameDesc = 'locationName_DESC',
  StopTypeAsc = 'stopType_ASC',
  StopTypeDesc = 'stopType_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type RouteLinkingCollections = {
  __typename?: 'RouteLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  routeGroupCollection?: Maybe<RouteGroupCollection>;
};


export type RouteLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type RouteLinkingCollectionsRouteGroupCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<RouteLinkingCollectionsRouteGroupCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum RouteLinkingCollectionsRouteGroupCollectionOrder {
  LocationLabelAsc = 'locationLabel_ASC',
  LocationLabelDesc = 'locationLabel_DESC',
  LocationLengthAsc = 'locationLength_ASC',
  LocationLengthDesc = 'locationLength_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC'
}

export type RouteMountainsCollection = {
  __typename?: 'RouteMountainsCollection';
  items: Array<Maybe<InterestSpot>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum RouteMountainsCollectionOrder {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  LocationNameAsc = 'locationName_ASC',
  LocationNameDesc = 'locationName_DESC',
  StopTypeAsc = 'stopType_ASC',
  StopTypeDesc = 'stopType_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum RouteOrder {
  ElevationAsc = 'elevation_ASC',
  ElevationDesc = 'elevation_DESC',
  EndLocationNameAsc = 'endLocationName_ASC',
  EndLocationNameDesc = 'endLocationName_DESC',
  LengthAsc = 'length_ASC',
  LengthDesc = 'length_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  StartLocationNameAsc = 'startLocationName_ASC',
  StartLocationNameDesc = 'startLocationName_DESC',
  StravaIdAsc = 'stravaId_ASC',
  StravaIdDesc = 'stravaId_DESC',
  StravaLinkAsc = 'stravaLink_ASC',
  StravaLinkDesc = 'stravaLink_DESC',
  SubTitleAsc = 'subTitle_ASC',
  SubTitleDesc = 'subTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TimeAsc = 'time_ASC',
  TimeDesc = 'time_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  /** The locale that was requested. */
  locale?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename?: 'TaxonomyConcept';
  id?: Maybe<Scalars['String']['output']>;
};

export type TimelineFilterInput = {
  /** Preview content starting from a given release date */
  release_lte?: InputMaybe<Scalars['String']['input']>;
  /** Preview content starting from a given timestamp */
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type _Node = {
  _id: Scalars['ID']['output'];
};

export type CfCollVariantNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfCollVariantNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfCollVariantNestedFilter>>>;
  accumulatedHeight?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_exists?: InputMaybe<Scalars['Boolean']['input']>;
  accumulatedHeight_gt?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_gte?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  accumulatedHeight_lt?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_lte?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_not?: InputMaybe<Scalars['Float']['input']>;
  accumulatedHeight_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  difficulty_contains?: InputMaybe<Scalars['String']['input']>;
  difficulty_exists?: InputMaybe<Scalars['Boolean']['input']>;
  difficulty_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  difficulty_not?: InputMaybe<Scalars['String']['input']>;
  difficulty_not_contains?: InputMaybe<Scalars['String']['input']>;
  difficulty_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  length?: InputMaybe<Scalars['Float']['input']>;
  length_exists?: InputMaybe<Scalars['Boolean']['input']>;
  length_gt?: InputMaybe<Scalars['Float']['input']>;
  length_gte?: InputMaybe<Scalars['Float']['input']>;
  length_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  length_lt?: InputMaybe<Scalars['Float']['input']>;
  length_lte?: InputMaybe<Scalars['Float']['input']>;
  length_not?: InputMaybe<Scalars['Float']['input']>;
  length_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  slopePercentage?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slopePercentage_gt?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_gte?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  slopePercentage_lt?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_lte?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_not?: InputMaybe<Scalars['Float']['input']>;
  slopePercentage_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  startLocation_contains?: InputMaybe<Scalars['String']['input']>;
  startLocation_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startLocation_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startLocation_not?: InputMaybe<Scalars['String']['input']>;
  startLocation_not_contains?: InputMaybe<Scalars['String']['input']>;
  startLocation_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CfInterestSpotNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfInterestSpotNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfInterestSpotNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fullDescription_contains?: InputMaybe<Scalars['String']['input']>;
  fullDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fullDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  headerImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  locationName_contains?: InputMaybe<Scalars['String']['input']>;
  locationName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  locationName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  locationName_not?: InputMaybe<Scalars['String']['input']>;
  locationName_not_contains?: InputMaybe<Scalars['String']['input']>;
  locationName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  location_exists?: InputMaybe<Scalars['Boolean']['input']>;
  location_within_circle?: InputMaybe<Scalars['Circle']['input']>;
  location_within_rectangle?: InputMaybe<Scalars['Rectangle']['input']>;
  services_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  services_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  services_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  services_exists?: InputMaybe<Scalars['Boolean']['input']>;
  stopType?: InputMaybe<Scalars['String']['input']>;
  stopType_contains?: InputMaybe<Scalars['String']['input']>;
  stopType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  stopType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stopType_not?: InputMaybe<Scalars['String']['input']>;
  stopType_not_contains?: InputMaybe<Scalars['String']['input']>;
  stopType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CfRouteNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfRouteNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfRouteNestedFilter>>>;
  coffeStopsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  collsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  elevation?: InputMaybe<Scalars['Float']['input']>;
  elevation_exists?: InputMaybe<Scalars['Boolean']['input']>;
  elevation_gt?: InputMaybe<Scalars['Float']['input']>;
  elevation_gte?: InputMaybe<Scalars['Float']['input']>;
  elevation_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  elevation_lt?: InputMaybe<Scalars['Float']['input']>;
  elevation_lte?: InputMaybe<Scalars['Float']['input']>;
  elevation_not?: InputMaybe<Scalars['Float']['input']>;
  elevation_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  endLocationName?: InputMaybe<Scalars['String']['input']>;
  endLocationName_contains?: InputMaybe<Scalars['String']['input']>;
  endLocationName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  endLocationName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  endLocationName_not?: InputMaybe<Scalars['String']['input']>;
  endLocationName_not_contains?: InputMaybe<Scalars['String']['input']>;
  endLocationName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  endLocation_exists?: InputMaybe<Scalars['Boolean']['input']>;
  endLocation_within_circle?: InputMaybe<Scalars['Circle']['input']>;
  endLocation_within_rectangle?: InputMaybe<Scalars['Rectangle']['input']>;
  gpx_exists?: InputMaybe<Scalars['Boolean']['input']>;
  headerImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  interestSpotsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  length_exists?: InputMaybe<Scalars['Boolean']['input']>;
  length_gt?: InputMaybe<Scalars['Float']['input']>;
  length_gte?: InputMaybe<Scalars['Float']['input']>;
  length_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  length_lt?: InputMaybe<Scalars['Float']['input']>;
  length_lte?: InputMaybe<Scalars['Float']['input']>;
  length_not?: InputMaybe<Scalars['Float']['input']>;
  length_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  mainCarouselCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  mountainsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startLocationName?: InputMaybe<Scalars['String']['input']>;
  startLocationName_contains?: InputMaybe<Scalars['String']['input']>;
  startLocationName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startLocationName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startLocationName_not?: InputMaybe<Scalars['String']['input']>;
  startLocationName_not_contains?: InputMaybe<Scalars['String']['input']>;
  startLocationName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startLocation_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startLocation_within_circle?: InputMaybe<Scalars['Circle']['input']>;
  startLocation_within_rectangle?: InputMaybe<Scalars['Rectangle']['input']>;
  stravaId?: InputMaybe<Scalars['String']['input']>;
  stravaId_contains?: InputMaybe<Scalars['String']['input']>;
  stravaId_exists?: InputMaybe<Scalars['Boolean']['input']>;
  stravaId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stravaId_not?: InputMaybe<Scalars['String']['input']>;
  stravaId_not_contains?: InputMaybe<Scalars['String']['input']>;
  stravaId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stravaLink?: InputMaybe<Scalars['String']['input']>;
  stravaLink_contains?: InputMaybe<Scalars['String']['input']>;
  stravaLink_exists?: InputMaybe<Scalars['Boolean']['input']>;
  stravaLink_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stravaLink_not?: InputMaybe<Scalars['String']['input']>;
  stravaLink_not_contains?: InputMaybe<Scalars['String']['input']>;
  stravaLink_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  subTitle_contains?: InputMaybe<Scalars['String']['input']>;
  subTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  subTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subTitle_not?: InputMaybe<Scalars['String']['input']>;
  subTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  subTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  time?: InputMaybe<Scalars['String']['input']>;
  time_contains?: InputMaybe<Scalars['String']['input']>;
  time_exists?: InputMaybe<Scalars['Boolean']['input']>;
  time_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  time_not?: InputMaybe<Scalars['String']['input']>;
  time_not_contains?: InputMaybe<Scalars['String']['input']>;
  time_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type GetEntryCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntryCollectionQuery = { __typename?: 'Query', entryCollection?: { __typename?: 'EntryCollection', items: Array<
      | { __typename: 'Coll', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
      | { __typename: 'CollVariant', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
      | { __typename: 'CustomAsset', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
      | { __typename: 'InterestSpot', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
      | { __typename: 'Route', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
      | { __typename: 'RouteGroup', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
     | null> } | null };

export type GetRouteCollectionQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RouteFilter>;
  order?: InputMaybe<Array<InputMaybe<RouteOrder>> | InputMaybe<RouteOrder>>;
}>;


export type GetRouteCollectionQuery = { __typename?: 'Query', routeCollection?: { __typename?: 'RouteCollection', total: number, skip: number, limit: number, items: Array<{ __typename: 'Route', title?: string | null, slug?: string | null, description?: string | null, subTitle?: string | null, length?: number | null, elevation?: number | null, time?: string | null, startLocationName?: string | null, endLocationName?: string | null, stravaLink?: string | null, sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null }, headerImage?: { __typename?: 'Asset', title?: string | null, description?: string | null, url?: string | null, width?: number | null, height?: number | null, contentType?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null };

export type GetRouteBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetRouteBySlugQuery = { __typename?: 'Query', routeCollection?: { __typename?: 'RouteCollection', items: Array<{ __typename: 'Route', title?: string | null, slug?: string | null, description?: string | null, subTitle?: string | null, length?: number | null, elevation?: number | null, time?: string | null, startLocationName?: string | null, endLocationName?: string | null, stravaLink?: string | null, stravaId?: string | null, sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null }, headerImage?: { __typename?: 'Asset', title?: string | null, description?: string | null, url?: string | null, width?: number | null, height?: number | null, contentType?: string | null, sys: { __typename?: 'Sys', id: string } } | null, mainCarouselCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', title?: string | null, description?: string | null, url?: string | null, width?: number | null, height?: number | null, contentType?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, coffeStopsCollection?: { __typename?: 'RouteCoffeStopsCollection', items: Array<{ __typename?: 'InterestSpot', title?: string | null, description?: string | null, locationName?: string | null, sys: { __typename?: 'Sys', id: string }, location?: { __typename?: 'Location', lat?: number | null, lon?: number | null } | null, headerImage?: { __typename?: 'Asset', title?: string | null, description?: string | null, url?: string | null, width?: number | null, height?: number | null, contentType?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null, interestSpotsCollection?: { __typename?: 'RouteInterestSpotsCollection', items: Array<{ __typename?: 'InterestSpot', title?: string | null, description?: string | null, locationName?: string | null, sys: { __typename?: 'Sys', id: string }, location?: { __typename?: 'Location', lat?: number | null, lon?: number | null } | null, headerImage?: { __typename?: 'Asset', title?: string | null, description?: string | null, url?: string | null, width?: number | null, height?: number | null, contentType?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null, mountainsCollection?: { __typename?: 'RouteMountainsCollection', items: Array<{ __typename?: 'InterestSpot', title?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, headerImage?: { __typename?: 'Asset', title?: string | null, description?: string | null, url?: string | null, width?: number | null, height?: number | null, contentType?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null } | null> } | null };

export type GetFeaturedRoutesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetFeaturedRoutesQuery = { __typename?: 'Query', routeCollection?: { __typename?: 'RouteCollection', items: Array<{ __typename?: 'Route', title?: string | null, slug?: string | null, description?: string | null, subTitle?: string | null, length?: number | null, elevation?: number | null, time?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };

export type GetEntriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntriesQuery = { __typename?: 'Query', entryCollection?: { __typename?: 'EntryCollection', items: Array<
      | { __typename: 'Coll', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
      | { __typename: 'CollVariant', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
      | { __typename: 'CustomAsset', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
      | { __typename: 'InterestSpot', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
      | { __typename: 'Route', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
      | { __typename: 'RouteGroup', sys: { __typename?: 'Sys', id: string, publishedAt?: string | null, firstPublishedAt?: string | null } }
     | null> } | null };

export type GetAssetQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAssetQuery = { __typename?: 'Query', asset?: { __typename?: 'Asset', title?: string | null, description?: string | null, url?: string | null, contentType?: string | null, width?: number | null, height?: number | null, sys: { __typename?: 'Sys', id: string } } | null };
