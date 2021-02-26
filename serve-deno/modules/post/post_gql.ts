import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const postGql = gql`
  type Post {
    id: String
    title: String
    createdAt: Float
    updatedAt: Float
    createdBy: User
    updatedBy: User
    markdown: String
    category: Category
    intro: String
    releaseDate: Float
    status: Int
    readTime: Int
    html: String
    tags(sort: String, limit: Int, start: Int, where: JSON): [Tag]
  }

  input PostInput {
    title:String
    createdAt:Float
    updatedAt:Float
    createdBy:String
    updatedBy:String
    markdown:String
    category:String
    intro:String
    releaseDate:Float
    status:Int
    readTime:Int
    html:String
    tags:[String]
  }

  input createPostInput {
    data: PostInput
  }

  type createPostPayload {
    post: Post
  }
  
  input editPostInput {
    title:String
    createdAt:Float
    updatedAt:Float
    createdBy:String
    updatedBy:String
    markdown:String
    category:String
    intro:String
    releaseDate:Float
    status:Int
    readTime:Int
    html:String
    tags:[String]
  }
  
  input updatePostInput {
    where: InputID,
    data: editPostInput
  }
  
  type updatePostPayload {
    post: Post
  }

  input deletePostInput {
    where: InputID  
  }
  
  type deletePostPayload {
    post: Post
  }
  
  type PostAggregator {
    count: Int
  }
  
  type PostConnection {
    values: [Post]
    aggregate: PostAggregator 
  }
  
  extend type Query {
    post(id: ID!): Post
    posts(sort: String, limit: Int, start: Int, where: JSON): [Post]
    postsConnection(sort: String, limit: Int, start: Int, where: JSON): PostConnection
  }

  extend type Mutation {
    createPost(input: createPostInput): createPostPayload
    updatePost(input: updatePostInput): updatePostPayload
    deletePost(input: deletePostInput): deletePostPayload
  }
`;
