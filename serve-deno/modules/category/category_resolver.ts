import { findModelsSyncFactory } from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { CategoryService } from "./category_service.ts";
import { UserService } from "../user/user_service.ts";
import { UserEntity } from "../user/user_entity.ts";

const categoryService = new CategoryService();
const userService = new UserService();

const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);

export const categoryResolver = {
  Query: {
    category: async (parent: any, { id }: { id: string }) => {
      return await categoryService.detail(id);
    },
    categories: async (parent: any, options: any, context: any, info: any) => {
      return await categoryService.list(options);
    },
    categoriesConnection: async (
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
  Category: {
    createdBy: async (parent: any) => {
      return findUserSync(parent.createdBy);
    },
    updatedBy: async (parent: any) => {
      return findUserSync(parent.updatedBy);
    },
  },
  Mutation: {
    createCategory: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.createdBy = ctx.state.user.id;
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.createdAt = Date.now();
      input.data.updatedAt = Date.now();
      const category = await categoryService.create(input.data);
      return { category };
    },
    updateCategory: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.updatedAt = Date.now();
      const category = await categoryService.update(
        input?.where?.id,
        input.data,
      );
      return { category };
    },
    deleteCategory: async (parent: any, { input }: any) => {
      const category = await categoryService.delete(input.where.id);
      return { category };
    },
  },
};
