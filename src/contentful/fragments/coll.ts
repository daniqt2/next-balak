import { gql } from '@apollo/client';

import { SYS_FRAGMENT } from './sys';
import { ASSET_FRAGMENT } from './asset';
import { LOCATION_FRAGMENT } from './location';

export const COLL_FRAGMENT = gql`
  fragment CollFields on Coll {
    sys {
      ...SysFields
    }
    __typename
    name
    slug
    description {
      json
    }
    variantsCollection(limit: 2) {
      items {
        __typename
        sys {
          id
        }
        ... on CollVariant {
          startLocation
          length
          slopePercentage
          difficulty
        }
      }
    }
    location {
      ...LocationFields
    }
    header {
      ...AssetFields
    }
  }
  ${SYS_FRAGMENT}
  ${ASSET_FRAGMENT}
  ${LOCATION_FRAGMENT}
`;
