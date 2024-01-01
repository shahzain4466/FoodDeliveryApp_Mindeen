//? App Intro SLider Logic Done 100%
//* Start
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
// SVG'S
import SplashLogoOne from '../../../assets/svg/SplashLogoOne.svg';
import SplashLogoTwo from '../../../assets/svg/SplashLogoTwo.svg';
import SplashLogoThree from '../../../assets/svg/SplashLogoThree.svg';
// Others
import {scale} from '../../../../utils/scale';
import theme from '../../../themes/theme';
import Txt from '../../common/core/Txt';
import Button from '../../common/core/Button';

const data = [
  {
    key: 'slide1',
    title: 'All your favorite\nrestaurants.',
    text: 'Order from the best local restaurants with\n easy, on-demand delivery.',
    Svg: SplashLogoOne,
  },
  {
    key: 'slide2',
    title: 'Free delivery across\n your area',
    text: 'Free delivery for new customers via Apple\n Pay and others payment methods.',
    Svg: SplashLogoTwo,
  },
  {
    key: 'slide3',
    title: 'Eat what you’re \nthinking',
    text: 'Easily find your type of food craving and\n you’ll get delivery in wide range.',
    Svg: SplashLogoThree,
  },
];

const DummyScreen = () => {

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <item.Svg />
        <Txt style={styles.title}>{item.title}</Txt>
        <Txt style={styles.text}>{item.text}</Txt>
      </View>
    );
  };

  //* Hide "Next" Button
  const renderNextButton = () => null;

  return (
    <View style={styles.container}>
      <AppIntroSlider data={data} renderItem={renderItem}
      activeDotStyle={styles.activeDot}
      dotStyle={styles.dot}
      renderNextButton={renderNextButton}
      />
        <Button title={'Get Started'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.white,
  },
  title: {
    fontSize: scale(30),
    marginVertical: theme.spacing.margin.m2,
    color: theme.palette.TypographyDeep,
    fontFamily: theme.typography.type.semi,
    textAlign: 'center',
  },
  text: {
    color: theme.palette.GrayDeep,
    textAlign: 'center',
    ...theme.typography.common.h2r,
  },
  activeDot: {
    backgroundColor: theme.palette.PrimaryDeep,
    width: 12,
    height: 8
  },
  dot: {
    backgroundColor: theme.palette.GrayLight,
    width: 12,
    height: 8
  },

  btn: {
    margin: theme.spacing.margin.m1
  },
});

export default DummyScreen;
//* End