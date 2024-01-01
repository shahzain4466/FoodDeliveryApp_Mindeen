import React, {useEffect, useState, useRef, useMemo} from 'react';
import {View} from 'react-native';
import styles from './styles';
import SuccessTick from '../../../assets/svg/SuccessTick.svg';
import Txt from '../../common/core/Txt';

//* Components
import Frame from '../../common/core/Frame';
import Input from '../../common/core/Input';
import Button from '../../common/core/Button';
//* Others
import {Screens} from '../../../constants/constants';
import {Strings} from '../../../constants/Strings';
import {useDispatch, useSelector} from 'react-redux';
import {ForgotPassword} from '../../../redux/action/ForgotPassword';
import {CleanupForgotPass} from '../../../redux/slices/ForgotPasswordSlice';
import {isValidEmail} from '../../../../utils/globalMethods';

const ForgotPasswordScreen = ({
  navigation,
  route: {
    params: {path},
  },
}) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

  const [number, setNumber] = useState(null);
  const [disableBtn, setDisableBtn] = useState(true);
  const [errorState, setError] = useState({status: false, msg: ''});

  /*
   * Effect to check if any of the input fields is empty and
   * disable/enable the sign in button accordingly
   */
  useEffect(() => {
    if (user) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [user]);

  //* API Call Logic
  const dispatch = useDispatch();
  const data = useSelector(state => state.forgotPass.data);
  const loading = useSelector(state => state.forgotPass.loading);
  const error = useSelector(state => state.forgotPass.error);

  const handleForgotPass = async user => {
    console.log('User', user);
    let formattedNum = user;
    if (formattedNum.startsWith('0')) {
      formattedNum = formattedNum.substr(1);
    }

    //* Check if the input is a valid email
    const isEmail = isValidEmail(formattedNum);

    //* Format the number if it's not an email
    if (!isEmail) {
      formattedNum = '+92' + formattedNum;
    }
    dispatch(ForgotPassword(formattedNum));
  };

  useEffect(() => {
    if (loading) {
      setDisableBtn(true);
      setError({status: false, msg: ''});
    } else if (error) {
      const {message, success} = error;
      setError({status: !success, msg: message});
    } else if (data) {
      if (data.data.token) {
        // let token = data.data.token
        setToken(data?.data?.token);
        console.log('Data:-', token);
        BtmRef.current?.expandBottomSheet();

        // navigation.navigate(Screens.Otp, {path, token, user});
      }
      //* Cleaning the States
      setUser(null);
      setNumber('');
      setEmail('');
      setError({status: false, msg: ''});
    }
  }, [loading, error, data]);

  useEffect(() => {
    return () => {
      setNumber('');
      setEmail('');
      setError({status: false, msg: ''});
      dispatch(CleanupForgotPass());
    };
  }, [navigation, dispatch]);

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
          navigation.navigate(Screens.Otp, {path, token, user});
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
      style={styles.container}>
      <View style={styles.innerContainer}>
        <Input
          hideTag={false}
          Tag={Strings.fpTitle}
          TagStyling={styles.tag}
          error={errorState.status}
          errorDetail={errorState.msg}
          placeholder={Strings.fpEmailPlaceHolder}
          ContentContainerStyle={styles.input}
          value={user}
          onChangeText={text => {
            setUser(text);
            setError({status: false, msg: ''});
          }}
        />
        <View>
          <Button
            loading={loading}
            disabled={disableBtn}
            onPress={() => {
              handleForgotPass(user);
            }}
            title={Strings.fpMainBtnTitle}
          />
        </View>
      </View>
    </Frame>
  );
};

export default ForgotPasswordScreen;
