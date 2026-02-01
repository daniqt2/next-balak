import { contentfulFetcher } from '@/lib/contentful-fetcher';
import {
  Query,
  InterestSpotFilter,
  InterestSpotOrder,
} from '@/contentful-types';
import { gql } from '@apollo/client';

const GET_COFFEE_COLLECTION = gql`
  query GetCoffeeCollection(
    $limit: Int
    $skip: Int
    $where: InterestSpotFilter
    $order: [InterestSpotOrder]
  ) {
    interestSpotCollection(
      limit: $limit
      skip: $skip
      where: $where
      order: $order
    ) {
      total
      skip
      limit
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        type
        stopType
        __typename
        title
        description
        locationName
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
              }
            }
          }
        }
      }
    }
  }
`;

const GET_COFFEE_BY_ID = gql`
  query GetCoffeeById($id: String!) {
    interestSpot(id: $id) {
      sys {
        id
        publishedAt
        firstPublishedAt
      }
      __typename
      title
      stopType
      description
      fullDescription {
        json
      }
      locationName
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
        routeCollection(limit: 5, order: [sys_publishedAt_DESC]) {
          total
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
          }
        }
      }
    }
  }
`;

export interface CoffeeServiceOptions {
  limit?: number;
  skip?: number;
  where?: InterestSpotFilter;
  order?: InterestSpotOrder[];
}

export class CoffeeService {
  /**
   * Get a collection of coffee spots with optional filtering and pagination
   */

  async getCoffeeSpots(options: CoffeeServiceOptions = {}): Promise<Query> {
    const { limit = 10, skip = 0, where, order } = options;

    const finalWhere: InterestSpotFilter = {
      ...where,
      type_contains_all: ['coffeStop'],
    };

    return contentfulFetcher.query<Query>(GET_COFFEE_COLLECTION, {
      variables: {
        limit,
        skip,
        where: finalWhere,
        order,
      },
    });
  }

  /**
   * Get a single coffee spot by its ID
   */
  async getCoffeeSpotById(id: string): Promise<Query> {
    return contentfulFetcher.query<Query>(GET_COFFEE_BY_ID, {
      variables: { id },
    });
  }

  /**
   * Get coffee spots by location
   */
  async getCoffeeSpotsByLocation(location: string): Promise<Query> {
    return this.getCoffeeSpots({
      where: {
        locationName_contains: location,
      },
    });
  }

  /**
   * Search coffee spots by title or description
   */
  async searchCoffeeSpots(searchTerm: string): Promise<Query> {
    return this.getCoffeeSpots({
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
   * Get coffee spots sorted by title
   */
  async getCoffeeSpotsSortedByTitle(): Promise<Query> {
    return this.getCoffeeSpots({
      order: [InterestSpotOrder.TitleAsc],
    });
  }
}

// Export singleton instance
export const coffeeService = new CoffeeService();
