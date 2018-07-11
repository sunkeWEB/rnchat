import io from 'socket.io-client';


class RtcMessage {
    fillMessage() {
        // console.log("FillterMessage222",this,this['hello']);
        // alert("FillterMessage222");
        RtcMessageCenter.onMessage();
        // if (this['hello']) {
        //     this['hello']();
        // }
        // return true;
    }
}


class RtcClient {
    constructor() {
        this.autoConnect();
    }

    socket;
    fillter;

    async autoConnect() {
        console.log("autoConnect執行", window.userinfo);
        let socket;
        if (this.socket) return;
        try {
            let userinfos = window.userinfo;
            if (!userinfos.id || !userinfos.token) {
                console.log("登录信息不存在 websocket失败");
                return;
            }
            let server = "ws://192.168.31.24:9093";
            this.fillter = new RtcMessage();
            if (this.socket && this.socket.close) this.socket.close();
            this.socket = null;
            socket = io(server);
            socket.on('connect', function () {
                console.log("發起連接", socket, {id: userinfos.id, socketId: socket.id});
                socket.emit("__join", {id: userinfos.id, socketId: socket.id});
            });
            socket.on("recvmesg", () => alert("你有新的消息噢!"));
            this.socket = socket;
        }
        catch (e) {
            console.log("websocket连接失败", e);
        } finally {
            console.log("finally");
            setTimeout(() => this.autoConnect(), 10000);
        }
    }

    // 消息来的时候
    onMessage() {
        this.fillter.onMessage();
    }

    onClose() {
        this.fillter = null;
        this.socket = null;
    }
}

class RtcMessageCenter {

    constructor () {
        console.log("RtcMessageCenter");
    }
    client = new RtcClient();
    chatMessage = new RtcMessage();
    static onMessage () {
        // alert("11111");
        console.log("1111",this,this['mmm']);
        if (this['mmm']) {
            this['mmm']();
        }
    }

}

export let chartCenter = new RtcMessageCenter();