import { findModelsSyncFactory } from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { PermissionService } from "./permission_service.ts";
import { UserService } from "../user/user_service.ts";
import { UserEntity } from "../user/user_entity.ts";

import { RoleService } from "../role/role_service.ts";
import { RoleEntity } from "../role/role_entity.ts";

const permissionService = new PermissionService();
const userService = new UserService();
const roleService = new RoleService();

const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);

export const permissionResolver = {
  Query: {
    permission: async (parent: any, { id }: { id: string }) => {
      return await permissionService.detail(id);
    },
    permissions: async (parent: any, options: any, context: any, info: any) => {
      return await permissionService.list(options);
    },
    permissionsConnection: async (
      parent: any,
      options: any,
      context: any,
      info: any,
    ) => {
      return {
        values: await permissionService.list(options),
        aggregate: {
          count: await permissionService.count(options),
        },
      };
    },
  },
  Permission: {
    createdBy: async (parent: any) => {
      return findUserSync(parent.createdBy);
    },
    updatedBy: async (parent: any) => {
      return findUserSync(parent.updatedBy);
    },
    roles: async (parent: any, options: any) => {
      return roleService.listByTable(options, {
        tableName: "role_permission",
        tableKey: "roleId",
        otherKey: "permissionId",
        otherId: parent.id,
      });
    },
  },
  Mutation: {
    createPermission: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.createdBy = ctx.state.user.id;
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.createdAt = Date.now();
      input.data.updatedAt = Date.now();
      const permission = await permissionService.create(input.data);
      return { permission };
    },
    updatePermission: async (parent: any, { input }: any, ctx: any) => {
      if (ctx.state.user) {
        input.data.updatedBy = ctx.state.user.id;
      }
      input.data.updatedAt = Date.now();
      const permission = await permissionService.update(
        input?.where?.id,
        input.data,
      );
      return { permission };
    },
    deletePermission: async (parent: any, { input }: any) => {
      const permission = await permissionService.delete(input.where.id);
      return { permission };
    },
  },
};
