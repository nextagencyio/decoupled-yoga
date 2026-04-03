/**
 * Typed client with route query covering all content types.
 *
 * Run `npx decoupled-cli schema sync` after connecting to a Drupal space
 * to regenerate if the schema changes.
 */

import type { DecoupledClient } from 'decoupled-client'
import type { DrupalNode } from 'decoupled-client'
import type { QueryOptions } from 'decoupled-client'

// Placeholder types — sync-schema will replace with actual content types
export type ContentNode = DrupalNode
export type ContentTypeName = string

export interface ContentTypeMap {
  [key: string]: DrupalNode
}

export interface TypedClient {
  getEntries<K extends ContentTypeName>(type: K, options?: QueryOptions): Promise<DrupalNode[]>
  getEntry<K extends ContentTypeName>(type: K, id: string): Promise<DrupalNode | null>
  getEntryByPath(path: string): Promise<ContentNode | null>
  raw<T = any>(query: string, variables?: Record<string, any>): Promise<T>
}

const ROUTE_QUERY = `
  query ($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            __typename id title path body { processed }
          }
          ... on NodeHomepage {
            __typename id title path
            heroTitle heroSubtitle
            heroDescription { processed }
            featuresItems {
              ... on ParagraphFeatureItem { id title description { processed } icon }
            }
            ctaTitle ctaDescription { processed } ctaPrimary ctaSecondary
          }
          ... on NodeClass {
            __typename id title path
            body { processed summary }
            classLevel duration schedule
            image { url alt width height variations(styles: [LARGE, MEDIUM, THUMBNAIL]) { name url width height } }
          }
          ... on NodeInstructor {
            __typename id title path
            body { processed summary }
            specialty email certifications
            photo { url alt width height variations(styles: [LARGE, MEDIUM, THUMBNAIL]) { name url width height } }
          }
          ... on NodeRetreat {
            __typename id title path
            body { processed summary }
            retreatDate { timestamp } endDate { timestamp }
            location price
            image { url alt width height variations(styles: [LARGE, MEDIUM, THUMBNAIL]) { name url width height } }
          }
        }
      }
    }
  }
`

// Factory — uses route query with all content types
export function createTypedClient(client: DecoupledClient): TypedClient {
  return {
    async getEntries() { return [] },
    async getEntry() { return null },
    async getEntryByPath(path) {
      return client.queryByPath(path, ROUTE_QUERY)
    },
    async raw(query, variables) { return client.query(query, variables) },
  }
}
