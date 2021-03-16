// deno run -A --import-map=import_map.json ./mod.ts
import { Application, Router } from "oak/mod.ts";
import { graphqlPlayground } from "qapi/oak_graphql_playground/mod.ts";
import { logger } from "qapi/oak_logger/mod.ts";
import { oakSqliteGraphql } from "qapi/mod.ts";
import { oakSqliteGraphqlAuth } from "qapi/plugin/auth/mod.ts";
import { oakSqliteGraphqlPermission, oakSqliteGraphqlPermissionInit } from "qapi/middleware/permission/mod.ts";
import DexSqlite from "qapi/dex_sqlite/mod.ts";
import { JwtFactory } from "qapi/jwt/mod.ts";
import {qapiAppend} from "./append.ts";


const app = new Application();
const router = new Router();

router.get("/", (context) => {
  context.response.body = "home";
});

app.use(logger);
// 跨域设置
app.use(async (ctx: any, next: any) => {
  if (
    ctx.request.method === "OPTIONS"
  ) {
    ctx.response.body = "success";
  } else {
    await next();
  }

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
})

// 解析cookie和header中的jwt
app.use(async (ctx: any, next: any) => {
  let jwt = "";
  // 从请求头中获取token
  const authorization = ctx.request.headers.get("Authorization");
  if (
    authorization && authorization.length > 0 &&
    authorization.indexOf("Bearer ") === 0
  ) {
    jwt = authorization.substr(7);
  }
  // 从cookie中获取token
  if (!jwt) {
    jwt = ctx.cookies.get("jwt");
  }
  ctx.state.user = await new JwtFactory(Deno.env.get("APP_SECRET") || 'APP_SECRET').payload(
    jwt,
  );
  await next();
})

app.use(graphqlPlayground());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(await oakSqliteGraphql({
  dex: DexSqlite({
    dbPath: Deno.env.get("PORT") || "C:\\yanjd\\db\\qapi-blog.db"
  }),
  async before(options: any) {
    const {root, dex} = options

    const temp = root['postPro']
    root['postPro'] = async (...args: any) => {
      let res = await temp(...args)
      // 访问次数自动加一
      res.readTime ++
      await dex('post').updateById(res.id, {readTime: res.readTime})
      return res
    }
    await oakSqliteGraphqlPermissionInit(options)
  },
  plugins: [oakSqliteGraphqlAuth, qapiAppend],
  middlewares: [oakSqliteGraphqlPermission({whiteList: ['mutation_login']})]
}))

const port = 8710;
console.log(`http://localhost:${port}/graphql`);
await app.listen({ port });
