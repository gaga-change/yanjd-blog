import { OakGraphqlStartStatic } from "https://gitee.com/yanjd/qapi/raw/0.6.9/oak_graphql_start/mod.ts";
import { pluginAuth } from "https://gitee.com/yanjd/qapi/raw/0.6.9/plugin_auth/mod.ts";
import { pluginPermission } from "https://gitee.com/yanjd/qapi/raw/0.6.9/plugin_permission/mod.ts";

import { getSqliteDB } from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import * as gqlMap from "./modules/gqls.ts";
import * as resolverMap from "./modules/resolvers.ts";
import { UserService } from "./modules/user/user_service.ts";
import { authGql } from "./modules/auth/auth_gql.ts";

// Deno.env.set("DB_PATH", "C:\\yanjd\\db\\qapi-blog.db");
OakGraphqlStartStatic.port = Number(Deno.env.get("PORT")) || 8710;
OakGraphqlStartStatic.appendGqlMap(gqlMap);
OakGraphqlStartStatic.appendResolverMap(resolverMap);

OakGraphqlStartStatic.use(pluginAuth);
OakGraphqlStartStatic.use(pluginPermission);
pluginAuth.extendSqliteDB(getSqliteDB);
pluginPermission.extendSqliteDB(getSqliteDB);

OakGraphqlStartStatic.middlewareArr.push(async (ctx: any, next: any) => {
  await next();
  ctx.response.headers.set("Access-Control-Allow-Credentials", "true");
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,Origin,Accept",
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS",
  );
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Max-Age", 31536000);
});

// 改写部分接口，进行适配strapi
const authResolverResolver = OakGraphqlStartStatic.resolverMap["authResolver"];
const login = authResolverResolver.Mutation.login;
authResolverResolver.Mutation.login = async function (
  parent: any,
  args: any,
  ctx: any,
  info: any,
) {
  args.input.account = args.input?.identifier;
  const userService = new UserService();
  const { jwt } = await login(parent, args, ctx, info);
  const id = ctx.state.user?.id;
  let user = null;
  if (id) {
    const temp = await userService.detail(id);
    if (temp) {
      user = {
        ...temp,
        username: temp.name,
      };
    }
  }
  return {
    jwt,
    user,
  };
};
authResolverResolver.Query.me = async function (
  parent: any,
  args: any,
  ctx: any,
) {
  const userService = new UserService();
  const id = ctx.state.user?.id;
  if (id) {
    const user = await userService.detail(id);
    if (user) {
      return {
        ...user,
        username: user?.name,
      };
    }
  } else {
    return null;
  }
};
OakGraphqlStartStatic.appendGqlMap({ authGql }); // gql覆盖
