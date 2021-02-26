import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const authGql = gql`
  type MeRole {
    name: String
  }
  
  type Me {
    id: String
    username: String
    avatar: String
    email: String
    role: MeRole
  }
  
  type loginPayload {
#    success: Boolean
    jwt: String
    user: Me
  }
  
  type registerPayload {
    success: Boolean
  }
  
  type updateEmailPayload {
    success: Boolean
  }
  
  type updateNamePayload {
    success: Boolean
  }
  
  type updatePasswordPayload {
    success: Boolean
  }
  
  type logoutPayload {
    success: Boolean
  }
  
  input loginInput {
    account: String
    password: String
  }
  
  input registerInput {
    email: String
    name: String
    password: String
  }
  
  input updateEmailInput {
    email: String
  }
  
  input updateNameInput {
    name: String
  }
  
  input updatePasswordInput {
    password: String
  }
  
  input UsersPermissionsLoginInput {
    identifier: String,
    password: String
  }
  
  extend type Query {
    me: Me
  }
  
  extend type Mutation {
#    login(input: loginInput): loginPayload
    login(input: UsersPermissionsLoginInput): loginPayload
    logout: logoutPayload
    register(input: registerInput): registerPayload
    updateEmail(input: updateEmailInput): updateEmailPayload
    updateName(input: updateNameInput): updateNamePayload
    updatePassword(input: updatePasswordInput): updatePasswordPayload
  }
`;
