// deno run -A --import-map=import_map.json ./mod.ts
import { Application, Router } from "oak/mod.ts";
import {
  graphqlPlayground,
  logger,
  oakAllowOrigin,
  oakJwtParse,
} from "qapi/oak_plugins/mod.ts";
import { oakSqliteGraphql } from "qapi/mod.ts";
import { oakSqliteGraphqlAuth } from "qapi/plugin/auth/mod.ts";
import {
  oakSqliteGraphqlPermission,
  oakSqliteGraphqlPermissionInit,
} from "qapi/middleware/permission/mod.ts";
import DexSqlite from "qapi/dex_sqlite/mod.ts";
import { qapiAppend } from "./append.ts";

const app = new Application();
const router = new Router();

router.get("/", (context) => {
  context.response.body = "home";
});

app.use(logger);
// 允许跨域设置
app.use(oakAllowOrigin);
// 解析cookie和header中的jwt
app.use(oakJwtParse);
app.use(graphqlPlayground());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(
  await oakSqliteGraphql({
    dex: DexSqlite({
      dbPath: Deno.env.get("PORT") || "C:\\yanjd\\db\\qapi-blog.db",
    }),
    async before(options: any) {
      const { root, dex } = options;

      // 接口覆盖
      const temp = root["postPro"];
      root["postPro"] = async (...args: any) => {
        let res = await temp(...args);
        // 访问次数自动加一
        res.readTime++;
        await dex("post").updateById(res.id, { readTime: res.readTime });
        return res;
      };
      await oakSqliteGraphqlPermissionInit(options);
    },
    plugins: [oakSqliteGraphqlAuth, qapiAppend],
    middlewares: [
      oakSqliteGraphqlPermission({ whiteList: ["mutation_login"] }),
    ],
  }),
);

const port = 8710;
console.log(`http://localhost:${port}/graphql`);
await app.listen({ port });
