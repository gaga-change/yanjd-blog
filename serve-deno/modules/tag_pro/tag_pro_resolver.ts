import { findModelsSyncFactory } from "https://gitee.com/yanjd/qapi/raw/0.6.8/dex_pro/mod.ts";
import { TagService } from "../tag/tag_service.ts";
import { UserService } from "../user/user_service.ts";
import { UserEntity } from "../user/user_entity.ts";

import { PostService } from "../post/post_service.ts";
import { PostEntity } from "../post/post_entity.ts";
import { TagProService } from "./tag_pro_service.ts";

const tagService = new TagService();
const tagProService = new TagProService();
const userService = new UserService();
const postService = new PostService();

const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);

export const tagProResolver = {
  Query: {
    tagsProConnection: async (
      parent: any,
      options: any,
      context: any,
      info: any,
    ) => {
      return {
        values: await tagProService.list(options),
        aggregate: {
          count: await tagService.count(options),
        },
      };
    },
  },
  TagPro: {
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
  Mutation: {},
};
