import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const categoryProGql = gql`
  type CategoryPro {
    id: String
    name: String
    createdBy: User
    updatedBy: User
    createdAt: Float
    updatedAt: Float
    postCount: Int
    remark: String
  }
  
  type CategoryProAggregator {
    count: Int
  }
  
  type CategoryProConnection {
    values: [CategoryPro]
    aggregate: CategoryProAggregator 
  }
  
  extend type Query {
    categoryProConnection(sort: String, limit: Int, start: Int, where: JSON): CategoryProConnection
  }
  
`;
