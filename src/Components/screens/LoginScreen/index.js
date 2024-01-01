import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
//* Components
import Frame from '../../common/core/Frame';
import Txt from '../../common/core/Txt';
import Button from '../../common/core/Button';
import Input from '../../common/core/Input';
//* Others
import {Screens} from '../../../constants/constants';
import {Strings} from '../../../constants/Strings';
import {loginUser} from '../../../redux/action/Login';
import {CleanupSignIn} from '../../../redux/slices/LoginSlice';
import {
  setData,
  setIsAuthenticated,
} from '../../../redux/slices/LocalUserDataSlice';
import {isValidEmail} from '../../../../utils/globalMethods';
import theme from '../../../themes/theme';
import CountryInput from '../../common/others/TextInputWithFlags/TextInputWithFlag';
import {StoreData} from '../../../redux/slices/RememberMeSlice';
const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [mail, setMail] = useState(false);
  const [password, setPassword] = useState(null);
  const [disableBtn, setDisableBtn] = useState(true);
  const [checkBox, setCheckBox] = useState(false);

  const [errorState, setError] = useState({status: false, msg: ''});
  console.log('errorMessage', errorState);

  //* API Call Logic
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.login.user);
  const rememberData = useSelector(state => state?.rememberme?.User);
  const loading = useSelector(state => state.login.loading);
  const error = useSelector(state => state.login.error);
  const [number, setNumber] = useState(null);
  const [country, setCountry] = useState('PK');
  //* Effect to check if any of the input fields is empty and disable/enable the sign in button accordingly
  useEffect(() => {
    if (user && password) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [user, password]);

  useEffect(() => {
    const isEmail = isValidEmail(rememberData?.user);
    console.log('isEmail', isEmail);
    setMail(isEmail);
    setUser(rememberData?.user);
    setPassword(rememberData?.password);
    if (rememberData?.user) {
      setCheckBox(true);
    } else {
      setCheckBox(false);
    }
  }, [rememberData]);

  const handleLogin = async (num, pass) => {
    let formattedNum = num;

    //* Remove leading 0 if present
    if (formattedNum.startsWith('0')) {
      formattedNum = formattedNum.substr(1);
    }

    //* Check if the input is a valid email
    const isEmail = isValidEmail(formattedNum);
    if (isEmail) {
      formattedNum = formattedNum.toLowerCase();
    }
    //* Format the number if it's not an email
    if (!isEmail) {
      formattedNum = '+92' + formattedNum;
    }
    dispatch(loginUser(formattedNum, pass));
  };

  useEffect(() => {
    if (loading) {
      setError({status: false, msg: ''});
    } else if (error) {
      const {message, success} = error;
      setError({status: !success, msg: message});
    } else if (loginData) {
      if (checkBox) {
        const data = {user, password};
        dispatch(StoreData(data));
      } else {
        dispatch(StoreData(''));
      }
      dispatch(setIsAuthenticated({status: true, token: loginData.data.token}));
      dispatch(setData(loginData));
      console.log('Data:', loginData.data.token);
      setError({status: false, msg: ''});
      setUser(null);
      setPassword(null);
    }
  }, [loading, error, loginData]);

  useEffect(() => {
    return () => {
      setUser(null);
      setPassword(null);
      setError({status: false, msg: ''});
      dispatch(CleanupSignIn());
    };
  }, [navigation, dispatch]);

  const [selectedOption, setSelectedOption] = useState('phone');

  const handleSelectChange = option => {
    setSelectedOption(option);
  };

  return (
    <Frame
      style={styles.container}
      containerStyle={styles.defSpaceBtw}
      hideBack>
      <View style={styles.innerContainer}>
        <View style={styles.container1}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === 'phone' && styles.selected,
            ]}
            onPress={() => {
              // setUser(null);
              handleSelectChange('phone');
              setError('');
            }}>
            <Text
              style={[
                styles.emailText,
                selectedOption === 'phone' && styles.selectedAccount,
              ]}>
              {Strings.prPlaceHolder}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === 'email' && styles.selected,
            ]}
            onPress={() => {
              // setUser(null);
              handleSelectChange('email');
              setError('');
            }}>
            <Text
              style={[
                styles.emailText,
                selectedOption === 'email' && styles.selectedAccount,
              ]}>
              {Strings.snEmail}
            </Text>
          </TouchableOpacity>
        </View>
        {selectedOption == 'phone' ? (
          <CountryInput
            hideTag={false}
            Tag={Strings.snTitle}
            TagStyling={styles.tag}
            PhoneStyle={styles.tag}
            onChangeText={text => {
              setMail(false);
              setUser(text);
            }}
            value={mail ? '' : user}
            onSelect={code => {
              setCountry(code);
            }}
            maxLength={10}
            error={errorState.status}
            errorDetail={'‘Incorrect phone number or Password’'} //errorState.msg
          />
        ) : (
          <Input
            value={mail ? user : ''}
            onChangeText={text => {
              setMail(true);
              setUser(text);
              setError({status: false, msg: ''});
            }}
            hideTag={false}
            Tag={Strings.snTitle}
            error={errorState.status}
            errorDetail={'‘Incorrect Email or Password’'} //errorState.msg
            TagStyling={styles.tag}
            placeholder={Strings.snEmail}
            ContentContainerStyle={styles.input}
          />
        )}
        <Input
          value={password}
          onChangeText={text => {
            setPassword(text);
            setError({status: false, msg: ''});
          }}
          inputType={'password'}
          placeholder={Strings.snPassPlaceHolder}
        />
        <Pressable
          style={styles.checkBoxView}
          onPress={() => setCheckBox(!checkBox)}>
          <Image
            source={
              checkBox
                ? require('../../../assets/images/checked.png')
                : require('../../../assets/images/uncheck.png')
            }
            style={styles.checkBox}
          />
          <Txt style={styles.remember}>{Strings.rememberMe}</Txt>
        </Pressable>
        <Button
          linkButtonStyle={styles.forgotBtn}
          variant={'link'}
          onPress={() =>
            navigation.navigate(Screens.ForgotPassword, {path: 'login'})
          }
          title={Strings.snForgotBtn}
        />
      </View>
      <View>
        <View style={styles.signUp}>
          <Txt style={styles.newUser}>{Strings.snNewUser}</Txt>
          <Button
            onPress={() =>
              navigation.navigate(Screens.PhoneRegistration, {path: 'register'})
            }
            variant={'link'}
            title={Strings.snSignUpBtn}
          />
        </View>
        <Button
          title={Strings.snMainBtnTitle}
          loading={loading}
          disabled={disableBtn}
          onPress={() => {
            handleLogin(user, password);
          }}
        />
      </View>
    </Frame>
  );
};

export default LoginScreen;
