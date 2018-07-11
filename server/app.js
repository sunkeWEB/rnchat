const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');
const util = require('util');
const config = require('./config');
const verify = util.promisify(jwt.verify); // 解密
const secret = config.secret;
const index = require('./routes/index');
const users = require('./routes/users');
const cors = require('koa2-cors');
const tokenAuth = require('./middlreware/tokenAuth');
// error handler
onerror(app);
app.use(cors());
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/static'));


// 使用token验证
// app.use(tokenAuth());
//数组中的路径不需要通过jwt验证
// console.log("koa-jwt ",jwtKoa({secret}).unless({path: [/^\/api\/login/]}));
// app.use(jwtKoa({secret}).unless({path: [/^\/api\/login/]}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
