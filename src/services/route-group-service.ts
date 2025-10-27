import { contentfulFetcher } from '@/lib/contentful-fetcher';
import { Query, RouteGroupFilter, RouteGroupOrder } from '@/contentful-types';
import { gql } from '@apollo/client';

const GET_ROUTE_GROUP_COLLECTION = gql`
  query GetRouteGroupCollection(
    $limit: Int
    $skip: Int
    $where: RouteGroupFilter
    $order: [RouteGroupOrder]
  ) {
    routeGroupCollection(
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
        __typename
        title
        slug
        description
        subtitle
        locationLabel
        locationLength
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
        location {
          lat
          lon
        }
        routesCollection {
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
`;

const GET_ROUTE_GROUP_BY_SLUG = gql`
  query GetRouteGroupBySlug($slug: String!) {
    routeGroupCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        __typename
        title
        slug
        description
        subtitle
        locationLabel
        locationLength
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
        location {
          lat
          lon
        }
        mapIframe {
          json
        }
        routesCollection {
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

export interface RouteGroupServiceOptions {
  limit?: number;
  skip?: number;
  where?: RouteGroupFilter;
  order?: RouteGroupOrder[];
}

export class RouteGroupService {
  /**
   * Get a collection of route groups with optional filtering and pagination
   */
  async getRouteGroups(options: RouteGroupServiceOptions = {}): Promise<Query> {
    const { limit = 10, skip = 0, where, order } = options;

    return contentfulFetcher.query<Query>(GET_ROUTE_GROUP_COLLECTION, {
      variables: {
        limit,
        skip,
        where,
        order,
      },
    });
  }

  async getRouteGroupBySlug(slug: string): Promise<Query> {
    return contentfulFetcher.query<Query>(GET_ROUTE_GROUP_BY_SLUG, {
      variables: { slug },
    });
  }

  /**
   * Get route groups by location
   */
  async getRouteGroupsByLocation(location: string): Promise<Query> {
    return this.getRouteGroups({
      where: {
        locationLabel_contains: location,
      },
    });
  }

  /**
   * Search route groups by title or description
   */
  async searchRouteGroups(searchTerm: string): Promise<Query> {
    return this.getRouteGroups({
      where: {
        OR: [
          { title_contains: searchTerm },
          { description_contains: searchTerm },
        ],
      },
    });
  }
}

// Export singleton instance
export const routeGroupService = new RouteGroupService();

// Export individual methods for convenience
export const {
  getRouteGroups,
  getRouteGroupBySlug,
  getRouteGroupsByLocation,
  searchRouteGroups,
} = routeGroupService;
