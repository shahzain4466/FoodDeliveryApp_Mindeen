import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import Frame from '../../common/core/Frame'
import styles from './styles'
import Botton from '../../common/core/Button'
import Button from '../../common/core/Button';
import SuccessTick from '../../../assets/svg/SuccessTick.svg';
import { Screens } from '../../../constants/constants'
import { Strings } from '../../../constants/Strings'
import Cardinfo from '../../common/others/Cardinfo/Cardinfo'
import { useDispatch, useSelector } from 'react-redux';
import { GetPaymentMethods } from '../../../redux/action/GetPaymentMethods'
import { DeletePaymentMethod } from '../../../redux/action/DeletePaymentMethod'
import { CleanupDeleteMethod } from '../../../redux/slices/DeleteMethodSlice'
import { useIsFocused } from '@react-navigation/native';
import Txt from '../../common/core/Txt'
import theme from '../../../themes/theme'
import Images from '../../../assets/images'
const Payment = ({ navigation }) => {

  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const { token } = useSelector(state => state.userData.isAuthenticated);
  const PaymentMethods = useSelector(state => state.getmethods)

  //* Memoize Him
  const [methodsData, setMethodsData] = useState([])
  const [errorState, setError] = useState({ status: false, msg: '' });
  const {
    data: getPaymentMethod,
    loading: loadingPaymentMethod,
    error: errorgetpaymentmethod,
  } = useMemo(() => PaymentMethods, [PaymentMethods]);

  useEffect(() => {
    if (loadingPaymentMethod) {
      setError({ status: false, msg: '' });
    } else if (errorgetpaymentmethod) {
      const { message, success } = errorgetpaymentmethod;
      setError({ status: !success, msg: message });
    } else if (getPaymentMethod) {
      console.log('Payment mathods:-', getPaymentMethod);
      setMethodsData(getPaymentMethod.data)
      setError({ status: false, msg: '' });
    }
  }, [getPaymentMethod, loadingPaymentMethod, errorgetpaymentmethod]);

  // Delete Method
  const deletedmethodApi = useSelector(state => state.deleteMethods);
  console.log('deletedmethodApi', deletedmethodApi)
  //* Memoize Him
  const {
    data: deletedmethodApiData,
    loading: deletedmethodApiLoading,
    error: deletedmethodApiError,
  } = useMemo(() => deletedmethodApi, [deletedmethodApi]);

  useEffect(() => {
    dispatch(GetPaymentMethods(token))
  }, [dispatch, token, isFocused])

  useEffect(() => {
    if (deletedmethodApiLoading) {
      setError({ status: false, msg: '' });
    } else if (deletedmethodApiError) {
      const { message, success } = deletedmethodApiError;
      setError({ status: !success, msg: message });
    } else if (deletedmethodApiData) {
      console.log('Data:-', deletedmethodApiData);
      confirmBtm.current?.expandBottomSheet();
      setError({ status: false, msg: '' });
      dispatch(GetPaymentMethods(token));
    }
  }, [deletedmethodApiData, deletedmethodApiLoading, deletedmethodApiError]);



  const DeleteMethod = (id, token) => {
    dispatch(DeletePaymentMethod(id, token))
  }
  useEffect(() => {
    return () => {
      dispatch(CleanupDeleteMethod());
    };
  }, []);


  const formatCardNumberForDisplay = (cardNumber) => {
    if (typeof cardNumber !== 'number' || cardNumber.toString().length !== 16) {
      return 'Invalid card number';
    }
    const cardNumberStr = cardNumber.toString();

    const groups = cardNumberStr.match(/.{1,4}/g);

    if (!groups) {
      return 'Invalid card number';
    }

    const maskedGroups = [
      groups.slice(0, -1).join(' '), // Combine and keep the first 12 digits with spaces
      '****',
    ];
    const formattedCardNumber = maskedGroups.join(' ');

    return formattedCardNumber;
  };
  const renderItem = ({ item }) => {
    const formattedCardNumber = formatCardNumberForDisplay(item.cardNumber);
    console.log("formattedCardNumber.match -->>", formattedCardNumber.match(new RegExp("^4")));
    return (
      <View>
        <Cardinfo
          Cardimg={
            formattedCardNumber.match(new RegExp("^4")) !== null ?
              Images.visalogo
              :
              Images.MasterLogo
          }
          imgstyle={{ width: 40, height: 25 }}
          numtxt={formattedCardNumber}
          righticon={Images.Delete}
          cardStyle={styles.cardStyle}
          pressRightIcon={() => DeleteMethod(item._id, token)}
        />
      </View>
    )
  }

  const confirmBtm = useRef(null);
  const snapPointConfirmBtm = useMemo(() => ['40%'], []);
  const closedBtm = (
    <View style={styles.btmContainer}>
      <View style={styles.successTickIconContainer}>
        <SuccessTick />
      </View>
      <Txt
        style={[styles.delBtmTitle, { marginVertical: theme.spacing.margin.m1 }]}>
        {Strings.pmbtnsheetDelete}
      </Txt>
      <Button
        title={Strings.locBtnBtmOneTitle}
        onPress={() => {
          confirmBtm.current?.closeBottomSheet();
        }}
      />
    </View>
  );

  return (
    <Frame

      ref={confirmBtm}
      bottomSheetContent={closedBtm}
      snapPoints={snapPointConfirmBtm}
      showBottomSheet={true}
      style={styles.container}
      mode={'view'}
      customNavigation={{ screen: Screens.MainMenu }}
    >

      {(methodsData?.length) > 0 ?
        <View style={styles.methodcon}>
          <Text style={styles.select}>{Strings.selectmethod}</Text>
          <FlatList
            data={methodsData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        :
        <View>
          <Image
            source={Images.Card}
            style={styles.Cardimg}
          />
          <View style={styles.Carddesc}>
            <Text style={styles.heading}>{Strings.noMethod}</Text>
            <Text style={styles.subtxt}>{Strings.noMethodesc}</Text>
          </View>
        </View>
      }
      <Botton
        titleStyle={styles.titletxt}
        title={Strings.snAddNew}
        singleButtonStyle={styles.btn}
        onPress={() => navigation.navigate(Screens.SaveDetails)}
      />
    </Frame>
  )
}

export default Payment