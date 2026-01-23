import { gql } from '@apollo/client';

export const ASSET_FRAGMENT = gql`
  fragment AssetFields on Asset {
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
`;

export const ASSET_BASIC_FRAGMENT = gql`
  fragment AssetBasicFields on Asset {
    sys {
      id
    }
    title
    description
    url
    fileName
    contentType
  }
`;
