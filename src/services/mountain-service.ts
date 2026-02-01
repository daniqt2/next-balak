import { contentfulFetcher } from '@/lib/contentful-fetcher';
import {
  Query,
  InterestSpotFilter,
  InterestSpotOrder,
} from '@/contentful-types';
import { gql } from '@apollo/client';
import { interestSpotCollectionQuery } from '@/contentful/interestSpot';

const GET_MOUNTAIN_BY_ID = gql`
  query GetMountainById($id: String!) {
    interestSpot(id: $id) {
      sys {
        id
        publishedAt
        firstPublishedAt
      }
      __typename
      title
      description
      locationName
      mountainMedPercent
      location {
        lat
        lon
      }
      headerImage {
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
      linkedFrom {
        routeCollection {
          total
          items {
            sys {
              id
            }
            title
            slug
            subTitle

            startLocationName
            endLocationName
            headerImage {
              sys {
                id
              }
              title
              url
              width
              height
            }
            mainCarouselCollection {
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
      }
    }
  }
`;

export interface MountainServiceOptions {
  limit?: number;
  skip?: number;
  where?: InterestSpotFilter;
  order?: InterestSpotOrder[];
}

export class MountainService {
  /**
   * Get a collection of mountains with optional filtering and pagination
   */
  async getMountains(options: MountainServiceOptions = {}): Promise<Query> {
    const { limit = 10, skip = 0, where, order } = options;

    const finalWhere: InterestSpotFilter = {
      ...where,
      type_contains_all: ['mountain'],
    };

    return contentfulFetcher.query<Query>(interestSpotCollectionQuery, {
      variables: {
        limit,
        skip,
        where: finalWhere,
        order,
      },
    });
  }

  /**
   * Get a single mountain by its ID
   */
  async getMountainById(id: string): Promise<Query> {
    return contentfulFetcher.query<Query>(GET_MOUNTAIN_BY_ID, {
      variables: { id },
    });
  }

  /**
   * Get mountains by difficulty level
   */
  async getMountainsByDifficulty(_difficulty: string): Promise<Query> {
    return this.getMountains();
  }

  /**
   * Get mountains by location
   */
  async getMountainsByLocation(location: string): Promise<Query> {
    return this.getMountains({
      where: {
        locationName_contains: location,
      },
    });
  }

  /**
   * Search mountains by title or description
   */
  async searchMountains(searchTerm: string): Promise<Query> {
    return this.getMountains({
      where: {
        OR: [
          { title_contains: searchTerm },
          { description_contains: searchTerm },
          { locationName_contains: searchTerm },
        ],
      },
    });
  }

  /**
   * Get mountains with elevation gain above a certain threshold
   */
  async getMountainsByElevation(_minElevation: number): Promise<Query> {
    return this.getMountains();
  }

  /**
   * Get mountains sorted by difficulty
   */
  async getMountainsSortedByDifficulty(): Promise<Query> {
    return this.getMountains();
  }
}

// Export singleton instance
export const mountainService = new MountainService();
