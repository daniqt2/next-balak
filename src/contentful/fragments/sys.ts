import { gql } from '@apollo/client';

export const SYS_FRAGMENT = gql`
  fragment SysFields on Sys {
    id
    publishedAt
    firstPublishedAt
  }
`;
