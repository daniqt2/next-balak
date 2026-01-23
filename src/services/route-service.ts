import { contentfulFetcher } from '@/lib/contentful-fetcher';
import {
  GetRouteCollectionQuery,
  GetRouteBySlugQuery,
  GetFeaturedRoutesQuery,
  RouteFilter,
  RouteOrder,
} from '@/contentful-types';
import {
  GET_ROUTE_COLLECTION,
  GET_ROUTE_BY_SLUG,
  GET_FEATURED_ROUTES,
} from '@/graphql/queries';

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
  async getRoutes(
    options: RouteServiceOptions = {}
  ): Promise<GetRouteCollectionQuery> {
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

  /**
   * Get a single route by its slug
   */
  async getRouteBySlug(slug: string): Promise<GetRouteBySlugQuery> {
    return contentfulFetcher.query<GetRouteBySlugQuery>(GET_ROUTE_BY_SLUG, {
      variables: { slug },
    });
  }

  /**
   * Get featured routes (most recently published)
   */
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
  async getRoutesByDifficulty(
    difficulty: string
  ): Promise<GetRouteCollectionQuery> {
    return this.getRoutes({
      where: {
        // You can add difficulty filtering here based on your Contentful schema
        // For example: { difficulty: { eq: difficulty } }
      },
    });
  }

  /**
   * Get routes by location
   */
  async getRoutesByLocation(
    location: string
  ): Promise<GetRouteCollectionQuery> {
    return this.getRoutes({
      where: {
        // You can add location filtering here based on your Contentful schema
        // For example: { startLocationName: { contains: location } }
      },
    });
  }

  /**
   * Search routes by title or description
   */
  async searchRoutes(searchTerm: string): Promise<GetRouteCollectionQuery> {
    return this.getRoutes({
      where: {
        // You can add search filtering here based on your Contentful schema
        // For example: { OR: [{ title: { contains: searchTerm } }, { description: { contains: searchTerm } }] }
      },
    });
  }

  /**
   * Get routes with pagination
   */
  async getRoutesPaginated(
    page: number = 1,
    pageSize: number = 10
  ): Promise<GetRouteCollectionQuery> {
    const skip = (page - 1) * pageSize;
    return this.getRoutes({
      limit: pageSize,
      skip,
    });
  }

  /**
   * Get routes ordered by a specific field
   */
  async getRoutesOrdered(
    orderBy: string,
    orderDirection: 'ASC' | 'DESC' = 'DESC'
  ): Promise<GetRouteCollectionQuery> {
    return this.getRoutes({
      order: [{ [orderBy]: orderDirection }] as any,
    });
  }
}

// Export a singleton instance
export const routeService = new RouteService();
