import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const roleGql = gql`
  type Role {
    id: String
    name: String
    createdAt: Float
    updatedAt: Float
    createdBy: User
    updatedBy: User
    remark: String
    permissions(sort: String, limit: Int, start: Int, where: JSON): [Permission]
    users(sort: String, limit: Int, start: Int, where: JSON): [User]
  }

  input RoleInput {
    name:String
    createdAt:Float
    updatedAt:Float
    createdBy:String
    updatedBy:String
    remark:String
    permissions:[String]
    users:[String]
  }

  input createRoleInput {
    data: RoleInput
  }

  type createRolePayload {
    role: Role
  }
  
  input editRoleInput {
    name:String
    createdAt:Float
    updatedAt:Float
    createdBy:String
    updatedBy:String
    remark:String
    permissions:[String]
    users:[String]
  }
  
  input updateRoleInput {
    where: InputID,
    data: editRoleInput
  }
  
  type updateRolePayload {
    role: Role
  }

  input deleteRoleInput {
    where: InputID  
  }
  
  type deleteRolePayload {
    role: Role
  }
  
  type RoleAggregator {
    count: Int
  }
  
  type RoleConnection {
    values: [Role]
    aggregate: RoleAggregator 
  }
  
  extend type Query {
    role(id: ID!): Role
    roles(sort: String, limit: Int, start: Int, where: JSON): [Role]
    rolesConnection(sort: String, limit: Int, start: Int, where: JSON): RoleConnection
  }

  extend type Mutation {
    createRole(input: createRoleInput): createRolePayload
    updateRole(input: updateRoleInput): updateRolePayload
    deleteRole(input: deleteRoleInput): deleteRolePayload
  }
`;
