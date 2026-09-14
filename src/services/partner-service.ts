import { contentfulFetcher } from '@/lib/contentful-fetcher';
import { Query, PartnerFilter, PartnerOrder } from '@/contentful-types';
import { gql } from '@apollo/client';

const GET_PARTNER_COLLECTION = gql`
  query GetPartnerCollection(
    $limit: Int
    $skip: Int
    $where: PartnerFilter
    $order: [PartnerOrder]
  ) {
    partnerCollection(limit: $limit, skip: $skip, where: $where, order: $order) {
      total
      skip
      limit
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        __typename
        title
        description
        instagram
        web
        image {
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
  }
`;

export interface PartnerServiceOptions {
  limit?: number;
  skip?: number;
  where?: PartnerFilter;
  order?: PartnerOrder[];
}

export class PartnerService {
  /** Newest first; the 01 / 02 markers follow display order. */
  async getPartners(options: PartnerServiceOptions = {}): Promise<Query> {
    const {
      limit = 20,
      skip = 0,
      where,
      order = [PartnerOrder.SysFirstPublishedAtDesc],
    } = options;

    return contentfulFetcher.query<Query>(GET_PARTNER_COLLECTION, {
      variables: { limit, skip, where, order },
    });
  }
}

export const partnerService = new PartnerService();
