import { contentfulFetcher } from '@/lib/contentful-fetcher';
import {
  GetRouteCollectionQuery,
  GetRouteBySlugQuery,
  GetFeaturedRoutesQuery,
  RouteFilter,
  RouteOrder,
} from '@/contentful-types';
import { gql } from '@apollo/client';

const GET_ROUTE_COLLECTION = gql`
  query GetRouteCollection($limit: Int, $skip: Int, $where: RouteFilter, $order: [RouteOrder]) {
    routeCollection(limit: $limit, skip: $skip, where: $where, order: $order) {
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
        subTitle
        length
        elevation
        time
        startLocationName
        endLocationName
        stravaLink
        garminLink
        mainImage {
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
      }
    }
  }
`;

const GET_ROUTE_BY_SLUG = gql`
  query GetRouteBySlug($slug: String!) {
    routeCollection(where: { slug: $slug }, limit: 1) {
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
        subTitle
        length
        elevation
        time
        startLocationName
        endLocationName
        stravaLink
        garminLink
        stravaId
        mainImage {
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
        coffeStopsCollection {
          items {
            sys {
              id
            }
            title
            description
            mountainDifficulty
            mountainLength
            mountainElevationGain
          }
        }
        interestSpotsCollection {
          items {
            sys {
              id
            }
            title
            description
            mountainDifficulty
            mountainLength
            mountainElevationGain
          }
        }
        mountainsCollection {
          items {
            sys {
              id
            }
            title
            description
            mountainDifficulty
            mountainLength
            mountainElevationGain
          }
        }
      }
    }
  }
`;

const GET_FEATURED_ROUTES = gql`
  query GetFeaturedRoutes($limit: Int = 6) {
    routeCollection(limit: $limit, order: [sys_publishedAt_DESC]) {
      items {
        sys {
          id
        }
        title
        slug
        description
        subTitle
        length
        elevation
        time
        mainImage {
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
`;

export interface RouteServiceOptions {
  limit?: number;
  skip?: number;
  where?: RouteFilter;
  order?: RouteOrder[];
}

export class RouteService {
  /**
   * Get a collection of routes with optional filtering and pagination
   */
  async getRoutes(options: RouteServiceOptions = {}): Promise<GetRouteCollectionQuery> {
    const { limit = 10, skip = 0, where, order } = options;
    
    return contentfulFetcher.query<GetRouteCollectionQuery>(
      GET_ROUTE_COLLECTION,
      {
        variables: {
          limit,
          skip,
          where,
          order,
        },
      }
    );
  }

  async getRouteBySlug(slug: string): Promise<GetRouteBySlugQuery> {
    return contentfulFetcher.query<GetRouteBySlugQuery>(
      GET_ROUTE_BY_SLUG,
      {
        variables: { slug },
      }
    );
  }

  async getFeaturedRoutes(limit: number = 6): Promise<GetFeaturedRoutesQuery> {
    return contentfulFetcher.query<GetFeaturedRoutesQuery>(
      GET_FEATURED_ROUTES,
      {
        variables: { limit },
      }
    );
  }

  /**
   * Get routes by difficulty level
   */
  async getRoutesByDifficulty(difficulty: string): Promise<GetRouteCollectionQuery> {
    return this.getRoutes({
      where: {
        // You can add difficulty filtering here based on your Contentful schema
        description_contains: difficulty,
      },
    });
  }

  /**
   * Get routes by location
   */
  async getRoutesByLocation(location: string): Promise<GetRouteCollectionQuery> {
    return this.getRoutes({
      where: {
        OR: [
          { startLocationName_contains: location },
          { endLocationName_contains: location },
        ],
      },
    });
  }

  /**
   * Search routes by title or description
   */
  async searchRoutes(searchTerm: string): Promise<GetRouteCollectionQuery> {
    return this.getRoutes({
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
export const routeService = new RouteService();

// Export individual methods for convenience
export const {
  getRoutes,
  getRouteBySlug,
  getFeaturedRoutes,
  getRoutesByDifficulty,
  getRoutesByLocation,
  searchRoutes,
} = routeService;
