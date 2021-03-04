import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const postProGql = gql`
  type PostPro {
    id: String
    title: String
    createdAt: Float
    updatedAt: Float
    createdBy: User
    updatedBy: User
    markdown: String
    category: String
    intro: String
    releaseDate: Float
    status: Int
    readTime: Int
    html: String
    tags: [String]
  }
  
  type PostProAggregator {
    count: Int
  }

  type PostProConnection {
    values: [PostPro]
    aggregate: PostProAggregator
  }

  extend type Query {
    postPro(id: ID!): PostPro
    postsProConnection(sort: String, limit: Int, start: Int, where: JSON): PostProConnection
  }
`;
