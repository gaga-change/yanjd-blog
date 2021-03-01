import { findModelsSyncFactory } from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { CategoryProService } from "./category_pro_service.ts";
import { UserService } from "../user/user_service.ts";
import { UserEntity } from "../user/user_entity.ts";

const categoryService = new CategoryProService();
const userService = new UserService();

const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);

export const categoryProResolver = {
  Query: {
    categoryProConnection: async (
      parent: any,
      options: any,
      context: any,
      info: any,
    ) => {
      return {
        values: await categoryService.list(options),
        aggregate: {
          count: await categoryService.count(options),
        },
      };
    },
  },
  CategoryPro: {
    createdBy: async (parent: any) => {
      return findUserSync(parent.createdBy);
    },
    updatedBy: async (parent: any) => {
      return findUserSync(parent.updatedBy);
    },
  },
  Mutation: {},
};
