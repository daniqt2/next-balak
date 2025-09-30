import { apolloClient } from './apollo-client';
import { DocumentNode } from 'graphql';

export interface ContentfulFetcherOptions {
  variables?: Record<string, unknown>;
  errorPolicy?: 'none' | 'ignore' | 'all';
  fetchPolicy?: 'cache-first' | 'cache-only' | 'network-only' | 'no-cache' | 'standby';
}

export class ContentfulFetcher {
  private client = apolloClient;

  async query<T = unknown>(
    query: DocumentNode,
    options: ContentfulFetcherOptions = {}
  ): Promise<T> {
    try {
      const result = await this.client.query({
        query,
        variables: options.variables,
        errorPolicy: options.errorPolicy || 'all',
        fetchPolicy: options.fetchPolicy || 'cache-first',
      });

      if (result.errors && result.errors.length > 0) {
        console.warn('GraphQL errors:', result.errors);
      }

      return result.data;
    } catch (error) {
      console.error('Contentful fetch error:', error);
      throw new Error(`Failed to fetch data from Contentful: ${error}`);
    }
  }

  async queryWithCache<T = unknown>(
    query: DocumentNode,
    options: ContentfulFetcherOptions = {}
  ): Promise<T> {
    return this.query<T>(query, {
      ...options,
      fetchPolicy: 'cache-first',
    });
  }

  async queryFresh<T = unknown>(
    query: DocumentNode,
    options: ContentfulFetcherOptions = {}
  ): Promise<T> {
    return this.query<T>(query, {
      ...options,
      fetchPolicy: 'network-only',
    });
  }
}

export const contentfulFetcher = new ContentfulFetcher();

export const fetchFromContentful = contentfulFetcher.query.bind(contentfulFetcher);
