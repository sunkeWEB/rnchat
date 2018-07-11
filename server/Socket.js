let socket = {};
let socket_io = require('socket.io');
const {query} = require('./asyncmysql');
socket.getSocket = async function (server) {
    let io = socket_io.listen(server);
    let userIinfo = [];
    io.sockets.on('connection', async function (socket) {
        // socket.on('message', async function (data) {
        //     console.log("收到一条消息", data);
        //     let id = 0;
        //     userIinfo.filter(v => {
        //         if (v.name == data.toname) {
        //             console.log(v.id);
        //             id = v.id;
        //             return v.id
        //         }
        //     });
        //
        //     let sid, yid;
        //
        //     if (data.myid > parseInt(data.id)) {
        //         sid = data.myid;
        //         yid = parseInt(data.id);
        //     } else {
        //         sid = parseInt(data.id);
        //         yid = data.myid;
        //     }
        //
        //     let formtoid = yid + "to" + sid;
        //
        //     if (id !== 0) {
        //         socket.broadcast.to(id).emit('recvmesg', data);
        //     }
        //     let sql = `insert into message(fromid,toid,formtoid,body,xq,type) values(${data.myid},${parseInt(data.id)},"${formtoid}",'${data.body}','${JSON.stringify(data)}','${data.type}')`;
        //     query(sql);
        // });
        // socket.on('setname', function (data) {
        //     let s = {};
        //     s['name'] = data.user;
        //     s['id'] = socket.id;
        //     userIinfo.push(s);
        // });
        socket.on('__join', (data) => {
            console.log("新用戶", data);
            let s = {};
            s['id'] = data.id;
            s['socketId'] = socket.id;
            userIinfo.push(s);
            console.log("當前在線", userIinfo);
        });
        socket.on("message", async (data) => {
            let x = userIinfo.filter(v => v.id == data.idto);  // 得到发送用户的socketId {id:'',socketId:''}
            console.log(x);
            if (x.length===0) return;
            socket.broadcast.to(x[x.length-1].socketId).emit('recvmesg', data);
        });
    });
};


module.exports = socket;