import React, {Component} from 'react';
import {Platform, Text, View, NativeModules, FlatList, Image, TouchableOpacity} from 'react-native';
import Chat from './../pages/Chat';
import {FormatUserName} from "../utils";
import Swipers from './../components/Swiper';
import AxiosFn from './../api';
export default class Connect extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.Jump = this.Jump.bind(this);
    }

    Jump(id) {
        this.props.navigation.navigate('Chat',{id});
    }

    async componentDidMount () {
        let state = await AxiosFn("getcontacks",{id:window.userinfo.id});
        this.setState({
            data:state.data
        });
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
                        return (<TouchableOpacity key={item.id} onPress={()=>this.Jump(item.id)} style={{
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
                                        style={{color: "#fff", alignSelf: 'center'}}>{FormatUserName(item.pname)}</Text>
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                alignContent: "center",
                                marginLeft: 10
                            }}>
                                <Text style={{color: "black"}}>{item.pname}</Text>
                                {/*<Text>{item.lastmsg}</Text>*/}
                            </View>
                            {/*<View>*/}
                                {/*<Text style={{color: "#ccc"}}>{item.lasttime}</Text>*/}
                            {/*</View>*/}
                        </TouchableOpacity>)
                    }}/>
                </View>
            </View>
        );
    }
}