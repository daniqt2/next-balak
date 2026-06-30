import { contentfulFetcher } from '@/lib/contentful-fetcher';
import type { CollFilter, CollOrder, Query } from '@/contentful-types';
import { gql } from '@apollo/client';

import { collCollectionQuery } from '@/contentful/coll';

const GET_COLL_BY_ID = gql`
  query GetCollById($id: String!) {
    coll(id: $id) {
      sys {
        id
        publishedAt
        firstPublishedAt
      }
      __typename
      name
      slug
      description {
        json
      }
      location {
        lat
        lon
      }
      header {
        sys {
          id
        }
        title
        description
        url
        width
        height
        contentType
      }
      variantsCollection(limit: 20) {
        items {
          __typename
          sys {
            id
          }
          ... on CollVariant {
            startLocation
            length
            accumulatedHeight
            slopePercentage
            difficulty
            linkedFrom {
              routeCollection(limit: 5, order: [sys_publishedAt_DESC]) {
                items {
                  sys {
                    id
                  }
                  title
                  slug
                  subTitle
                  length
                  elevation
                  time
                  headerImage {
                    sys {
                      id
                    }
                    title
                    url
                    width
                    height
                    contentType
                  }
                }
              }
            }
          }
        }
      }
      imagesCollection {
        items {
          sys {
            id
          }
          title
          description
          url
          width
          height
          contentType
        }
      }
    }
  }
`;

const GET_COLLS_FOR_MAP = gql`
  query GetCollsForMap($limit: Int) {
    collCollection(limit: $limit) {
      items {
        sys { id }
        name
        location { lat lon }
        header { url title }
      }
    }
  }
`;

export interface CollServiceOptions {
  limit?: number;
  skip?: number;
  where?: CollFilter;
  order?: CollOrder[];
}

export class CollService {
  /**
   * Get a collection of colls with optional filtering and pagination
   */
  async getColls(options: CollServiceOptions = {}): Promise<Query> {
    const { limit = 10, skip = 0, where, order } = options;

    return contentfulFetcher.query<Query>(collCollectionQuery, {
      variables: {
        limit,
        skip,
        where,
        order,
      },
    });
  }

  async getCollsForMap(limit = 200): Promise<Query> {
    return contentfulFetcher.query<Query>(GET_COLLS_FOR_MAP, {
      variables: { limit },
    });
  }

  /**
   * Get a single coll by its ID
   */
  async getCollById(id: string): Promise<Query> {
    return contentfulFetcher.query<Query>(GET_COLL_BY_ID, {
      variables: { id },
    });
  }
}

// Export singleton instance
export const collService = new CollService();
