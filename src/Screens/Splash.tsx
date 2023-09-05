import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  Dimensions,
  Easing
} from 'react-native';
import Colors from '../Utiles/Colors';
import Images from '../Assets/Images';

const Splash = ({ navigation }: any) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [isTop, setIsTop] = useState(true);

  const startAnimation = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      setIsTop(false);
    })
  }

  useEffect(() => {
    startAnimation(isTop ? 1 : 0);
  }, [isTop]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').height - 90],
    extrapolate: 'identity'
  })

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn()
    setTimeout(() => {
      navigation.navigate("Home")
    }, 4000);
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.fadingContainer, { opacity: fadeAnim, transform: [{ translateY }] }]}
      // style={[
      //   styles.fadingContainer,
      //   {
      //     opacity: fadeAnim,
      //   },
      // ]}
      >
        <Image source={Images.SplashLogo} style={styles.splashImage} />
      </Animated.View>
      <View style={styles.buttonRow}>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.SplashBackgroundColor,

  },
  fadingContainer: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  splashImage: {
    width: "55%",
    height: 203,
    marginTop: "40%"
  },
  square: {
    width: 70,
    height: 70,
    backgroundColor: 'red'
  }
});

export default Splash;