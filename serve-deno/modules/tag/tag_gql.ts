import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const tagGql = gql`
  type Tag {
    id: String
    name: String
    createdAt: Float
    updatedAt: Float
    createdBy: User
    updatedBy: User
    remark: String
    posts(sort: String, limit: Int, start: Int, where: JSON): [Post]
  }

  input TagInput {
    name:String
    createdAt:Float
    updatedAt:Float
    createdBy:String
    updatedBy:String
    remark:String
    posts:[String]
  }

  input createTagInput {
    data: TagInput
  }

  type createTagPayload {
    tag: Tag
  }
  
  input editTagInput {
    name:String
    createdAt:Float
    updatedAt:Float
    createdBy:String
    updatedBy:String
    remark:String
    posts:[String]
  }
  
  input updateTagInput {
    where: InputID,
    data: editTagInput
  }
  
  type updateTagPayload {
    tag: Tag
  }

  input deleteTagInput {
    where: InputID  
  }
  
  type deleteTagPayload {
    tag: Tag
  }
  
  type TagAggregator {
    count: Int
  }
  
  type TagConnection {
    values: [Tag]
    aggregate: TagAggregator 
  }
  
  extend type Query {
    tag(id: ID!): Tag
    tags(sort: String, limit: Int, start: Int, where: JSON): [Tag]
    tagsConnection(sort: String, limit: Int, start: Int, where: JSON): TagConnection
  }

  extend type Mutation {
    createTag(input: createTagInput): createTagPayload
    updateTag(input: updateTagInput): updateTagPayload
    deleteTag(input: deleteTagInput): deleteTagPayload
  }
`;
