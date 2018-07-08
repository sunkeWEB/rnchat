import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity,Button} from 'react-native';
import Emoji from './../components/Emoji';
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
                    <Emoji name="coffee"/>
                    {/*<Emoticons*/}
                    {/*onEmoticonPress={this._onEmoticonPress.bind(this)}*/}
                    {/*onBackspacePress={this._onBackspacePress.bind(this)}*/}
                    {/*show={true}*/}
                    {/*concise={true}*/}
                    {/*showHistoryBar={true}*/}
                    {/*showPlusBar={true}*/}
                    {/*/>*/}
                </View>
                <View style={{backgroundColor: "#fff", height: 50}}>
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
            txt:'default'
        };
        this.sendText = this.sendText.bind(this);
    }
    sendText() {
        console.log("userinfo.ws.socket",userinfo.ws.socket);
        let socket = userinfo.ws.socket;
        console.log("chat_socket",socket);
        if (!socket) {
            return;
        }
        socket.emit('message',{type:'text',idto:this.props.toid,body:{data:this.state.txt}});
    }
    componentDidMount () {
        // console.log("userinfo.ws",this.props);
    }
    render () {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
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
                        <TouchableOpacity style={{flex:1,justifyContent:"center"}}>
                            <Text style={{alignSelf:"center"}}>按住 说话</Text></TouchableOpacity> :
                        < TextInput placeholder={"输入内容并发送1"} onChangeText={(e)=>this.state.txt=e} />
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
                <View>
                    {/*<View*/}
                        {/*style={{*/}
                        {/*flex: 1,*/}
                        {/*justifyContent: "center",*/}
                        {/*alignContent: "center",*/}
                        {/*paddingLeft: 5,*/}
                        {/*paddingRight: 5*/}
                    {/*}}>*/}
                        {/*<Image source={require('./../public/add.png')} style={{height: 30, width: 30}}/>*/}
                    {/*</View>*/}
                    <Button title={"發送"} onPress={this.sendText} />
                </View>
            </View>
        )
    }
}