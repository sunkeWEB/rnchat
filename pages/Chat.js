import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import Emoji from './../components/Emoji';
export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    _onEmoticonPress() {

    }

    _onBackspacePress() {

    }

    render() {
        console.log("跟新");
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
                    <SendMsgBox/>
                </View>
            </View>
        )
    }
};

class SendMsgBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            yuying: false
        };
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
                        < TextInput placeholder={"输入内容并发送"}/>
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
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        paddingLeft: 5,
                        paddingRight: 5
                    }}>
                        <Image source={require('./../public/yuy.png')} style={{height: 30, width: 30}}/>
                    </View>
                </View>
            </View>
        )
    }
}