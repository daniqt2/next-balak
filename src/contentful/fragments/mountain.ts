import { gql } from '@apollo/client';
import { SYS_FRAGMENT } from './sys';
import { ASSET_FRAGMENT } from './asset';
import { LOCATION_FRAGMENT } from './location';

export const MOUNTAIN_FRAGMENT = gql`
  fragment MountainFields on InterestSpot {
    sys {
      ...SysFields
    }
    title
    description
    locationName
    location {
      ...LocationFields
    }
    mountainDifficulty
    mountainLength
    mountainElevationGain
    headerImage {
      ...AssetFields
    }
  }
  ${SYS_FRAGMENT}
  ${ASSET_FRAGMENT}
  ${LOCATION_FRAGMENT}
`;
