import React, {Component} from 'react';
import {View} from 'react-native';
import Realm  from 'realm';


/**
 * 聊天记录表
 * @type {{name: string}}
 */
const messageSchema = {
    name:'message',
    primaryKey:'id',
    properties:{
        id:'int',
        isread:{type:'int',default:0}, //1是未阅读
        body:{}
    }
};


export default class DbReaml extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount () {

    }

    render () {
        return null;
    }

}