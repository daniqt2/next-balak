import { gql } from '@apollo/client';

export const LOCATION_FRAGMENT = gql`
  fragment LocationFields on Location {
    lat
    lon
  }
`;
