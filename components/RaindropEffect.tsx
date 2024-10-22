import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// 水滴を作成する関数
function createRaindrop() {
  const size = Math.random() * 10 + 10; // 10pxから20pxのサイズ
  const startPositionX = Math.random() * width; // 画面幅内のランダムなX位置
  const delay = Math.random() * 2000; // 各水滴の落下開始をランダムに遅延

  return { size, startPositionX, delay };
}

const DROP_SIZE = 20; // サイズを大きくする

export function RaindropEffect() {
  const raindrops = Array.from({ length: 10 }, createRaindrop); // 水滴を10個作成

  // 各水滴のスタイルをアニメーションする
  const renderRaindrops = () => {
    return raindrops.map((drop, index) => {
      const dropPositionY = useSharedValue(-50); // 初期位置は画面の外上部

      useEffect(() => {
        dropPositionY.value = withDelay(
          drop.delay,
          withRepeat(
            withTiming(height, {
              duration: 3000,
              easing: Easing.linear,
            }),
            -1, // 無限ループ
            false
          )
        );
      }, []);

      const raindropStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        top: dropPositionY.value,
        left: drop.startPositionX,
        width: drop.size,
        height: drop.size,
        borderRadius: drop.size / 2,
        backgroundColor: '575af5', // 半透明の青
      }));

      return <Animated.View key={index} style={raindropStyle} />;
    });
  };

  return (
    <View style={styles.container}>
      {/* 背景の水滴 */}
      {renderRaindrops()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden', // 画面外の水滴が表示されないように
  },
});


