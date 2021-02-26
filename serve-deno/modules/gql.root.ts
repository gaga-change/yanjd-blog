import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const rootGql = gql`
  scalar JSON
  input InputID {
    id: ID!
  }
  type Query
  type Mutation
`;
