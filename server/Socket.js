let socket = {};
let socket_io = require('socket.io');
const {query} = require('./asyncmysql');
socket.getSocket = async function (server) {
    let io = socket_io.listen(server);
    let userIinfo = [];
    io.sockets.on('connection', async function (socket) {
        socket.on('__join', (data) => {
            console.log("新用戶", data);
            let s = {};
            s['id'] = data.id;
            s['socketId'] = socket.id;
            userIinfo.push(s);
            console.log("當前在線", userIinfo);
        });
        socket.on("_txt_message", async (data) => {
            let x = userIinfo.filter(v => v.id == data.idto);  // 得到发送用户的socketId {id:'',socketId:''}
            console.log(x,data);
            if (x.length===0) return;
            socket.broadcast.to(x[x.length-1].socketId).emit('recvmesg', data);
        });
    });
};


module.exports = socket;