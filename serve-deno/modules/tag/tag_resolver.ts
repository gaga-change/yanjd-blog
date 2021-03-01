import { findModelsSyncFactory } from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { TagService } from "./tag_service.ts";
import { UserService } from "../user/user_service.ts";
import { UserEntity } from "../user/user_entity.ts";

import { PostService } from "../post/post_service.ts";
import { PostEntity } from "../post/post_entity.ts";

const tagService = new TagService();
const userService = new UserService();
const postService = new PostService();

const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);

export const tagResolver = {
  Query: {
    tag: async (parent: any, { id }: { id: string }) => {
      return await tagService.detail(id);
    },
    tags: async (parent: any, options: any, context: any, info: any) => {
      return await tagService.list(options);
    },
    tagsConnection: async (
      parent: any,
      options: any,
      context: any,
      info: any,
    ) => {
      return {
        values: await tagService.list(options),
        aggregate: {
          count: await tagService.count(options),
        },
      };
    },
  },
  Tag: {
    createdBy: async (parent: any) => {
      return findUserSync(parent.createdBy);
    },
    updatedBy: async (parent: any) => {
      return findUserSync(parent.updatedBy);
    },
    posts: async (parent: any, options: any) => {
      return postService.listByTable(options, {
        tableName: "post_tag",
        tableKey: "postId",
        otherKey: "tagId",
        otherId: parent.id,
      });
    },
  },
  Mutation: {
    createTag: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.createdBy = ctx.state.user.id;
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.createdAt = Date.now();
      input.data.updatedAt = Date.now();
      const tag = await tagService.create(input.data);
      return { tag };
    },
    updateTag: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.updatedAt = Date.now();
      const tag = await tagService.update(input?.where?.id, input.data);
      return { tag };
    },
    deleteTag: async (parent: any, { input }: any) => {
      const tag = await tagService.delete(input.where.id);
      return { tag };
    },
  },
};
