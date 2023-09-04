import React, { useEffect } from 'react'
import { Image, SafeAreaView, StyleSheet, } from 'react-native'
import Images from '../Assets/Images'
import Colors from '../Utiles/Colors'
import LottieView from 'lottie-react-native';

const Splash = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home")
    }, 2000);
  }, [])
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LottieView style={styles.splashImage} source={Images.SplashLogo} autoPlay loop />
      {/* <Image source={Images.SplashLogo} style={styles.splashImage} /> */}
    </SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.SplashBackgroundColor,
    justifyContent: "center",
    alignItems: 'center'
  },
  splashImage: {
    width: "55%",
    height: 203
  }
})