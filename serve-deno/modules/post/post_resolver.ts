import { findModelsSyncFactory } from "https://gitee.com/yanjd/qapi/raw/0.6.8/dex_pro/mod.ts";
import { PostService } from "./post_service.ts";
import { UserService } from "../user/user_service.ts";
import { UserEntity } from "../user/user_entity.ts";

import { CategoryService } from "../category/category_service.ts";
import { CategoryEntity } from "../category/category_entity.ts";

import { TagService } from "../tag/tag_service.ts";
import { TagEntity } from "../tag/tag_entity.ts";

const postService = new PostService();
const userService = new UserService();
const categoryService = new CategoryService();
const tagService = new TagService();

const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);
const findCategorySync = findModelsSyncFactory<CategoryEntity>(
  categoryService.list.bind(categoryService),
);

export const postResolver = {
  Query: {
    post: async (parent: any, { id }: { id: string }) => {
      return await postService.detail(id);
    },
    posts: async (parent: any, options: any, context: any, info: any) => {
      return await postService.list(options);
    },
    postsConnection: async (
      parent: any,
      options: any,
      context: any,
      info: any,
    ) => {
      return {
        values: await postService.list(options),
        aggregate: {
          count: await postService.count(options),
        },
      };
    },
  },
  Post: {
    createdBy: async (parent: any) => {
      return findUserSync(parent.createdBy);
    },
    updatedBy: async (parent: any) => {
      return findUserSync(parent.updatedBy);
    },
    category: async (parent: any) => {
      return findCategorySync(parent.category);
    },
    tags: async (parent: any, options: any) => {
      return tagService.listByTable(options, {
        tableName: "post_tag",
        tableKey: "tagId",
        otherKey: "postId",
        otherId: parent.id,
      });
    },
  },
  Mutation: {
    createPost: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.createdBy = ctx.state.user.id;
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.createdAt = Date.now();
      input.data.updatedAt = Date.now();
      const post = await postService.create(input.data);
      return { post };
    },
    updatePost: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.updatedAt = Date.now();
      const post = await postService.update(input?.where?.id, input.data);
      return { post };
    },
    deletePost: async (parent: any, { input }: any) => {
      const post = await postService.delete(input.where.id);
      return { post };
    },
  },
};
