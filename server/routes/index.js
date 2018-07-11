const router = require('koa-router')();
const config = require('./../config');
const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');
const util = require('util');
const verify = util.promisify(jwt.verify); // 解密
const secret = config.secret;
const {query} = require('./../asyncmysql');
let sql = ''; // 执行的sql
router.get('/', async (ctx, next) => {
    ctx.body = {msg: 'success'}
});


router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
});

router.post('/register', async ctx => {
    let {pname, pwd} = {...ctx.request.body};
    try {
        if (!pname || !pwd) return returnCode(ctx, 1006, "参数错误");
        if (pwd.length < 6) return returnCode(ctx, 1006, "密码最少6位");
        let ips = ctx.request.ip.slice(7);
        let index = Math.floor((Math.random() * config.tabs.length));
        sql = `insert into users(pname,pwd,tabs,ip) values('${pname}',md5('${config.md5Key}${pwd}'),'${config.tabs[index]}','${ips}')`;
        let state = await query(sql);
        ctx.body = {
            code: 100,
            msg: "注册成功"

        }
    } catch (e) {
        if (e.code === "ER_DUP_ENTRY") {
            returnCode(ctx, 1008, `${pname}已经存在`);
            return;
        }
        returnCode(ctx);
    }
});

router.post('/login', async ctx => {
    console.log("Login");
    let {pname, pwd} = {...ctx.request.body};
    try {
        if (!pname || !pwd) return returnCode(ctx, 1006, "参数错误");
        if (pwd.length < 6) return returnCode(ctx, 1006, "密码最少6位");
        sql = `select * from users where pname='${pname}' and pwd="51134e928aca119ae06db90d714b9672"`;
        // sql = `select * from users where pname='${pname}' and pwd=md5('${config.md5Key}${pwd}')`;
        let state = await query(sql);
        if (state.length === 0) {
            returnCode(ctx, 2, "账号或者密码错误");
            return;
        }
        let userToken = {
            name: `${state[0].pname}`,
            id: `${state[0].id}`
        };
        const token = jwt.sign(userToken, secret, {expiresIn: '24h'});
        console.log("返回token",token);
        let states = {...state[0],token};
        returnCode(ctx, 2, "登录成功", states);
    } catch (e) {
        returnCode(ctx, e);
    }
});

router.get('/info', async ctx => {
    try {
        let userids = '', pname = '';
        const token = ctx.cookies.get('token'); // 请求头token
        let paload = await verify(token, secret);
        userids = paload.id;
        pname = paload.name;
        let k = await query(`SELECT * FROM users WHERE id='${userids}' and pname='${pname}' `);
        if (k.length > 0) {
            let userToken = {
                name: `${k[0].pname}`,
                id: `${k[0].id}`,
            };
            const token = jwt.sign(userToken, secret, {expiresIn: '24h'});
            ctx.cookies.set('token', token, {
                maxAge: 800 * 60 * 60 * 1000,   // cookie有效时长 加密用户的id
                httpOnly: false
            });
            ctx.body = {
                msg: '登录信息存在',
                code: 888,
                token,
                data: k[0]
            };
        } else {
            ctx.body = {
                code: 10001,
                msg: '没找到用户相关数据'
            };
        }
    } catch (e) {
        returnCode(ctx);
    }
});

router.post('/updateInfo', async ctx => {
    let {sex, avatar, tabs, pwd} = {...ctx.request.body};
    try {
        let id = await UsersInfos(ctx);
        let obj = {
            pwd: {
                data: pwd,
                sqlKey: 'pwd'
            }, sex: {
                data: sex,
                sqlKey: "sex"
            }, avatar: {
                data: avatar,
                sqlKey: "avatar"
            }, tabs: {
                data: tabs,
                sqlKey: "tabs"
            }
        };
        let w = "set ";
        let up = false;
        for (let i in obj) {
            let value = obj[i].data;
            if (value) {
                up = true;
                let key = obj[i].sqlKey;
                if (i === 'sex') {
                    value = value === '男' ? 1 : value === '女' ? 0 : 3;
                } else if (i === 'pwd') {
                    w += `  pwd=md5('${config.md5Key}${pwd}') `;
                    break;
                }
                w += `  ${key}='${value}' `;
            }
        }
        if (!up) {
            returnCode(ctx, 1006, "沒有要修改的信息")
        } else {
            sql = `update users ${w} where id=${id}`;
            console.log(sql);
            await query(sql);
            ctx.body = {
                code: 3,
                msg: '修改成功'
            };
        }
    } catch (e) {
        returnCode(ctx)
    }
});

router.get('/search', async ctx => {
    let {pname} = {...ctx.request.query};
    try {
        let myid = await UsersInfos(ctx);
        sql = `select * from users a 
where a.pname='${pname}'`;
        let state = await query(sql);
        returnCode(ctx, 0, "搜索成功", state)
    } catch (e) {
        returnCode(ctx);
    }
});

router.post('/addfriend', async ctx => {
    try {
        let createid, fromid, toid;
        let id = ctx.request.body.id;
        createid = id;
        let myid = await UsersInfos(ctx);
        if (id > myid) {
            fromid = myid;
            toid = id;
        }
        else {
            fromid = id;
            toid = myid;
        }
        let x = await query(`select * from friend where fromid=${fromid} and toid=${toid}`);
        if (x.length===0) {
            sql = `insert into friend(fromid,toid,createid) values(${fromid},${toid},${createid})`;
            await query(sql);
        }
        ctx.body = {
            code:2,
            msg:'申请请求中'
        };
    } catch (e) {
        ctx.body = {
            code:10002,
            e
        };
    }
});

// 联系人列表
router.get('/getcontacks',async ctx=>{
   try {
      let id = await UsersInfos(ctx);
       console.log("客户端id"+id);
      sql = `select * from (select if(f.fromid=${id},f.toid,f.fromid) as friendid from friend f where f.fromid=${id} or f.toid=${id} and f.status=0) m
left join users a on m.friendid=a.id`;
       let state = await query(sql);
       ctx.body={
           code:0,
           mgs:'获取联系人列表成功',
           data:state
       }
   } catch (e) {
       ctx.body={code:1002,msg:e}
   }
});

// 聊天记录
router.get('/getmessage', async ctx => {
    try {
        let myid = await UsersInfos(ctx); // 小
        let id = ctx.request.query.id; // 大
        if (myid>id) {  // 交换位置
            let x = myid;
            myid = parseInt(id);
            id = x;
        }
        let formtoid = myid + "to" + id;
        sql = `select * from message a where a.formtoid='${formtoid}'`;
        console.log(sql);
        let state =await query(sql);
        ctx.body = {code:0,msg:'success',data:state};
    }catch (e) {
        ctx.body={code:10002,msg:'错误',e}
    }
});

/**
 * @param ctx  实例
 * @param code 状态码
 * @param msg 信息
 * @param data 数据
 * @param e 报错的信息
 */
function returnCode(ctx, code = 1004, msg = "系统错误", data = [], e = "") {
    ctx.body = {
        code,
        msg,
        data: data,
        e
    };
}

async function UsersInfos(ctx) {
    let token = ctx.header.authorization; // token
    let payload = await verify(token.split(' ')[1], secret);
    return parseInt(payload.id);
}

module.exports = router;
