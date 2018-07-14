import React, {Component} from 'react';
import {Platform, Text, View, NativeModules, FlatList, Image, TouchableOpacity} from 'react-native';
import Chat from './../pages/Chat';
import {FormatUserName} from "../utils";
import Swipers from './../components/Swiper';
export default class Home extends Component{
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
                <View style={{height: 140}}>
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