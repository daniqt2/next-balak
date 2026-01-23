import { gql } from '@apollo/client';
import { SYS_FRAGMENT } from './sys';
import { ASSET_FRAGMENT } from './asset';
import { LOCATION_FRAGMENT } from './location';

export const COFFEE_STOP_FRAGMENT = gql`
  fragment CoffeeStopFields on InterestSpot {
    sys {
      ...SysFields
    }
    title
    description
    locationName
    location {
      ...LocationFields
    }
    headerImage {
      ...AssetFields
    }
  }
  ${SYS_FRAGMENT}
  ${ASSET_FRAGMENT}
  ${LOCATION_FRAGMENT}
`;
