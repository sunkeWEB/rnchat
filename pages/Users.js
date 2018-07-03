import React, {Component} from 'react';
import {View, Button, Text, Image} from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }



    Logout() {
        alert("退出登陆");
    }

    render() {
        return (
            <View style={{backgroundColor: "#e3e3e3", height: '100%'}}>
                <View style={{height: 80,marginTop:15}}>
                    <View style={{
                        backgroundColor: "#fff",
                        flex: 1,
                        padding: 10,
                        flexDirection: "row",
                    }}>
                        <Image source={require('../public/avatar.png')} style={{width: 60, height: 60}}/>
                        <View style={{marginLeft: 10, marginTop: 5, paddingRight: 10, flex: 1}}>
                            <Text style={{color: "black"}}>SunKe</Text>
                            <Text numberOfLines={2} ellipsizeMode={"tail"} style={{
                                color: "#ccc",
                                fontSize: 13
                            }}>真理惟一可靠的标准就是永远自相符合</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop:10,backgroundColor:"#fff",padding:10,height:36}}>
                    <View style={{flex:1,flexDirection: "row",}}>
                        <View style={{width:100}}>
                            <Text>注册时间</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Text>2018.06.18</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop:10,backgroundColor:"#fff",padding:10,height:36}}>
                    <View style={{flex:1,flexDirection: "row",}}>
                        <View style={{width:100}}>
                            <Text>版本号</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                            <Text>v1.0</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginLeft: 30, marginRight: 30, marginTop: 20}}>
                    <Button title={"退出登陆"} onPress={this.Logout}/>
                </View>
            </View>
        )
    }
}