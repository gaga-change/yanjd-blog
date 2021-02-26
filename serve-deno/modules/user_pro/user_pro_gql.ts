import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const userProGql = gql`
  
  type UserPro {
    id: String
    name: String
    password: String
    salt: String
    email: String
    createdAt: Float
    updatedAt: Float
    createdBy: User
    updatedBy: User
    remark: String
    avatar: String
    roles: [String]
  }
  
  type UserProAggregator {
    count: Int
  }
  
  type UserProConnection {
    values: [UserPro]
    aggregate: UserProAggregator
  }
  
  extend type Query  {
    userProConnection(sort: String, limit: Int, start: Int, where: JSON): UserProConnection
  }
  
  extend type Mutation {
    userResetPassword(id: ID, pwd: String): Boolean
  }
`;
