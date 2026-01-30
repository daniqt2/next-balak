import { gql } from '@apollo/client';

import { COLL_FRAGMENT } from '@/contentful/fragments/coll';

export const collCollectionQuery = gql`
  query GetCollCollection(
    $limit: Int
    $skip: Int
    $where: CollFilter
    $order: [CollOrder]
  ) {
    collCollection(limit: $limit, skip: $skip, where: $where, order: $order) {
      total
      skip
      limit
      items {
        ...CollFields
      }
    }
  }
  ${COLL_FRAGMENT}
`;

