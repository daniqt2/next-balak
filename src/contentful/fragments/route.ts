import { gql } from '@apollo/client';
import { SYS_FRAGMENT } from './sys';
import { ASSET_FRAGMENT, ASSET_BASIC_FRAGMENT } from './asset';
import { COFFEE_STOP_FRAGMENT } from './coffeeStop';
import { MOUNTAIN_FRAGMENT } from './mountain';
import { LOCATION_FRAGMENT } from './location';

export const ROUTE_FRAGMENT = gql`
  fragment RouteFields on Route {
    sys {
      ...SysFields
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
    stravaId
    gpx {
      ...AssetBasicFields
    }
    headerImage {
      ...AssetFields
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
        ...CoffeeStopFields
      }
    }
    interestSpotsCollection {
      items {
        ...MountainFields
      }
    }
    mountainsCollection {
      items {
        ...MountainFields
      }
    }
    collsCollection {
      items {
        __typename
        sys {
          id
        }
        startLocation
        length
        accumulatedHeight
        difficulty
        slopePercentage
        linkedFrom {
          entryCollection(limit: 5) {
            items {
              __typename
              sys {
                id
              }
              ... on Coll {
                name
                slug
                location {
                  ...LocationFields
                }
                header {
                  ...AssetFields
                }
              }
            }
          }
        }
      }
    }
  }
  ${SYS_FRAGMENT}
  ${ASSET_FRAGMENT}
  ${ASSET_BASIC_FRAGMENT}
  ${COFFEE_STOP_FRAGMENT}
  ${MOUNTAIN_FRAGMENT}
  ${LOCATION_FRAGMENT}
`;

export const ROUTE_BASIC_FRAGMENT = gql`
  fragment RouteBasicFields on Route {
    sys {
      ...SysFields
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
    stravaId
    gpx {
      ...AssetBasicFields
    }
    headerImage {
      ...AssetFields
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
  }
  ${SYS_FRAGMENT}
  ${ASSET_FRAGMENT}
  ${ASSET_BASIC_FRAGMENT}
`;
