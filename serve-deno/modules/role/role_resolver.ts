import { findModelsSyncFactory } from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { RoleService } from "./role_service.ts";
import { UserService } from "../user/user_service.ts";
import { UserEntity } from "../user/user_entity.ts";

import { PermissionService } from "../permission/permission_service.ts";
import { PermissionEntity } from "../permission/permission_entity.ts";

const roleService = new RoleService();
const userService = new UserService();
const permissionService = new PermissionService();

const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);

export const roleResolver = {
  Query: {
    role: async (parent: any, { id }: { id: string }) => {
      return await roleService.detail(id);
    },
    roles: async (parent: any, options: any, context: any, info: any) => {
      return await roleService.list(options);
    },
    rolesConnection: async (
      parent: any,
      options: any,
      context: any,
      info: any,
    ) => {
      return {
        values: await roleService.list(options),
        aggregate: {
          count: await roleService.count(options),
        },
      };
    },
  },
  Role: {
    createdBy: async (parent: any) => {
      return findUserSync(parent.createdBy);
    },
    updatedBy: async (parent: any) => {
      return findUserSync(parent.updatedBy);
    },
    permissions: async (parent: any, options: any) => {
      return permissionService.listByTable(options, {
        tableName: "role_permission",
        tableKey: "permissionId",
        otherKey: "roleId",
        otherId: parent.id,
      });
    },
    users: async (parent: any, options: any) => {
      return userService.listByTable(options, {
        tableName: "user_role",
        tableKey: "userId",
        otherKey: "roleId",
        otherId: parent.id,
      });
    },
  },
  Mutation: {
    createRole: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.createdBy = ctx.state.user.id;
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.createdAt = Date.now();
      input.data.updatedAt = Date.now();
      const role = await roleService.create(input.data);
      return { role };
    },
    updateRole: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.updatedAt = Date.now();
      const role = await roleService.update(input?.where?.id, input.data);
      return { role };
    },
    deleteRole: async (parent: any, { input }: any) => {
      const role = await roleService.delete(input.where.id);
      return { role };
    },
  },
};
