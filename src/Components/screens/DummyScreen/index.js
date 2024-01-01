import React, {useEffect, useMemo, useRef} from 'react';
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
import Frame from '../../common/core/Frame';
import Input from '../../common/core/Input';
import {TabRouter} from '@react-navigation/native';
import {loginUser} from '../../../redux/action/Login';
import {useDispatch, useSelector} from 'react-redux';
import DropShadow from 'react-native-drop-shadow';
import { Strings } from '../../../constants/Strings';

const DummyScreen = () => {
  const dispatch = useDispatch();
  const loginData = useSelector(state => state?.login?.user);
  const loading = useSelector(state => state?.login?.loading);
  const error = useSelector(state => state?.login?.error);

  //* Bottom Sheet Code
  const myComponentRef = useRef(null);
  const snapPointsConfirm = useMemo(() => ['34%', '100%'], []);
  const bottomSheetContent = (
    <View style={{flex: 1, padding: 16}}>
      <Button
        variant={'v1'}
        title={Strings.close}
        onContinue={() => {
          myComponentRef.current?.closeBottomSheet();
        }}
      />
    </View>
  );

  const handleLogin = () => {
    // Dispatch the loginUser action
    dispatch(loginUser('contactNumber', 'password'));
  };


  return (
    <Frame
      showBottomSheet={true}
      snapPoints={snapPointsConfirm}
      bottomSheetContent={bottomSheetContent}
      ref={myComponentRef}
      headerVariant={'v3'}
      style={styles.container}>
        <View style={styles.innerContainer}>
      
<DropShadow style={styles.shadowProp}>
      <Button
        onPress={() => {
          // myComponentRef.current?.expandBottomSheet();
          // handleLogin();
        }}
        title={'Get Started'}
      />

</DropShadow>
        </View>
    </Frame>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
  },
  shadowProp: {
    shadowColor: theme.palette.PrimaryDeep,
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.20,
    shadowRadius: 15,
  },
  innerContainer: {
    margin: theme.spacing.padding.p1,
  },
});

export default DummyScreen;
