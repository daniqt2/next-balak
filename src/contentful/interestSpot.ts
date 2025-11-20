import { gql } from '@apollo/client';

export const interestSpotCollectionQuery = gql`
  query getInterestSpotCollection(
    $limit: Int
    $skip: Int
    $where: InterestSpotFilter
    $order: [InterestSpotOrder]
  ) {
    interestSpotCollection(
      limit: $limit
      skip: $skip
      where: $where
      order: $order
    ) {
      total
      skip
      limit
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        type
        __typename
        title
        description
        locationName
        mountainLength
        mountainElevationGain
        mountainDifficulty
        location {
          lat
          lon
        }
        headerImage {
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
        linkedFrom {
          routeCollection {
            total
            items {
              sys {
                id
              }
              title
              slug
              subTitle
              length
              elevation
              time
              headerImage {
                sys {
                  id
                }
                title
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
