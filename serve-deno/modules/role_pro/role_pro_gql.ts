import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const roleProGql = gql`
  type RolePro {
    id: String
    name: String
    createdAt: Float
    updatedAt: Float
    createdBy: User
    updatedBy: User
    remark: String
    permissions: [String]
  }

  type RoleProAggregator {
    count: Int
  }

  type RoleProConnection {
    values: [RolePro]
    aggregate: RoleProAggregator
  }

  extend type Query  {
    roleProConnection(sort: String, limit: Int, start: Int, where: JSON): RoleProConnection
  }
`;
