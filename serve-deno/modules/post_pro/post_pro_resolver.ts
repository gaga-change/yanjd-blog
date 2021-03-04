import { findModelsSyncFactory } from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { UserService } from "../user/user_service.ts";
import { UserEntity } from "../user/user_entity.ts";

import { CategoryService } from "../category/category_service.ts";
import { CategoryEntity } from "../category/category_entity.ts";

import { PostProService } from "./post_pro_service.ts";
import {PostService} from "../post/post_service.ts";

const userService = new UserService();
const categoryService = new CategoryService();
const postProService = new PostProService();
const postService = new PostService();

const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);
const findCategorySync = findModelsSyncFactory<CategoryEntity>(
  categoryService.list.bind(categoryService),
);

export const postProResolver = {
  Query: {
    postPro: async (parent: any, { id }: { id: string }) => {
      const post = await postService.detail(id);
      if (!post) return null
      post.readTime = Number(post.readTime) || 0
      post.readTime ++
      await postService.update(id, {readTime: post.readTime})
      return post
    },
    postsProConnection: async (
      parent: any,
      options: any,
      context: any,
      info: any,
    ) => {
      const aggregate = Object.create({
        getCount: () => postProService.count(options),
      });
      return {
        values: await postProService.list(options),
        aggregate,
      };
    },
  },
  PostProAggregator: {
    async count(parent: any) {
      return parent.getCount();
    },
  },
  PostPro: {
    createdBy: async (parent: any) => {
      return findUserSync(parent.createdBy);
    },
    updatedBy: async (parent: any) => {
      return findUserSync(parent.updatedBy);
    },
  },
  Mutation: {},
};
