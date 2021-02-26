import { gql } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";

export const categoryGql = gql`
  type Category {
    id: String
    name: String
    createdBy: User
    updatedBy: User
    createdAt: Float
    updatedAt: Float
    remark: String
  }

  input CategoryInput {
    name:String
    createdBy:String
    updatedBy:String
    createdAt:Float
    updatedAt:Float
    remark:String
  }

  input createCategoryInput {
    data: CategoryInput
  }

  type createCategoryPayload {
    category: Category
  }
  
  input editCategoryInput {
    name:String
    createdBy:String
    updatedBy:String
    createdAt:Float
    updatedAt:Float
    remark:String
  }
  
  input updateCategoryInput {
    where: InputID,
    data: editCategoryInput
  }
  
  type updateCategoryPayload {
    category: Category
  }

  input deleteCategoryInput {
    where: InputID  
  }
  
  type deleteCategoryPayload {
    category: Category
  }
  
  type CategoryAggregator {
    count: Int
  }
  
  type CategoryConnection {
    values: [Category]
    aggregate: CategoryAggregator 
  }
  
  extend type Query {
    category(id: ID!): Category
    categories(sort: String, limit: Int, start: Int, where: JSON): [Category]
    categoriesConnection(sort: String, limit: Int, start: Int, where: JSON): CategoryConnection
  }

  extend type Mutation {
    createCategory(input: createCategoryInput): createCategoryPayload
    updateCategory(input: updateCategoryInput): updateCategoryPayload
    deleteCategory(input: deleteCategoryInput): deleteCategoryPayload
  }
`;
