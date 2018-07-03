import React,{Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import Swiper from 'react-native-swiper';
export default class Swipers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            autoplay:true,
            horizontal:true,
            showsButtons:false
        };
    }
    render () {
        return (
            <Swiper style={styles.wrapper}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello World!</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>敬请期待!</Text>
                </View>
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});