import { gql } from '@apollo/client';
import { ROUTE_FRAGMENT, ROUTE_BASIC_FRAGMENT } from '../fragments/route';

export const GET_ROUTE_COLLECTION = gql`
  query GetRouteCollection($limit: Int, $skip: Int, $where: RouteFilter, $order: [RouteOrder]) {
    routeCollection(limit: $limit, skip: $skip, where: $where, order: $order) {
      total
      skip
      limit
      items {
        ...RouteFields
      }
    }
  }
  ${ROUTE_FRAGMENT}
`;

export const GET_ROUTE_BY_SLUG = gql`
  query GetRouteBySlug($slug: String!) {
    routeCollection(where: { slug: $slug }, limit: 1) {
      items {
        ...RouteFields
      }
    }
  }
  ${ROUTE_FRAGMENT}
`;

export const GET_FEATURED_ROUTES = gql`
  query GetFeaturedRoutes($limit: Int = 6) {
    routeCollection(limit: $limit, order: [sys_publishedAt_DESC]) {
      items {
        ...RouteBasicFields
      }
    }
  }
  ${ROUTE_BASIC_FRAGMENT}
`;
