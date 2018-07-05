import io from 'socket.io-client';
class RtcClient {
    constructor() {
        this.autoConnect();
    }
    /* websocket 连接 */
    socket;
    async autoConnect() {
        let socket;
        if (this.socket) return;
        try {
            let userinfo = window.userinfo;
            console.log(userinfo);
            if (!userinfo.id || !userinfo.display) {
                console.log("登录信息不存在 websocket失败");
                return;
            }
            let server = "ws://192.168.31.24:9093";
            if (this.socket && this.socket.close) this.socket.close();
            this.socket = null;
            socket = io(server);
            socket.on('connect', function(w){
                console.log("connect",socket,{[userinfo.id]:{id:socket.id}});
                socket.emit("__join",{[userinfo.id]:{id:socket.id}});
            });
            this.socket = socket;
        }
        catch (e) {
            console.log("websocket连接失败",e);
        }finally {
            setTimeout(() => this.autoConnect(), 3000);
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