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
import Swipers from './components/Swiper';
import Login from './pages/Login';
import {FormatUserName} from './utils';
import server from "./utils/request";
import MySorage from './utils/storage';

const {Toast, CallPhone} = NativeModules;
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
};
window.storage = null;
window.servers = {
    server: "192.168.31.24",
    // getRtcServer: () => "ws://" + servers.serverss + ":9093/",
    // rtcserver: "ws://" + servers.serverss + "/9093"
};
import { chartCenter } from "./components/ChatCenter";
console.log("消息中心:",chartCenter);
userinfo.ws = chartCenter.client;
class App extends Component {
    constructor(props) {
        super(props);
        this._init();
        this.state = {
            open: false
        };
        this.ws = null;
    }

    async _init() {
        MySorage._load("loginuserinfo", function (res) {
            let info = JSON.parse(res);
            console.log(info.id,info.pname,(info.code || info.pname));
            if (info.code==='' || info.pname==='') {
                alert("请重新登录");
                setInterval(()=>{
                    this.props.navigation.navigate("Login");
                },1000)
            }else{
                userinfo.id = info.id;
                userinfo.code = info.code;
                userinfo.display = info.pname;
            }
        });
    }
}

userinfo.App = new App();

let Tab = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            title: "首页",
            tabBarIcon: ({focused}) => (
                <Image resizeMode='contain'
                       source={focused ? require('./public/homepng.png') : require('./public/homepng.png')}
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
                       source={focused ? require('./public/avatars.png') : require('./public/avatars.png')}
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
        }
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
