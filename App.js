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
import {FormatUserName} from './utils';

const {Toast, CallPhone} = NativeModules;
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰111111",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰11",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰22",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰33",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "罗胜兰33333",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }, {
                id: 1,
                name: "1罗胜兰33",
                avatar: '',
                lasttime: "昨天13:14",
                lastmsg: "过得怎么样啊"
            }]
        }
        this.Jump = this.Jump.bind(this);
    }

    Jump() {
        this.props.navigation.navigate('Chat');
    }

    render() {
        let state = this.state;
        return (
            <View style={{backgroundColor: "#e3e3e3"}}>
                <View style={{height: 140, backgroundColor: "red"}}>
                    <Swipers/>
                </View>
                <View style={{marginBottom: 280}}>
                    <FlatList data={state.data} renderItem={({item}) => {
                        return (<TouchableOpacity key={item.id} onPress={this.Jump} style={{
                            backgroundColor: "#fff",
                            padding: 8,
                            borderBottomWidth: 1,
                            borderStyle: "solid",
                            flex: 1,
                            flexDirection: "row",
                            borderBottomColor: "#eee"
                        }}>
                            <View style={{backgroundColor: '#0079f5', height: 50, width: 50,}}>
                                <View style={{flex: 1, justifyContent: "center", alignContent: "center",}}>
                                    <Text
                                        style={{color: "#fff", alignSelf: 'center'}}>{FormatUserName(item.name)}</Text>
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                alignContent: "center",
                                marginLeft: 10
                            }}>
                                <Text style={{color: "black"}}>{item.name}</Text>
                                <Text>{item.lastmsg}</Text>
                            </View>
                            <View>
                                <Text style={{color: "#ccc"}}>{item.lasttime}</Text>
                            </View>
                        </TouchableOpacity>)
                    }}/>
                </View>
            </View>
        );
    }
}




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
    Tab:{
        screen:Tab
    },
    Chat:{
        screen:Chat
    },
    Home: {
        screen: Home,
    },
    Users: {
        screen: Users,
    }
}, {
    swipeEnabled: true,
    initialRouteName: "Tab",
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        title: "返回",
        headerBackTitle: "返回",
        headerStyle: {
            backgroundColor: '#fff',
            display:"flex",
            color: '#349aff'
        },
        headerTintColor: 'black'
    },
});
