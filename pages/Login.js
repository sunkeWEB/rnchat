import React, {Component} from 'react';
import {View, Text,Image,TextInput,TouchableOpacity} from 'react-native';
import AxiosFn from './../api';
export default class Login extends Component{
    constructor (props){
        super(props);
        this.state = {
            pname:"",
            pwd:""
        };
        this.handleInput = this.handleInput.bind(this);
        this.Login = this.Login.bind(this);
    }

    static navigationOptions = {
        title:"登录页"
    };

    handleInput (k,v) {
        this.state[k] = v;
    }

   async Login () {
       const {pname, pwd} = {...this.state};
       let x = await AxiosFn('Login',{pname,pwd},"POST");
       console.log("xxx",x);
    }

    render () {
        return (
            <View>
                <View>
                    <Image style={{width:"100%",height:150}} source={require('./../public/login.jpg')} />
                </View>
                <View style={{padding:30}}>
                    <View>
                        <TextInput placeholder={"用户名"} onChangeText={(e)=>this.handleInput('pname',e)} />
                    </View>
                    <View style={{marginTop:10}}>
                        <TextInput visible-password={true} type={"password"} placeholder={"登录密码"} onChangeText={(e)=>this.handleInput('pwd',e)} />
                    </View>
                    <View style={{height:35,marginTop:20}}>
                        <TouchableOpacity onPress={()=>this.Login()} style={{backgroundColor:"#53afff",flex:1,padding:10}}>
                            <Text style={{color:"#fff",alignSelf:'center'}}>登 录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}