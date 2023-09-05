import { Image, StyleSheet, Text, TouchableOpacity, View, PixelRatio, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps';
import Images from '../Assets/Images';
import Colors from '../Utiles/Colors';
import Button from '../Components/Button';
import Swipeable from 'react-native-swipeable';

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RPH = (percentage: number) => {
  return (percentage / 100) * screenHeight;
};
const RPW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};


const Location = ({ navigation }: any) => {
  const leftContent = <></>;
  const rightButtons = [
    <Text style={styles.cartText}>{''}</Text>
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Button
        onPress={() => navigation.goBack()}
        buttonMainContainer={styles.buttonMainContainer}
        buttonImage={Images.BackIcon}
        buttonStyle={styles.buttonImageStyle}
      />

      <View
        style={[styles.cartButtonContainer, { width: RPW(80), }]}>
        <Swipeable
          style={{ maxWidth: '75%' }}
          onLeftActionRelease={() => Alert.alert("😉 😉")}
          leftContent={leftContent}>
          <TouchableOpacity style={styles.buttonImage}>
            <Image
              source={Images.forword}
              style={{ width: 16, height: 17 }}
            />
          </TouchableOpacity>
        </Swipeable>
        <Text style={styles.cartText}>{'Reached Drop Location '}</Text>
      </View >
    </View >
  )
}

export default Location

const styles = StyleSheet.create({
  cartButtonContainer: {
    height: 60,
    backgroundColor: Colors.SplashBackgroundColor,
    borderRadius: 29,
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 5,
    alignSelf: 'center',
    position: "absolute",
    bottom: 20,
  },
  cartText: {
    fontWeight: '600',
    fontSize: getFontSize(15),
    color: Colors.White,
    marginLeft: 15,
    position: "absolute",
    right: 25
  },
  buttonMainContainer: {
    backgroundColor: Colors.White,
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    top: 15,
    left: 10

  },
  buttonImageStyle: {
    width: 8,
    height: 9.5
  },
  buttonImage: {
    width: 67,
    height: 52,
    backgroundColor: Colors.White,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})