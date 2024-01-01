import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
//* Components
import Frame from '../../common/core/Frame';
import Txt from '../../common/core/Txt';
import Button from '../../common/core/Button';
import Input from '../../common/core/Input';
import RadioGroup from '../../common/core/RadioButton';
import CustomTouchableOpacity from '../../common/core/touchableopacity/CustomTouchableOpacity';
//* Others
import {Strings} from '../../../constants/Strings';
import {Screens} from '../../../constants/constants';
import {isValidEmail, validatePassword} from '../../../../utils/globalMethods';
import theme from '../../../themes/theme';
import {SignUp} from '../../../redux/action/SignUp';
import {CleanupSignUp} from '../../../redux/slices/SignUpSlice';
import {
  setData,
  setIsAuthenticated,
} from '../../../redux/slices/LocalUserDataSlice';
import {Emailverification} from '../../../redux/action/Emailverification';
import {CleanupEmailverify} from '../../../redux/slices/EmailverificationSlice';

//* Radio Buttons Logic
const radioOptions = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

const SignupScreen = ({
  navigation,
  route: {
    params: {num},
  },
}) => {
  const [errorState, setError] = useState({status: false, msg: ''});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [disableVerify, setDisableVerify] = useState(true);
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  //* Data States
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(num);
  const [email, setEmail] = useState(null);
  const [dob, setDob] = useState(new Date());
  const [pass, setPass] = useState(null);
  const [gender, setGender] = useState('male');

  //* Effect to check if any of the input fields is empty and disable/enable the Verify button accordingly
  useEffect(() => {
    if (name && number && email && isStrongPassword && dob) {
      setDisableVerify(false);
    } else {
      setDisableVerify(true);
    }
  }, [name, number, email, pass, dob]);

  //* API Logic
  const dispatch = useDispatch();
  const data = useSelector(state => state.signUp.data);
  const loading = useSelector(state => state.signUp.loading);
  const error = useSelector(state => state.signUp.error);

  const signupFunc = async (num, pass, email, name, gender, dob) => {
    dispatch(
      SignUp(
        String(num),
        String(pass),
        String(email),
        String(name),
        String(gender),
        String(dob),
      ),
    );
  };

  useEffect(() => {
    return () => {
      setError({status: false, msg: ''});
      dispatch(CleanupEmailverify());
    };
  }, [dispatch]);

  const verifyEmail = email => {
    dispatch(Emailverification(email));
  };
  const Emailverify = useSelector(state => state.emailVerify);
  const {
    data: getEmailverify,
    loading: loadingEmailverify,
    error: errorEmailverify,
  } = useMemo(() => Emailverify, [Emailverify]);

  useEffect(() => {
    if (loadingEmailverify) {
      setError({status: false, msg: ''});
    } else if (errorEmailverify) {
      const {message, success} = errorEmailverify;
      setError({status: !success, msg: message});
    } else if (getEmailverify) {
      console.log('Data:', getEmailverify);
      if (getEmailverify.success === true) {
        // signupFunc(number, pass, email, name, gender, dob)
      }
      setError({status: false, msg: ''});
    }
  }, [loadingEmailverify, errorEmailverify, getEmailverify]);

  useEffect(() => {
    if (loading) {
      setError({status: false, msg: ''});
    } else if (error) {
      const {message, statusCode, success} = error;
      setError({status: !success, msg: message});
    } else if (data) {
      console.log('Data:', data);
      if (data.data.token) {
        dispatch(setIsAuthenticated({status: true, token: data.data.token}));
        dispatch(setData(data));
      }
      //* CleanUp
      setError({status: false, msg: ''});
      setDisableVerify(false), setEmail(null);
      setPass(null);
      setEmail(null);
      setName(null);
      setGender('male');
    }
  }, [loading, error, data]);

  useEffect(() => {
    return () => {
      setError({status: false, msg: ''});
      setDisableVerify(false), setEmail(null);
      setPass(null);
      setEmail(null);
      setName(null);
      setGender('male');
      dispatch(CleanupSignUp());
    };
  }, [dispatch]);
  //* Loader Comp for input {Email Validator Loader}
  const handleEmailValidationLoading = () => {
    return (
      <>
        {getEmailverify && getEmailverify.loading ? (
          <ActivityIndicator color={theme.palette.PrimaryDeep} />
        ) : null}
      </>
    );
  };

  return (
    <Frame
      customNavigation={{screen: Screens.Login}}
      style={styles.container}
      containerStyle={styles.defSpaceBtw}>
      <View style={{flex: 1}}>
        <Input
          hideTag={false}
          Tag={Strings.caTitle}
          TagStyling={styles.tag}
          // error={errorState.status}
          // errorDetail={errorState.msg}
          placeholder={Strings.caNamePlaceHolder}
          ContentContainerStyle={styles.input}
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <Input
          placeholder={Strings.caNumPlaceHolder}
          value={String(number)}
          inputMode="numeric"
          editable={false}
          ContentContainerStyle={styles.input}
        />
        <Input
          placeholder={Strings.caEmailPlaceHolder}
          ContentContainerStyle={styles.input}
          value={email}
          error={errorState.status}
          errorDetail={errorState.msg}
          onChangeText={text => {
            setEmail(text);
            setError({status: false, msg: ''});
          }}
          rightComp={handleEmailValidationLoading}
          onBlur={() => {
            if (isValidEmail(email)) {
              verifyEmail(email);
              console.log('Valid Email!!!!!');
            } else {
              setError({status: true, msg: 'invalid email'});
              console.log('In Valid Email!!!!!');
            }
          }}
        />

        <Input
          icon
          inputType={'btn'}
          imgSource={require('../../../assets/images/calendar.png')}
          placeholder={Strings.caDOBPlaceHolder}
          ContentContainerStyle={styles.input}
          value={
            moment(new Date()).format('DD/MM/YYYY') ===
            moment(dob).format('DD/MM/YYYY')
              ? ''
              : moment(dob).format('DD/MM/YYYY')
          }
          editable={false}
          // pressable={true}
          onPress={() => setShowDatePicker(true)}
        />
        <Input
          inputType={'password'}
          placeholder={Strings.caPassPlaceHolder}
          value={pass}
          onChangeText={text => {
            setPass(text);
            setIsStrongPassword(validatePassword(text));
          }}
        />
        {/* Password Algo Indicator Text */}
        <Txt
          style={[
            styles.passIndicator,
            {
              color: !isStrongPassword
                ? theme.palette.PrimaryDeep
                : theme.palette.green,
            },
          ]}>
          {!isStrongPassword
            ? Strings.caPassIndicatorWrong
            : Strings.caPassIndicator}
        </Txt>
        <View style={styles.radioContainer}>
          <RadioGroup
            defValue={gender}
            horizontal
            radioOptions={radioOptions}
            onSelect={value => setGender(value)}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.signUp}>
          <Txt style={styles.newUser}>{Strings.caAlreadyAc} </Txt>
          <Button
            onPress={() => navigation.navigate(Screens.Login)}
            variant={'link'}
            title={Strings.caSignInLink}
          />
        </View>
        <View>
          <Button
            linkButtonStyle={styles.termConditionLink}
            titleStyle={[theme.typography.common.note]}
            variant={'link'}
            onPress={() => {}}
            title={Strings.caTermLinkBtn}
          />
          <Button
            title={Strings.caMainBtnTitle}
            loading={loading}
            disabled={disableVerify}
            onPress={() => {
              signupFunc(number, pass, email, name, gender, dob);
              // verifyEmail(email)
            }}
          />
        </View>
      </View>

      {/* Date Picker Modal Triggers When: (showDatePicker) ? true : false */}
      <DatePicker
        modal
        mode="date"
        open={showDatePicker}
        date={dob}
        onDateChange={setDob}
        maximumDate={new Date()}
        onConfirm={date => {
          setShowDatePicker(false);
          setDob(date);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />
    </Frame>
  );
};

export default SignupScreen;
