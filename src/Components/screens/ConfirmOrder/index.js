import {View, Text, Image, Alert, ImageBackground} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Frame from '../../common/core/Frame';
import styles from './styles';
import {Screens} from '../../../constants/constants';
import OrderInfo from '../../common/others/OrderInfo/OrderInfo';
import Images from '../../../assets/images';
import CalculateView from '../../common/others/CalculateView/CalculateView';
import {scale} from '../../../../utils/scale';
import Botton from '../../common/core/Button';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {PlaceOrder} from '../../../redux/action/PlaceOrder';

const ConfirmOrder = ({navigation, route}) => {
  const {orderData, cartItem, selectedPayment} = route.params;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {token} = useSelector(state => state.userData.isAuthenticated);
  const placeOrder = useSelector(state => state.placeOrder);
  const [orderRes, setOrderRes] = useState([]);
  const [errorState, setError] = useState({status: false, msg: ''});
  const {
    data: getPlaceOrder,
    loading: loadingPlaceOrder,
    error: errorPlaceOrder,
  } = useMemo(() => placeOrder, [placeOrder]);

  useEffect(() => {
    if (loadingPlaceOrder) {
      setError({status: false, msg: ''});
    } else if (errorPlaceOrder) {
      const {message, success} = errorPlaceOrder;
      setError({status: !success, msg: message});
    } else if (getPlaceOrder) {
      console.log('place order:-', getPlaceOrder);
      setOrderRes(getPlaceOrder.data);
      setError({status: false, msg: ''});
    }
  }, [getPlaceOrder, loadingPlaceOrder, errorPlaceOrder]);

  const ConfirmOrder = () => {
    if (token !== '' && orderData) {
      dispatch(PlaceOrder(token, orderData)).then(() => {
        // console.log('error>>>>>>', errorState);
        // console.log('success>>>>>>', orderData);
        navigation.navigate(Screens.TrackOrder);
      });
    }
    // console.log('token:', token);
  };

  const formatCardNumberForDisplay = cardNumber => {
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

  return (
    <ImageBackground
      source={Images.vegitabletop}
      style={styles.mainContainer}
      imageStyle={{width: '100%', height: 200, resizeMode: 'cover'}}
      // imageStyle={{ tintColor: '#9e9696' }}
    >
      <Frame
        style={styles.container}
        mode={'view'}
        headerVariant={'v2'}
        headerStyle={styles.header}>
        <Text style={styles.confirmtxt}>{'Confirm Order'}</Text>
        <OrderInfo
          title={'Deliver To'}
          btntxt={'Edit'}
          sourceimg={Images.IconLocation}
          detail={orderData?.orderInformation?.deliveryAddress?.address}
          cardNum
        />
        {selectedPayment !== '' ? (
          <OrderInfo
            title={'Payment Method'}
            btntxt={'Edit'}
            sourceimg={{uri: selectedPayment?.image_url}}
            cardNum={formatCardNumberForDisplay(selectedPayment?.cardNumber)}
            imgstyle={styles.img}
          />
        ) : (
          <OrderInfo
            title={'Payment Method'}
            btntxt={'Edit'}
            sourceimg={require('../../../assets/images/noteimg.png')}
            cardNum={'Pay in cash'}
            imgstyle={styles.img}
          />
        )}
        <View style={styles.ChargesCon}>
          <ImageBackground
            // resizeMode="contain"
            source={Images.vegitables}
            style={styles.imageBackGround}
            imageStyle={{tintColor: '#9e9696'}}>
            <View style={styles.overlay}>
              <CalculateView
                titlestyle={styles.titletxt}
                chargesstyle={styles.chargestxt}
                signstyle={styles.signtxt}
                ChargesTitle={'Subtotal'}
                Charges={cartItem?.totalAmount}
              />
              <CalculateView
                titlestyle={styles.titletxt}
                chargesstyle={styles.chargestxt}
                signstyle={styles.signtxt}
                ChargesTitle={'Delivery Charge'}
                Charges={'1.0'}
              />
              <CalculateView
                titlestyle={styles.titletxt}
                chargesstyle={styles.chargestxt}
                signstyle={styles.signtxt}
                ChargesTitle={'Discount'}
                Charges={'5.30'}
              />
              <View style={styles.total}>
                <CalculateView
                  titlestyle={[styles.titletxt, styles.totalstyle]}
                  chargesstyle={[styles.chargestxt, styles.totalstyle]}
                  signstyle={[styles.signtxt, styles.totalstyle]}
                  ChargesTitle={'Discount'}
                  Charges={'120 '}
                />
              </View>
              <Botton
                titleStyle={styles.bnttitle}
                title={'Place My Order'}
                singleButtonStyle={styles.check}
                onPress={() => ConfirmOrder()}
              />
            </View>
          </ImageBackground>
        </View>
      
      </Frame>
    </ImageBackground>
  );
};

export default ConfirmOrder;
