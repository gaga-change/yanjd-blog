import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import { cryptoPassword } from "https://gitee.com/yanjd/qapi/raw/0.6.8/password_tools/mod.ts";
import {
  findModelsSyncFactory,
  Model,
} from "https://gitee.com/yanjd/qapi/raw/0.6.8/dex_pro/mod.ts";
import { UserService } from "../user/user_service.ts";
import { UserEntity } from "../user/user_entity.ts";
const userService = new UserService();
const findUserSync = findModelsSyncFactory<UserEntity>(
  userService.list.bind(userService),
);
export const userProResolver = {
  Query: {
    async userProConnection(
      parent: any,
      options: any,
      context: any,
      info: any,
    ) {
      const model = new Model("user_pro", []);
      const aggregate = Object.create({
        getCount: () => model.count(options),
      });
      return {
        values: (await model.list(options)).map((v: any) => ({
          ...v,
          roles: v.roles ? v.roles.split(",") : [],
        })),
        aggregate,
      };
    },
  },
  UserProAggregator: {
    async count(parent: any) {
      return parent.getCount();
    },
  },
  UserPro: {
    createdBy: async (parent: any) => {
      return findUserSync(parent.createdBy);
    },
    updatedBy: async (parent: any) => {
      return findUserSync(parent.updatedBy);
    },
  },
  Mutation: {
    /**
     * 重置用户密码
     * @param parent
     * @param id
     * @param pwd
     * @param ctx
     */
    async userResetPassword(parent: any, { id, pwd }: any, ctx: any) {
      if (!pwd) throw new GQLError({ type: "pwd不能为空" });
      const { password, salt } = cryptoPassword(pwd);
      await userService.update(id, { password, salt });
      return true;
    },
  },
};
