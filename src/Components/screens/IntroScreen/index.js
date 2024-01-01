import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from './styles';
//* SVG'S
import SplashLogoOne from '../../../assets/svg/SplashLogoOne.svg';
import SplashLogoTwo from '../../../assets/svg/SplashLogoTwo.svg';
import SplashLogoThree from '../../../assets/svg/SplashLogoThree.svg';
//* Others
import Txt from '../../common/core/Txt';
import Button from '../../common/core/Button';
import Frame from '../../common/core/Frame';
import {Screens} from '../../../constants/constants';
import {Strings} from '../../../constants/Strings';
import {useDispatch, useSelector} from 'react-redux';
import {setIsFirstTime} from '../../../redux/slices/LocalUserDataSlice';

//* Intro Slider Data
const data = [
  {
    key: 'slide1',
    title: Strings.sliderOneTitle,
    text: Strings.sliderOneText,
    Svg: SplashLogoOne,
  },
  {
    key: 'slide2',
    title: Strings.sliderTwoTitle,
    text: Strings.sliderTwoText,
    Svg: SplashLogoTwo,
  },
  {
    key: 'slide3',
    title: Strings.sliderThreeTitle,
    text: Strings.sliderThreeText,
    Svg: SplashLogoThree,
  },
];

const IntroScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // Intro Slider Render Item
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
    <Frame headerVariant={'blank'} style={styles.container}>
      <AppIntroSlider
        data={data}
        renderItem={renderItem}
        activeDotStyle={styles.activeDot}
        dotStyle={styles.dot}
        renderNextButton={renderNextButton}
      />
      <View style={styles.defPadding}>
        <Button
          onPress={() => {
            dispatch(setIsFirstTime(false));
            navigation.navigate(Screens.Login);
          }}
          title={Strings.introBtnTitle}
        />
      </View>
    </Frame>
  );
};

export default IntroScreen;
