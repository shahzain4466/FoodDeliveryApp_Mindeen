import {View, Text, Image} from 'react-native';
import React, {useState, useMemo, useEffect, useRef} from 'react';
import Frame from '../../common/core/Frame';
import styles from './styles';
import Botton from '../../common/core/Button';
import {Screens} from '../../../constants/constants';
import {Strings} from '../../../constants/Strings';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';
import Input from '../../common/core/Input';
import SuccessTick from '../../../assets/svg/SuccessTick.svg';
import Button from '../../common/core/Button';
import {AddPaymentAPI} from '../../../redux/action/AddPaymentAPI';
import {useDispatch, useSelector} from 'react-redux';
import Txt from '../../common/core/Txt';
import Images from '../../../assets/images';
const SaveDetails = ({navigation}) => {
  const {token} = useSelector(state => state.userData.isAuthenticated);
  const addPaymentMethod = useSelector(state => state.AddPayment);

  const dispatch = useDispatch();
  const [disableVerify, setDisableVerify] = useState(true);
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [cardHolderName, setcardHolderName] = useState('');
  const [cardDigit, setcardDigit] = useState(null);
  const [expiry_date, setexpiry_date] = useState('');
  const [cvc_cvv, setcvc_cvv] = useState(null);
  const [errorState, setError] = useState({status: false, msg: ''});
  const [showSecondBtm, setShowSecondBtm] = useState(false);
  const [showInfoBtm, setShowInfoBtm] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(null);

  useEffect(() => {
    if (
      cardHolderName &&
      cardDigit &&
      cvc_cvv?.length > 2 &&
      expiry_date &&
      cardDigit?.length > 18
    ) {
      setDisableVerify(false);
    } else {
      setDisableVerify(true);
    }
  }, [cardHolderName, cardDigit, cvc_cvv, expiry_date]);

  const {
    data: getaddPaymentMethod,
    loading: loadingaddPaymentMethod,
    error: erroraddPaymentMethod,
  } = useMemo(() => addPaymentMethod, [addPaymentMethod]);

  useEffect(() => {
    if (loadingaddPaymentMethod) {
      setError({status: false, msg: ''});
    } else if (erroraddPaymentMethod) {
      const {message, success} = erroraddPaymentMethod;
      setError({status: !success, msg: message});
    } else if (getaddPaymentMethod) {
      console.log('Add mathods:-', getaddPaymentMethod);
      if (getaddPaymentMethod.success === true) {
        setShowSecondBtm(false);
        confirmBtm.current?.expandBottomSheet();
        setcardDigit(null);
        setcardHolderName('');
        setcvc_cvv(null);
        setexpiry_date('');
      }
      setError({status: false, msg: ''});
    }
  }, [getaddPaymentMethod, loadingaddPaymentMethod, erroraddPaymentMethod]);

  //* Bottom Sheets Logic
  //* Confirm save
  const saveBtm = useRef(null);
  const snapPointSaveBtm = useMemo(() => ['35%'], []);
  const saveDetailBtm = (
    <View style={styles.btmContainer}>
      <Txt style={styles.delBtmTitle}>{Strings.apmbtmsheethead}</Txt>
      <Txt style={styles.delBtmDesc}>{Strings.apmbtmsheettxt}</Txt>
      <Button
        variant={'v1'}
        continueTitle={'Yes'}
        cancelTitle={'No'}
        loading={loadingaddPaymentMethod}
        onCancel={() => {
          saveBtm.current?.closeBottomSheet();
          setShowSecondBtm(false);
        }}
        onContinue={() => {
          const cardNumber = cardDigit.replace(/\s/g, '');
          console.log(cardNumber, cardHolderName, expiry_date, cvc_cvv, token);
          dispatch(
            AddPaymentAPI(
              cardNumber,
              cardHolderName,
              expiry_date,
              cvc_cvv,
              token,
            ),
          );
        }}
      />
    </View>
  );

  //* confirm
  const confirmBtm = useRef(null);
  const snapPointConfirmBtm = useMemo(() => ['40%'], []);
  const closedBtm = (
    <View style={styles.btmContainer}>
      <View style={styles.successTickIconContainer}>
        <SuccessTick />
      </View>
      <Txt
        style={[styles.delBtmTitle, {marginVertical: theme.spacing.margin.m1}]}>
        {Strings.apmbtnsheetsuccess}
      </Txt>
      <Button
        title={Strings.locBtnBtmOneTitle}
        onPress={() => {
          setShowSecondBtm(false);
          confirmBtm.current?.closeBottomSheet();
          navigation.navigate(Screens.Payment);
        }}
      />
    </View>
  );
  const informationBtm = useRef(null);
  const snapPointInfoBtm = useMemo(() => ['45%'], []);
  const infoBtm = (
    <View style={styles.btmContainer}>
      <View style={styles.successTickIconContainer}>
        <Image source={Images.CVVinfo} style={styles.infomodalpic} />
      </View>
      <Txt
        style={[
          styles.infoBtmTitle,
          {marginVertical: theme.spacing.margin.m1},
        ]}>
        {Strings.cvvinfohead}
        <Text style={styles.subinfohead}>{Strings.cvvinfo}</Text>
      </Txt>
      <Button
        title={Strings.locBtnBtmOneTitle}
        singleButtonStyle={styles.closebtn}
        onPress={() => {
          informationBtm.current?.closeBottomSheet();
          setShowInfoBtm(false);
        }}
      />
    </View>
  );

  const validateCardNumber = text => {
    const formattedText = text.replace(/\D/g, '');
    const formattedNumber = formattedText
      .replace(/(\d{4})/g, '$1 ')
      .trim()
      .slice(0, 19);

    setcardDigit(formattedNumber);
    const isValid = formattedNumber.length === 19;
    if (!isValid) {
      setCardNumberError(Strings.cardValidate);
    } else {
      setCardNumberError(null);
    }
  };

  const handleExpiryDateChange = text => {
    // Ensure that only digits are entered
    const cleanedText = text?.replace(/[^0-9]/g, '');
    if (!cleanedText || cleanedText === '/') {
      setexpiry_date('');
    } else if (cleanedText?.length < 2) {
      setexpiry_date(cleanedText);
    } else if (cleanedText?.length >= 2) {
      setexpiry_date(`${cleanedText?.slice(0, 2)}/${cleanedText?.slice(2)}`);
    }
  };

  const saveCardDetails = () => {
    if (cardDigit[0] === '2' || cardDigit[0] === '4' || cardDigit[0] === '5') {
      setShowSecondBtm(true);
      setTimeout(() => {
        saveBtm.current?.expandBottomSheet();
      }, 300);
    } else {
      alert('Invalid Card Number!');
    }
  };

  return (
    <Frame
      showBottomSheet={true}
      snapPoints={
        showInfoBtm
          ? snapPointInfoBtm
          : null || showSecondBtm
          ? snapPointSaveBtm
          : snapPointConfirmBtm
      }
      bottomSheetContent={
        showInfoBtm
          ? infoBtm
          : null || showSecondBtm
          ? saveDetailBtm
          : closedBtm
      }
      // headerVariant={'blank'}
      ref={
        showInfoBtm
          ? informationBtm
          : null || showSecondBtm
          ? saveBtm
          : confirmBtm
      }
      style={styles.container}
      mode={'view'}
      customNavigation={{screen: Screens.Payment}}>
      <Input
        value={cardHolderName}
        onChangeText={text => setcardHolderName(text)}
        hideTag={false}
        Tag={Strings.cardHolder}
        TagStyling={styles.titletxt}
        placeholder={Strings.namePlaceHolder}
        InputStyling={styles.name}
      />
      <Input
        value={cardDigit}
        onChangeText={text => validateCardNumber(text)}
        hideTag={false}
        Tag={Strings.cardNumb}
        TagStyling={styles.titletxt}
        placeholder={Strings.cardPlaceHolder}
        InputStyling={styles.cardnum}
        ContentContainerStyle={styles.cardContainer}
        keyboardType={'numeric'}
      />
      {cardNumberError && (
        <Text style={styles.errorText}>{cardNumberError}</Text>
      )}

      <View style={styles.DateView}>
        <Input
          value={expiry_date}
          onChangeText={handleExpiryDateChange}
          hideTag={false}
          Tag={Strings.expiryDate}
          TagStyling={styles.titletxt}
          placeholder="MM/YY"
          maxLength={5}
          InputStyling={styles.Expiry}
          keyboardType={'numeric'}
          ContentContainerStyle={styles.input1}
          // value={
          //     moment(new Date()).format('MM/YY') ===
          //         moment(expiry_date).format('MM/YY')
          //         ? ''
          //         : moment(expiry_date).format('MM/YY')
          // }
          // iconStyle={{ tintColor: theme.palette.PrimaryDark }}
          // onIconPress={() => setShowDatePicker(true)}
        />

        <Input
          icon
          inputType={'btn'}
          ContentContainerStyle={styles.input}
          value={cvc_cvv}
          onChangeText={text => setcvc_cvv(text)}
          hideTag={false}
          Tag={Strings.cVctitle}
          TagStyling={styles.titletxt}
          placeholder="***"
          secureTextEntry
          maxLength={3}
          InputStyling={styles.Cvv}
          keyboardType={'numeric'}
          imgSource={Images.Vector}
          onPress={() => {
            setShowInfoBtm(true);
            setTimeout(() => {
              informationBtm.current?.expandBottomSheet(true);
            }, 300);
          }}
        />
      </View>

      <Botton
        titleStyle={styles.btntxt}
        title={Strings.snSaveDetails}
        singleButtonStyle={styles.btn}
        disabled={disableVerify}
        onPress={() => {
          saveCardDetails();
        }}
      />
      {/* <DatePicker
                modal
                mode="date"
                open={showDatePicker}
                date={expiry_date}
                onDateChange={setexpiry_date}
                // maximumDate={new Date()}
                onConfirm={date => {
                    setShowDatePicker(false);
                    setexpiry_date(date);
                }}
                onCancel={() => {
                    setShowDatePicker(false);
                }}
            /> */}
    </Frame>
  );
};

export default SaveDetails;
