import React, {Component} from 'react';
import {View, Text,TextInput,Image} from 'react-native';
import Emoticons from 'react-native-emoticons';
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    _onEmoticonPress () {

    }
    _onBackspacePress () {

    }
    render() {
        return (
            <View style={{height:"100%",flex:1}}>
                <View style={{flex:1}}>
                    <Text>Chat</Text>
                    <Emoticons
                        onEmoticonPress={this._onEmoticonPress.bind(this)}
                        onBackspacePress={this._onBackspacePress.bind(this)}
                        show={true}
                        concise={true}
                        showHistoryBar={true}
                        showPlusBar={true}
                    />
                </View>
                <View style={{backgroundColor:"#fff",height:50}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{}}>
                            <View style={{flex:1,justifyContent:"center",alignContent:"center",paddingLeft:5,paddingRight:5}}>
                                <Image source={require('./../public/yuy.png')} style={{height:30,width:30}}  />
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            <TextInput placeholder={"输入内容并发送"} />
                        </View>
                        <View>
                            <View style={{flex:1,justifyContent:"center",alignContent:"center",paddingLeft:5,paddingRight:5}}>
                                <Image source={require('./../public/emjio.png')} style={{height:30,width:30}}  />
                            </View>
                        </View>
                        <View>
                            <View style={{flex:1,justifyContent:"center",alignContent:"center",paddingLeft:5,paddingRight:5}}>
                                <Image source={require('./../public/yuy.png')} style={{height:30,width:30}}  />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
};