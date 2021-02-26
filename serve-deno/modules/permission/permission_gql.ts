import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const permissionGql = gql`
  type Permission {
    id: String
    name: String
    type: Int
    createdAt: Float
    updatedAt: Float
    createdBy: User
    updatedBy: User
    remark: String
    roles(sort: String, limit: Int, start: Int, where: JSON): [Role]
  }

  input PermissionInput {
    name:String
    type:Int
    createdAt:Float
    updatedAt:Float
    createdBy:String
    updatedBy:String
    remark:String
    roles:[String]
  }

  input createPermissionInput {
    data: PermissionInput
  }

  type createPermissionPayload {
    permission: Permission
  }
  
  input editPermissionInput {
    name:String
    type:Int
    createdAt:Float
    updatedAt:Float
    createdBy:String
    updatedBy:String
    remark:String
    roles:[String]
  }
  
  input updatePermissionInput {
    where: InputID,
    data: editPermissionInput
  }
  
  type updatePermissionPayload {
    permission: Permission
  }

  input deletePermissionInput {
    where: InputID  
  }
  
  type deletePermissionPayload {
    permission: Permission
  }
  
  type PermissionAggregator {
    count: Int
  }
  
  type PermissionConnection {
    values: [Permission]
    aggregate: PermissionAggregator 
  }
  
  extend type Query {
    permission(id: ID!): Permission
    permissions(sort: String, limit: Int, start: Int, where: JSON): [Permission]
    permissionsConnection(sort: String, limit: Int, start: Int, where: JSON): PermissionConnection
  }

  extend type Mutation {
    createPermission(input: createPermissionInput): createPermissionPayload
    updatePermission(input: updatePermissionInput): updatePermissionPayload
    deletePermission(input: deletePermissionInput): deletePermissionPayload
  }
`;
