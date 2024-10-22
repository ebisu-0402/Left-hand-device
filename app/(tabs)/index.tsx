import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
// import { RaindropEffect } from '../../components/RaindropEffect'; // 水滴アニメーションのインポート

import buttonImage1 from '../../assets/images/button1.png';
import buttonImage2 from '../../assets/images/button2.png';
import buttonImage3 from '../../assets/images/button3.png';
import buttonImage4 from '../../assets/images/button4.png';
import buttonImage5 from '../../assets/images/button5.png';
import buttonImage6 from '../../assets/images/button6.png';

const buttonImages: { [key: number]: any }  = {
  1: buttonImage1,
  2: buttonImage2,
  3: buttonImage3,
  4: buttonImage4,
  5: buttonImage5,
  6: buttonImage6
};

const buttonNames: { [key: number]: string } = {
  1: 'Chrome',
  2: 'file',
  3: 'copy',  
  4: 'paste',  
  5: 'teams',
  6: 'login'
};

// ノートPCのIPアドレス
const SERVER_URL = 'http://10.21.0.182:5000/command';

export default function HomeScreen() {
  const sendData = async (buttonId: number) => {
    const command = buttonNames[buttonId];
    try {
      const response = await axios.post(SERVER_URL, {
        command: command,
      });
      Alert.alert(`Button ${buttonId} pressed! Response: ${response.data.status}`);
    } catch (error) {
      console.error('Error sending command:', error);
      Alert.alert('Error', 'Failed to send command.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 背景に水滴アニメーションを追加 */}
      {/* <RaindropEffect /> */}
      
      {/* ボタンを水滴アニメーションの上に表示 */}
      <View style={styles.buttonGrid}>
        {[1, 2, 3, 4, 5, 6].map((buttonId) => (
          <TouchableOpacity
            key={buttonId}
            style={styles.button}
            onPress={() => sendData(buttonId)}
          >
            <Image
              source={buttonImages[buttonId]}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>{buttonNames[buttonId]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    justifyContent: 'space-between',
    position: 'absolute', // ボタンをアニメーションの上に配置するための設定
  },
  button: {
    width: 90,
    height: 90,
    margin: 5,
    backgroundColor: '#aad6fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#575af5',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
