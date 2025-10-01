import { apolloClient } from './apollo-client';
import { DocumentNode } from 'graphql';

export interface ContentfulFetcherOptions {
  variables?: Record<string, unknown>;
  errorPolicy?: 'none' | 'ignore' | 'all';
  fetchPolicy?: 'cache-first' | 'cache-only' | 'network-only' | 'no-cache';
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

      if (result.error) {
        console.warn('GraphQL error:', result.error);
      }

      return result.data as T;
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
