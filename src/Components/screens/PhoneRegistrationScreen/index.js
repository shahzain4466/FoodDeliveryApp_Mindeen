import {View} from 'react-native';
import React, {useState, useEffect, useRef, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import SuccessTick from '../../../assets/svg/SuccessTick.svg';
import Txt from '../../common/core/Txt';

//* Components
import Frame from '../../common/core/Frame';
import Button from '../../common/core/Button';
import CountryInput from '../../common/others/TextInputWithFlags/TextInputWithFlag';
//* Others
import {Screens} from '../../../constants/constants';
import {Strings} from '../../../constants/Strings';
import {RegisterNumber} from '../../../redux/action/RegisterNumber';
import {CleanupRegNum} from '../../../redux/slices/RegisterNumberSlice';

const PhoneRegistrationScreen = ({navigation}) => {
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState('PK');
  const [errorState, setError] = useState({status: false, msg: ''});

  //* API Logic
  const dispatch = useDispatch();
  const data = useSelector(state => state?.regNum?.data);
  const loading = useSelector(state => state?.regNum?.loading);
  const error = useSelector(state => state.regNum.error);

  const registerNum = async (num, country) => {
    dispatch(RegisterNumber(String(num), country));
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
      //* CleanUp
      setError({status: false, msg: ''});
    }
  }, [loading, error, data]);

  useEffect(() => {
    return () => {
      setNumber('');
      setError({status: false, msg: ''});
      dispatch(CleanupRegNum());
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
          console.log('Number', number);
          navigation.navigate(Screens.Otp, {num: number, country});
          //  console.log('jhkjfhgkhsk',number)
        }}
      />
    </View>
  );

  return (
    <Frame
      style={styles.container}
      showBottomSheet={true}
      snapPoints={BtmSnapPoints}
      bottomSheetContent={BtmContent}
      ref={BtmRef}>
      <View style={styles.innerContainer}>
        <CountryInput
          hideTag={false}
          Tag={Strings.askNumber}
          TagStyling={styles.tag}
          onChangeText={text => {
            setNumber(text);
          }}
          value={number}
          onSelect={code => {
            setCountry(code);
          }}
          maxLength={10}
          error={errorState.status}
          errorDetail={errorState.msg}
        />

        <Button
          linkButtonStyle={styles.forgotBtn}
          loading={loading}
          disabled={!number}
          onPress={() => {
            registerNum(number, country);
          }}
          title={Strings.prBtnTitle}
        />
      </View>
    </Frame>
  );
};

export default PhoneRegistrationScreen;
