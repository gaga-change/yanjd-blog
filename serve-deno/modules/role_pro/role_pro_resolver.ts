import {
  findModelsSyncFactory,
  Model,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { UserService } from "../user/user_service.ts";
import { UserEntity } from "../user/user_entity.ts";
const userService = new UserService();
const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);
export const roleProResolver = {
  Query: {
    async roleProConnection(
      parent: any,
      options: any,
      context: any,
      info: any,
    ) {
      const model = new Model("role_pro", []);
      const aggregate = Object.create({
        getCount: () => model.count(options),
      });
      return {
        values: (await model.list(options)).map((v: any) => ({
          ...v,
          permissions: v.permissions ? v.permissions.split(",") : [],
        })),
        aggregate,
      };
    },
  },
  RoleProAggregator: {
    async count(parent: any) {
      return parent.getCount();
    },
  },
  RolePro: {
    createdBy: async (parent: any) => {
      return findUserSync(parent.createdBy);
    },
    updatedBy: async (parent: any) => {
      return findUserSync(parent.updatedBy);
    },
  },
  Mutation: {},
};
