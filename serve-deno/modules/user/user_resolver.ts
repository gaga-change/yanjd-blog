import { findModelsSyncFactory } from "https://gitee.com/yanjd/qapi/raw/0.6.8/dex_pro/mod.ts";
import { UserService } from "./user_service.ts";
import { RoleService } from "../role/role_service.ts";
import { RoleEntity } from "../role/role_entity.ts";

import { UserEntity } from "./user_entity.ts";

const userService = new UserService();
const roleService = new RoleService();

const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);

export const userResolver = {
  Query: {
    user: async (parent: any, { id }: { id: string }) => {
      return await userService.detail(id);
    },
    users: async (parent: any, options: any, context: any, info: any) => {
      return await userService.list(options);
    },
    usersConnection: async (
      parent: any,
      options: any,
      context: any,
      info: any,
    ) => {
      return {
        values: await userService.list(options),
        aggregate: {
          count: await userService.count(options),
        },
      };
    },
  },
  User: {
    createdBy: async (parent: any) => {
      return findUserSync(parent.createdBy);
    },
    updatedBy: async (parent: any) => {
      return findUserSync(parent.updatedBy);
    },
    roles: async (parent: any, options: any) => {
      return roleService.listByTable(options, {
        tableName: "user_role",
        tableKey: "roleId",
        otherKey: "userId",
        otherId: parent.id,
      });
    },
  },
  Mutation: {
    createUser: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.createdBy = ctx.state.user.id;
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.createdAt = Date.now();
      input.data.updatedAt = Date.now();
      const user = await userService.create(input.data);
      return { user };
    },
    updateUser: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.updatedAt = Date.now();
      const user = await userService.update(input?.where?.id, input.data);
      return { user };
    },
    deleteUser: async (parent: any, { input }: any) => {
      const user = await userService.delete(input.where.id);
      return { user };
    },
  },
};
