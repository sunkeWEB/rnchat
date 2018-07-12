import {Vibration} from 'react-native';
import io from 'socket.io-client';

const PATTERN = 500;
class RtcMessage {
    fillMessage=()=> {
        alert("RtcMessage");
    }
}
//
// class RTC extends RtcMessage{
// constructor() {
//     super();
// }
// }

class RtcClient {

    constructor() {
        this.mm = "121";
        this.autoConnect();
    }
    socket;
    fillter = new RtcMessage();
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
            if (this.socket && this.socket.close) this.socket.close();
            this.socket = null;
            socket = io(server);
            socket.on('connect', function () {
                console.log("發起連接", socket, {id: userinfos.id, socketId: socket.id});
                socket.emit("__join", {id: userinfos.id, socketId: socket.id});
            });
            socket.on("recvmesg", (data) => this.onMessage(data));
            this.socket = socket;
        }
        catch (e) {
            console.log("websocket连接失败", e);
        } finally {
            setTimeout(() => this.autoConnect(), 10000);
        }
    }


    onClose() {
        this.fillter = null;
        this.socket = null;
    }

    sendMessage (data) {
        this.socket.emit('_txt_message',data);
    }

    onMessage (data) {
        let event = data.type;
        if (!event) return;
        this.fillter[event](data);
    }

}

class RtcMessageCenter {
    client = new RtcClient();
    constructor () {
        // 文本消息
        this.client.fillter._txt_message=()=>{
            alert("1212");
            Vibration.vibrate(PATTERN);
        }
    }
}

export let chartCenter = new RtcMessageCenter();