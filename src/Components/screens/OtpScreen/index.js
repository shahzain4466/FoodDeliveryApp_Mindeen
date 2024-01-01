import {View, Text} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './styles';
//* Components
import Frame from '../../common/core/Frame';
import Txt from '../../common/core/Txt';
import Button from '../../common/core/Button';
//* Icons
import SuccessTick from '../../../assets/svg/SuccessTick.svg';
//* Others
import {Screens} from '../../../constants/constants';
import {Strings} from '../../../constants/Strings';
import {OtpVerification} from '../../../redux/action/OtpVerification';
import {RegisterNumber} from '../../../redux/action/RegisterNumber';
import {ForgotPassOtpVerify} from '../../../redux/action/ForgotPassOtpVerify';
import {ForgotPassword} from '../../../redux/action/ForgotPassword';
import {CleanupForgotOpt} from '../../../redux/slices/ForgotPassOtpVerifySlice';
import {CleanupSignUpOpt} from '../../../redux/slices/OtpVerificationSlice';
import {CleanupRegNum} from '../../../redux/slices/RegisterNumberSlice';
import {CleanupForgotPass} from '../../../redux/slices/ForgotPasswordSlice';

const CELL_COUNT = 4;

const OtpScreen = ({
  navigation,
  route: {
    params: {path, num, country, token: passedToken, user},
  },
}) => {
  // console.warn('token', num)
  const [value, setValue] = useState('');
  const [token, setToken] = useState(null);
  const [errorState, setError] = useState({status: false, msg: ''});
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    setToken(passedToken);
  }, [passedToken]);

  //* Countdown Timer Logic
  const [timer, setTimer] = useState(30);
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  useEffect(() => {
    if (isCountdownActive) {
      const countdownInterval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [isCountdownActive]);
  useEffect(() => {
    if (timer === 0) {
      setIsCountdownActive(false);
    }
  }, [timer]);
  useEffect(() => {
    if (!isCountdownActive) {
      setIsCountdownActive(false);
    }
  }, [isCountdownActive]);

  //? API'S Logic
  //* OTP Verify (SignUp)
  const dispatch = useDispatch();
  const data = useSelector(state => state.otpVerify.data);
  const loading = useSelector(state => state.otpVerify.loading);
  const error = useSelector(state => state.otpVerify.error);

  const verifyOtp = async (num, otp) => {
    console.log('Varify data', `+92${num}`, otp);
    dispatch(OtpVerification(String(num), String(otp)));
  };

  useEffect(() => {
    if (loading) {
      setError({status: false, msg: ''});
    } else if (error) {
      const {message, statusCode, success} = error;
      setError({status: !success, msg: message});
    } else if (data) {
      navigation.navigate(Screens.SignUp, {num});
      //* CleanUp
      setError({status: false, msg: ''});
      setValue('');
    }
  }, [loading, error, data]);

  useEffect(() => {
    return () => {
      setError({status: false, msg: ''});
      dispatch(CleanupSignUpOpt());
    };
  }, [navigation, dispatch]);

  //* Send Otp (SignUp) (Again)
  const dataSentOtpAgain = useSelector(state => state?.regNum?.data);
  const loadingSentOtpAgain = useSelector(state => state?.regNum?.loading);
  const errorSentOtpAgain = useSelector(state => state.regNum.error);

  const registerNum = async (num, country) => {
    dispatch(RegisterNumber(String(num), country));
  };

  useEffect(() => {
    if (loadingSentOtpAgain) {
      setError({status: false, msg: ''});
    } else if (errorSentOtpAgain) {
      const {message, success} = errorSentOtpAgain;
      setError({status: !success, msg: message});
    } else if (dataSentOtpAgain) {
      console.log('Data:', dataSentOtpAgain);
      BtmRef.current?.expandBottomSheet();
      //* CleanUp
      setError({status: false, msg: ''});
      setTimer(30); //* Reset the timer to 30 seconds
      setIsCountdownActive(true); //* Start the countdown again
    }
  }, [loadingSentOtpAgain, errorSentOtpAgain, dataSentOtpAgain]);

  useEffect(() => {
    return () => {
      setError({status: false, msg: ''});
      dispatch(CleanupRegNum());
    };
  }, [navigation, dispatch]);

  //* Verify Otp (Forgot)
  const dataForgot = useSelector(state => state.forgotPassOtpVerify.data);
  const loadingForgot = useSelector(state => state.forgotPassOtpVerify.loading);
  const errorForgot = useSelector(state => state.forgotPassOtpVerify.error);

  const verifyForgotOtp = async (otp, token) => {
    dispatch(ForgotPassOtpVerify(String(otp), String(token)));
  };

  useEffect(() => {
    if (loadingForgot) {
      setError({status: false, msg: ''});
    } else if (errorForgot) {
      const {message, statusCode, success} = errorForgot;
      setError({status: !success, msg: message});
    } else if (dataForgot) {
      navigation.navigate(Screens.UpdatePassword, {token});
      //* CleanUp
      setError({status: false, msg: ''});
      setValue('');
    }
  }, [loadingForgot, errorForgot, dataForgot]);

  useEffect(() => {
    return () => {
      setError({status: false, msg: ''});
      dispatch(CleanupForgotOpt());
    };
  }, [navigation, dispatch]);

  //* Send Otp (Forgot) (Again)
  const dataForgotOtp = useSelector(state => state.forgotPass.data);
  const loadingForgotOtp = useSelector(state => state.forgotPass.loading);
  const errorForgotOtp = useSelector(state => state.forgotPass.error);

  const handleForgotPassOtp = async user => {
    dispatch(ForgotPassword(user));
  };

  useEffect(() => {
    if (loadingForgotOtp) {
      setError({status: false, msg: ''});
    } else if (errorForgotOtp) {
      const {message, statusCode, success} = errorForgotOtp;
      setError({status: !success, msg: message});
    } else if (dataForgotOtp) {
      console.log('DATA:-', dataForgotOtp);
      if (dataForgotOtp.data.token) {
        setToken(dataForgotOtp.data.token);
        BtmRef.current?.expandBottomSheet();
      }
      //* CleanUp
      setError({status: false, msg: ''});
      setValue('');
      setTimer(30); //* Reset the timer to 30 seconds
      setIsCountdownActive(true); //* Start the countdown again
    }
  }, [loadingForgotOtp, errorForgotOtp, dataForgotOtp]);

  useEffect(() => {
    return () => {
      setError({status: false, msg: ''});
      dispatch(CleanupForgotPass());
    };
  }, [navigation, dispatch]);

  //* Bottom Sheet
  const BtmSnapPoints = useMemo(() => ['40%'], []);
  const BtmRef = useRef(null);
  const BtmContent = (
    <View style={styles.btmContainer}>
      <View style={styles.btmLogo}>
        <SuccessTick />
      </View>
      <Txt style={styles.btmTitle}>{Strings.otpBtmTitleAgain}</Txt>
      <Button
        title={Strings.otpBtmBtnTitle}
        onPress={() => {
          BtmRef.current?.closeBottomSheet();
        }}
      />
    </View>
  );

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={BtmSnapPoints}
      bottomSheetContent={BtmContent}
      ref={BtmRef}
      style={styles.container}
      containerStyle={styles.defSpaceBtw}>
      <View>
        <Txt style={styles.optTitle}>{Strings.otpTitle}</Txt>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {errorState.status ? (
          <Txt style={styles.wrongOtp}>{errorState.msg}</Txt>
        ) : null}
        <Button
          titleStyle={styles.resendBtn}
          title={`${Strings.resend} ${
            timer === 0 ? '00:30' : `00:${timer.toString().padStart(2, '0')}`
          }`}
          variant={'link'}
          onPress={() => {
            if (path === 'login') {
              handleForgotPassOtp(user);
            } else {
              registerNum(num, country);
            }
          }}
          loading={loadingSentOtpAgain || loadingForgotOtp}
          disabled={isCountdownActive}
        />
      </View>
      <Button
        title={Strings.otpMainBtnTitle}
        disabled={value.length !== 4}
        loading={loading || loadingForgot}
        onPress={() => {
          if (path === 'login') {
            verifyForgotOtp(value, token);
          } else {
            verifyOtp(num, value);
          }
        }}
      />
    </Frame>
  );
};

export default OtpScreen;
