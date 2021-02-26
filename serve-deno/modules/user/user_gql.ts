import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const userGql = gql`
  type User {
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
    roles(sort: String, limit: Int, start: Int, where: JSON): [Role]
  }

  input UserInput {
    name:String
    password:String
    salt:String
    email:String
    createdAt:Float
    updatedAt:Float
    createdBy:String
    updatedBy:String
    remark:String
    avatar:String
    roles:[String]
  }

  input createUserInput {
    data: UserInput
  }

  type createUserPayload {
    user: User
  }
  
  input editUserInput {
    name:String
    password:String
    salt:String
    email:String
    createdAt:Float
    updatedAt:Float
    createdBy:String
    updatedBy:String
    remark:String
    avatar:String
    roles:[String]
  }
  
  input updateUserInput {
    where: InputID,
    data: editUserInput
  }
  
  type updateUserPayload {
    user: User
  }

  input deleteUserInput {
    where: InputID  
  }
  
  type deleteUserPayload {
    user: User
  }
  
  type UserAggregator {
    count: Int
  }
  
  type UserConnection {
    values: [User]
    aggregate: UserAggregator 
  }
  
  extend type Query {
    user(id: ID!): User
    users(sort: String, limit: Int, start: Int, where: JSON): [User]
    usersConnection(sort: String, limit: Int, start: Int, where: JSON): UserConnection
  }

  extend type Mutation {
    createUser(input: createUserInput): createUserPayload
    updateUser(input: updateUserInput): updateUserPayload
    deleteUser(input: deleteUserInput): deleteUserPayload
  }
`;
