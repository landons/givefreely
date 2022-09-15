// TODO: import as namespaces
import Koa from "koa";
import * as Router from "koa-router";
import * as logger from "koa-logger";
import * as json from "koa-json";
import cors from "@koa/cors";

const app = new Koa();

const router = new Router();

// Hello world
router.get("/", async (ctx, next) => {
  ctx.body = { msg: `Hello world! ${new Date().getTime()}` };

  await next();
});

// Middlewares
app.use(logger());
app.use(cors({
  // TODO: change me!
  origin: '*',
}));
app.use(json());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Koa started");
});
