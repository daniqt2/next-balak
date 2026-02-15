import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Use NEXT_PUBLIC_* so both server and client work; optionally set CONTENTFUL_* (no NEXT_PUBLIC_) on server for token security
const spaceId =
  process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
  process.env.CONTENTFUL_SPACE_ID ||
  process.env.NUXT_PUBLIC_SPACE_ID;
const accessToken =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
  process.env.CONTENTFUL_ACCESS_TOKEN ||
  process.env.NUXT_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error(
    'Missing Contentful env: set NEXT_PUBLIC_CONTENTFUL_SPACE_ID and NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN'
  );
}

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export const getApolloClient = () => apolloClient;
