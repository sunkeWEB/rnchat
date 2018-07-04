import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

export default class Emoji extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emoji: []
        };
    }

    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋ 🖐 🖖 👋 💪 🖕 ✍ 💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}));
        console.log(emoji);
        return (
            <View>
                <ScrollView horizontal={true}
                            pagingEnabled={true}>
                    {emoji.map((v, index) => (
                        <View>
                            <Text style={{fontSize: 40}}>{v.text}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }
}