import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity,Button,
    Platform,
    PermissionsAndroid
} from 'react-native';
import Emoji from './../components/Emoji';

import WebRTC from 'react-native-webrtc';
let {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    getUserMedia,
} = WebRTC;

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toid:this.props.navigation.state.params.id
        };
    }


    _onEmoticonPress() {

    }

    _onBackspacePress() {

    }

    componentDidMount () {
        console.log("userinfo.ws",this.props.navigation.state.params.id);
    }

    render() {
        let state = this.state;
        return (
            <View style={{height: "100%", flex: 1}}>
                <View style={{flex: 1}}>
                    <Text>Chat</Text>
                    {/*<Emoji name="coffee"/>*/}
                    {/*<Emoticons*/}
                    {/*onEmoticonPress={this._onEmoticonPress.bind(this)}*/}
                    {/*onBackspacePress={this._onBackspacePress.bind(this)}*/}
                    {/*show={true}*/}
                    {/*concise={true}*/}
                    {/*showHistoryBar={true}*/}
                    {/*showPlusBar={true}*/}
                    {/*/>*/}
                </View>
                <View style={{backgroundColor: "#fff",position:"absolute",bottom:0,left:0,right:0}}>
                    <SendMsgBox toid={state.toid} />
                </View>
            </View>
        )
    }
};

class SendMsgBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            yuying: false,
            txt:'default',
            others:false
        };
        this.sendText = this.sendText.bind(this);
    }
    sendText() {
        let socket = userinfo.ws.socket;
        console.log("chat_socket",socket);
        if (!socket) {
            return;
        }
        userinfo.ws.sendMessage({type:'_txt_message',idto:this.props.toid,body:{data:this.state.txt}});
    }
    componentDidMount () {

    }

    others () {
        let input = this.refs.textInput.isFocused(); // 是否获得焦点
        if (input) {
            this.refs.textInput.blur();
        }
        this.setState({
            others:true
        });
    }

    createWebRtc () {
        let isFront = true;
        return new Promise((resolve, reject) => {
            MediaStreamTrack.getSources(async (sourceInfos) => {
                if (Platform.OS === 'android') {
                    let perCheck = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
                    console.log(perCheck);
                    if(!perCheck) {
                        let permission = await PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.CAMERA,
                            {
                                'title': 'Duo App Camera Permission',
                                'message': 'Duo app wants to access camera access for video chat'
                            }
                        );
                        console.log(permission);
                    }

                }

                let videoSourceId;
                for (let i = 0; i < sourceInfos.length;i++) {
                    const sourceInfo = sourceInfos[i];
                    if (sourceInfo.kind === "video" && sourceInfo.facing === (isFront ? "front" : "back")) {
                        videoSourceId = sourceInfo.id;
                    }
                }

                getUserMedia({
                    audio: true,
                    video: {
                        mandatory: {
                            minWidth: 640, // Provide your own width, height and frame rate here
                            minHeight: 360,
                            minFrameRate: 30,
                        },
                        facingMode: "user",
                        optional: (videoSourceId ? [{ sourceId: videoSourceId }] : []),
                    }
                }, function (stream) {
                    let url = URL.createObjectURL(stream.id);
                    console.log('getUserMedia success', url);
                    resolve(stream);
                }, reject);
            });
        });
    }

    render () {
        return (
            <View style={{flex:1}}>
                <View style={{flex: 1, flexDirection: 'row',height:50}}>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => this.setState({yuying: !this.state.yuying})} style={{
                            flex: 1,
                            justifyContent: "center",
                            alignContent: "center",
                            paddingLeft: 5,
                            paddingRight: 5
                        }}>
                            <Image source={require('./../public/yuy.png')} style={{height: 30, width: 30}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        {this.state.yuying ?
                            <TouchableOpacity style={{flex: 1, justifyContent: "center"}}>
                                <Text style={{alignSelf: "center"}}>按住 说话</Text></TouchableOpacity> :
                            < TextInput onFocus={()=>{
                                if (this.state.others) {
                                    this.setState({others:false})
                                }
                            }} ref={"textInput"} placeholder={"输入内容并发送"} onChangeText={(e) => this.state.txt = e}/>
                        }
                    </View>
                    <View>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignContent: "center",
                            paddingLeft: 5,
                            paddingRight: 5
                        }}>
                            <Image source={require('./../public/emjio.png')} style={{height: 30, width: 30}}/>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.others()}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignContent: "center",
                                paddingLeft: 5,
                                paddingRight: 5
                            }}>
                            <Image source={require('./../public/add.png')} style={{height: 30, width: 30}}/>
                        </View>
                    </TouchableOpacity>
                    <Button title={"發送"} onPress={this.sendText} />
                </View>
                {this.state.others && <View className={"others"} style={{height:210,width:"100%",marginTop:15}}>
                    <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignContent:'center',height:60}}>
                        <View style={{flex:1,}}>
                            <Image resizeMode={"center"} source={require('./../public/yyth.png')} style={{width: 50, height: 50,alignSelf:"center"}}/>
                        </View>
                        <TouchableOpacity onPress={this.createWebRtc} style={{flex:1,}}>
                            <Image resizeMode={"center"} source={require('./../public/ship.png')} style={{width: 50, height: 50,alignSelf:"center"}}/>
                        </TouchableOpacity>
                        <View style={{flex:1,}}>
                            <Image resizeMode={"center"} source={require('./../public/yyth.png')} style={{width: 50, height: 50,alignSelf:"center"}}/>
                        </View>
                        <View style={{flex:1,}}>
                            <Image resizeMode={"center"} source={require('./../public/ship.png')} style={{width: 50, height: 50,alignSelf:"center"}}/>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignContent:'center',height:60}}>
                        <View style={{flex:1,}}>
                            <Image resizeMode={"center"} source={require('./../public/yyth.png')} style={{width: 50, height: 50,alignSelf:"center"}}/>
                        </View>
                        <View style={{flex:1,}}>
                            <Image resizeMode={"center"} source={require('./../public/ship.png')} style={{width: 50, height: 50,alignSelf:"center"}}/>
                        </View>
                        <View style={{flex:1,}}>
                            <Image resizeMode={"center"} source={require('./../public/yyth.png')} style={{width: 50, height: 50,alignSelf:"center"}}/>
                        </View>
                        <View style={{flex:1,}}>
                            <Image resizeMode={"center"} source={require('./../public/ship.png')} style={{width: 50, height: 50,alignSelf:"center"}}/>
                        </View>
                    </View>
                </View>}
            </View>
        );
    }
}