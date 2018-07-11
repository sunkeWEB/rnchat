const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-json');
const util = require('util');
const verify = util.promisify(jwt.verify) // 解密
const config = require('./../config');
const secret = config.secret;

/**
 * 判断token是否可用
 */

module.exports = function () {
    return async function (ctx, next) {
        let payload = '';
        try {
            let token = ctx.header.authorization; // token
            // if (!token) throw new Error();  // token 不存在
            let url = ctx.request.url; // 请求路由
            let nextP = config.publicPath.includes(url);
            if (!nextP) {
                payload = await verify(token.split(' ')[1], secret);
                let userid = payload.id;
                if (userid) {
                    await next();
                }else{
                    ctx.body = {code: 1003, msg: '无权限访问'};
                    return;
                }
            } else {  //  不需要验证的路由
                await next();
            }
            // payload = await verify(token.split(' ')[1], secret);  // // 解密，获取payload payload  {name:'1,root'} 1是用户的id root是他的登录名
            // let userid = payload.id;
        } catch (e) {
            ctx.body = {
                code: 10005,
                msg: 'token不存在',
                data: []
            };
        }
    }
};