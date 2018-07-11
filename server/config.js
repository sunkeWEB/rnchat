let config = {
    secret: "397633183@qq.com_My_Name_is_sun_ke*()&*&*&&*",
    md5Key: "china123___397633183@qq.com",
    sex:3, // 注册默认性别保密
    tabs:["志不强者智不达,言不信者行不果","诚实是人生的命脉,是一切价值的根基","老老实实最能打动人心","我成功是因为我有决心,从不踌躇"], // 注册的时候 随机的签名
    mysqlconfig:{
        database: 'chating',
        user: 'root',
        password: 'root',
        port: '3306',
        host: 'localhost'
    },
    publicPath: ['/register','/login','/info']
};

module.exports = config;