import { gql } from '@apollo/client';
import { SYS_FRAGMENT } from './sys';
import { ASSET_FRAGMENT, ASSET_BASIC_FRAGMENT } from './asset';
import { COFFEE_STOP_FRAGMENT } from './coffeeStop';
import { MOUNTAIN_FRAGMENT } from './mountain';

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
  }
  ${SYS_FRAGMENT}
  ${ASSET_FRAGMENT}
  ${ASSET_BASIC_FRAGMENT}
  ${COFFEE_STOP_FRAGMENT}
  ${MOUNTAIN_FRAGMENT}
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
