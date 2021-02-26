// deno run --allow-env --allow-read --allow-write --allow-net --unstable ./mod.ts
import { setSqliteDB } from "https://gitee.com/yanjd/qapi/raw/0.6.8/dex_pro/mod.ts";
import {
  OakGraphqlStart,
  RouterContext,
} from "https://gitee.com/yanjd/qapi/raw/0.6.8/oak_graphql_start/mod.ts";
import "./setting.ts";

setSqliteDB(Deno.env.get("DB_PATH") || "C:\\yanjd\\db\\qapi-test.db");

const oakGraphqlStart = new OakGraphqlStart({});
const router = await oakGraphqlStart.injectGraphql();
router.get("/", async (ctx: RouterContext) => {
  ctx.response.headers.set(
    "content-type",
    "text/html; Language=UTF-8;charset=UTF-8",
  );
  ctx.response.body = "<a href='./graphql'>graphql page</a>";
});
router.get("/favicon.ico", async (ctx: RouterContext) => {
  ctx.response.headers.set("location", "https://deno.land/favicon.ico");
  ctx.response.status = 302;
});
oakGraphqlStart.listen().then(() => {});
