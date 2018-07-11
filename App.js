/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {Platform, Text, View, NativeModules, FlatList, Image, TouchableOpacity} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Users from './pages/Users';
import Connect from './pages/Connect';
import Login from './pages/Login';
import MySorage from './utils/storage';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
window.userinfo = {
    id: '',
    code: '',
    display: '',
    token:''
};
window.storage = null;
window.servers = {
    server: "192.168.31.24",
    // getRtcServer: () => "ws://" + servers.serverss + ":9093/",
    // rtcserver: "ws://" + servers.serverss + "/9093"
};
import {chartCenter} from "./components/ChatCenter";
console.log("消息中心:", chartCenter);
userinfo.ws = chartCenter.client;
console.disableYellowBox = true;
class App extends Component {
    constructor(props) {
        super(props);
        this._init();
        this.state = {
            open: false
        };
        console.log("APp",userinfo.ws );
        chartCenter.mmm = () => {
            alert("App 里面有消息噢!");
        };
        console.log(chartCenter);
        // userinfo.ws.socket.onMessage =(data)=>{
        //     alert("有消息");
        // }
        // userinfo.ws.socket.on("recvmesg",function () {
        //     alert("asasa");
        // });
    }


    async _init() {
        console.log("_init");
        MySorage._load("loginuserinfo", function (res) {
            let info = JSON.parse(res);
            console.log("登录信息加载1--> ",info);
            if (info.code === '' || info.pname === '') {
                alert("请重新登录");
                setInterval(() => {
                    this.props.navigation.navigate("Login");
                }, 1000)
            } else {
                userinfo.id = info.id;
                userinfo.code = info.code;
                userinfo.display = info.pname;
                userinfo.token = info.token;
                console.log("获取本地信息",userinfo);
            }
        });
    }
}

userinfo.App = new App();

let Tab = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            title: "聊天",
            tabBarIcon: ({focused}) => (
                <Image resizeMode='contain'
                       source={focused ? require('./public/chat.png') : require('./public/chat.png')}
                       style={{width: 20, height: 20}}
                />
            )
        })
    },
    Connect: {
        screen: Connect,
        navigationOptions: ({navigation}) => ({
            title: "好友",
            tabBarIcon: ({focused}) => (
                <Image resizeMode='contain'
                       source={focused ? require('./public/lxr.png') : require('./public/lxr.png')}
                       style={{width: 20, height: 20}}
                />
            )
        })
    },
    Users: {
        screen: Users,
        navigationOptions: ({navigation}) => ({
            title: "我的",
            tabBarIcon: ({focused}) => (
                <Image resizeMode='contain'
                       source={focused ? require('./public/my.png') : require('./public/my.png')}
                       style={{width: 20, height: 20}}
                />
            )
        })
    }
}, {
    swipeEnabled: true,
    initialRouteName: "Home",
    tabBarOptions: {
        showLabel: true,
        allowFontScaling: true,
        activeBackgroundColor: "#53afff",
        labelStyle: {
            fontSize: 12,
            color: "black"
        },
        style: {
            backgroundColor: '#fff',
        },
    }
});

export default createStackNavigator({
    Tab: {
        screen: Tab
    },
    Chat: {
        screen: Chat
    },
    Home: {
        screen: Home,
    },
    Users: {
        screen: Users,
    },
    Login: {
        screen: Login
    },
}, {
    swipeEnabled: true,
    initialRouteName: "Tab",
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        title: "返回",
        headerBackTitle: "返回",
        headerStyle: {
            backgroundColor: '#fff',
            display: "flex",
            color: '#349aff'
        },
        headerTintColor: 'black'
    },
});
