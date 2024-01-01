import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
//* Components
import Frame from '../../common/core/Frame';
import Input from '../../common/core/Input';
import Button from '../../common/core/Button';
import Txt from '../../common/core/Txt';
//* Icons
import SuccessTick from '../../../assets/svg/SuccessTick.svg';
//* Others
import {Screens} from '../../../constants/constants';
import {Strings} from '../../../constants/Strings';
import {useDispatch, useSelector} from 'react-redux';
import {UpdatePassword} from '../../../redux/action/UpdatePassword';
import {validatePassword} from '../../../../utils/globalMethods';
import theme from '../../../themes/theme';
import {CleanupUpdatePass} from '../../../redux/slices/UpdatePasswordSlice';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const UpdatePasswordScreen = ({
  navigation,
  route: {
    params: {token},
  },
}) => {
  const [pass, setPass] = useState(null);
  const [cPass, setCPass] = useState(null);
  const [disableBtn, setDisableBtn] = useState(true);
  const [errorState, setError] = useState({status: false, msg: ''});
  const [isStrongPassword, setIsStrongPassword] = useState(false);

  //* Effect to check if any of the input fields is empty and disable/enable the sign in button accordingly
  useEffect(() => {
    if (pass && pass === cPass) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [pass, cPass]);

  //* API Call Logic
  const dispatch = useDispatch();
  const data = useSelector(state => state.updatePass.data);
  const loading = useSelector(state => state.updatePass.loading);
  const error = useSelector(state => state.updatePass.error);

  const handleUpdatePass = async (pass, cPass, token) => {
    dispatch(UpdatePassword(pass, cPass, token));
  };

  useEffect(() => {
    if (loading) {
      setError({status: false, msg: ''});
    } else if (error) {
      const {message, success} = error;
      setError({status: !success, msg: message});
    } else if (data) {
      console.log('Data:', data);
      BtmRef.current?.expandBottomSheet();
      //* Cleaning the states
      setError({status: false, msg: ''});
      setPass(null);
      setCPass(null);
    }
  }, [loading, error, data]);

  useEffect(() => {
    return () => {
      setPass(null);
      setCPass(null);
      setError({status: false, msg: ''});
      dispatch(CleanupUpdatePass());
    };
  }, [navigation, dispatch]);

  //* Bottom Sheet Code
  const BtmRef = useRef(null);
  const snapPoints = useMemo(() => ['37%'], []);
  const BtmContent = (
    <View style={styles.btmContainer}>
      <View style={styles.btmLogo}>
        <SuccessTick />
      </View>
      <Txt style={styles.btmTitle}>{Strings.upBtmTitle}</Txt>
      <Txt style={styles.btmDesc}>{Strings.upBtmDesc}</Txt>
      <Button
        title={Strings.loginbtn}
        singleButtonStyle={{marginTop: theme.spacing.margin.m5}}
        onPress={() => navigation.navigate(Screens.Login)}
      />
    </View>
  );

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={snapPoints}
      bottomSheetContent={BtmContent}
      ref={BtmRef}
      style={styles.container}
      containerStyle={styles.defSpaceBtw}
      enablePanDownToClose={false}
      customNavigation={{screen: Screens.Login}}>
      <View>
        <Input
          hideTag={false}
          Tag={Strings.upTitle}
          TagStyling={styles.tag}
          error={errorState.status}
          errorDetail={errorState.msg}
          value={pass}
          onChangeText={text => {
            setPass(text);
            setError({status: false, msg: ''});
            setIsStrongPassword(validatePassword(text));
          }}
          placeholder={Strings.upPassPlaceHolder}
          ContentContainerStyle={styles.input}
          inputType={'password'}
        />
        <Input
          inputType={'password'}
          value={cPass}
          onChangeText={text => {
            setCPass(text);
          }}
          placeholder={Strings.upConfirmPassPlaceHolder}
          ContentContainerStyle={styles.input}
        />

        {/* Password Algo Indicator Text */}
        <Txt
          style={[
            styles.passIndicator,
            {
              color: isStrongPassword
              ?pass ===cPass
              ?theme.palette.green
                : theme.palette.PrimaryDeep
                :theme.palette.PrimaryDeep ,
            },
          ]}>
          {isStrongPassword
            ? pass === cPass
              ? Strings.caPassIndicator
              : Strings.matchPassword
            : Strings.caPassIndicatorWrong}
        </Txt>
      </View>
      <Button
        loading={loading}
        disabled={disableBtn}
        onPress={() => {
          handleUpdatePass(pass, cPass, token);
        }}
        title={Strings.upMainBtnTitle}
      />
    </Frame>
  );
};

export default UpdatePasswordScreen;
