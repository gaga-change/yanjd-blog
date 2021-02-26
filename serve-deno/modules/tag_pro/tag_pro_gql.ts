import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const tagProGql = gql`

  type TagPro {
    id: String
    name: String
    createdAt: Float
    updatedAt: Float
    createdBy: User
    updatedBy: User
    remark: String
    posts(sort: String, limit: Int, start: Int, where: JSON): [Post]
    postCount: Int
  }
  
  type TagProConnection {
    values: [TagPro]
    aggregate: TagAggregator
  }
  
  extend type Query {
#    tagPro(id: ID!): Tag
#    tagsPro(sort: String, limit: Int, start: Int, where: JSON): [Tag]
    tagsProConnection(sort: String, limit: Int, start: Int, where: JSON): TagProConnection
  }
  
`;
