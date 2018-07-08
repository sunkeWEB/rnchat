import io from 'socket.io-client';
class RtcClient {
    constructor() {
        this.autoConnect();
    }
    /* websocket 连接 */
    socket;
    async autoConnect() {
        let socket;
        console.log("autoConnect執行");
        if (this.socket) return;
        try {
            let userinfo = window.userinfo;
            console.log("userinfo--------------------------------------------》",userinfo);
            if (!userinfo.id || !userinfo.token) {
                console.log("登录信息不存在 websocket失败");
                return;
            }
            let server = "ws://192.168.0.101:9093";
            if (this.socket && this.socket.close) this.socket.close();
            this.socket = null;
            socket = io(server);
            socket.on('connect', function(){
                console.log("發起連接",socket,{id:userinfo.id,socketId:socket.id});
                socket.emit("__join",{id:userinfo.id,socketId:socket.id});
            });
            socket.on("recvmesg", function () {
                alert("有新的消息哦!");
            });
            this.socket = socket;
        }
        catch (e) {
            console.log("websocket连接失败",e);
        }finally {
            console.log("finally");
            setTimeout(() => this.autoConnect(), 2000);
        }
    }
    onClose () {
        this.socket = null;
    }
}

class RtcMessageCenter {
    client = new RtcClient();
}

export let chartCenter = new RtcMessageCenter();