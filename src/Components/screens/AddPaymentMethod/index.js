import {View, Text, Image, Alert, FlatList} from 'react-native';
import React, {useMemo, useState, useEffect} from 'react';
import Frame from '../../common/core/Frame';
import styles from './styles';
import Button from '../../common/core/Button';
import {Screens} from '../../../constants/constants';
import {Strings} from '../../../constants/Strings';
import TitleInput from '../../common/core/TitleInput';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';
import Cardinfo from '../../common/others/Cardinfo/Cardinfo';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {GetPaymentMethods} from '../../../redux/action/GetPaymentMethods';
import Images from '../../../assets/images';

const AddPaymentMethod = ({navigation, route}) => {
  const [select, setSelect] = useState(false);
  const {body, cartItem} = route?.params;

  console.log('bodyData ---', JSON.stringify(body));
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {token} = useSelector(state => state.userData.isAuthenticated);
  const PaymentMethods = useSelector(state => state.getmethods);

  //* Memoize Him
  const [methodsData, setMethodsData] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState({});
  const [payInCash, setPayInCash] = useState(false);

  const [errorState, setError] = useState({status: false, msg: ''});
  const {
    data: getPaymentMethod,
    loading: loadingPaymentMethod,
    error: errorgetpaymentmethod,
  } = useMemo(() => PaymentMethods, [PaymentMethods]);

  useEffect(() => {
    if (loadingPaymentMethod) {
      setError({status: false, msg: ''});
    } else if (errorgetpaymentmethod) {
      const {message, success} = errorgetpaymentmethod;
      setError({status: !success, msg: message});
    } else if (getPaymentMethod) {
      console.log('Payment mathods:-', getPaymentMethod);
      setMethodsData(getPaymentMethod.data);
      setError({status: false, msg: ''});
    }
  }, [getPaymentMethod, loadingPaymentMethod, errorgetpaymentmethod]);

  useEffect(() => {
    dispatch(GetPaymentMethods(token));
  }, [dispatch, token, isFocused]);

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

  console.log('selectedPayment: ', selectedPayment);
  const renderItem = ({item, index}) => {
    const formattedCardNumber = formatCardNumberForDisplay(item.cardNumber);
    return (
      <View>
        <Cardinfo
          Cardimg={{uri: item?.image_url}}
          numtxt={formattedCardNumber}
          // righticon={Images.Delete}
          cardStyle={[
            styles.cardStyle,
            {
              borderColor:
                item?._id === selectedPayment?._id && !payInCash
                  ? theme.palette.PrimaryDark
                  : theme.palette.cardinfoColor,
            },
          ]}
          // pressRightIcon={() => DeleteMethod(item._id, token)}
          onpress={() => {
            setPayInCash(false);
            setSelectedPayment(item);
          }}
        />
      </View>
    );
  };

  console.log('payInCash: ', payInCash);
  console.log('payment method', setSelectedPayment);
  return (
    <Frame
      style={styles.container}
      mode={'view'}
      // customNavigation={{ screen: Screens.Payment }}
    >
      <Cardinfo
        Cardimg={require('../../../assets/images/noteimg.png')}
        imgstyle={styles.img}
        emptyview
        numtxt={'Pay in cash'}
        cardStyle={[
          styles.cardStyle,
          {
            borderColor: payInCash
              ? theme.palette.PrimaryDark
              : theme.palette.cardinfoColor,
          },
        ]}
        onpress={() => {
          setPayInCash(true);
        }}
      />

      <Text style={styles.heading}>{Strings.lbltxt}</Text>

      {methodsData?.length > 0 ? (
        <View style={styles.methodcon}>
          <FlatList
            data={methodsData}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View>
          <Image source={Images.Card} style={styles.Cardimg} />
          <View style={styles.Carddesc}>
            <Text style={styles.heading1}>{Strings.noMethod}</Text>
            <Text style={styles.subtxt}>{Strings.noMethodesc}</Text>
          </View>
        </View>
      )}

      <View style={styles.btnContainer}>
        <Button
          singleButtonStyle={styles.Addbtn}
          title={Strings.locMainBtnTitle}
          titleStyle={styles.titletxt}
          onPress={() => {
            navigation.navigate(Screens.AddNewCard);
          }}
        />
        <Button
          singleButtonStyle={styles.Conbtn}
          title={Strings.Continue}
          onPress={() => {
            if (Object.keys(selectedPayment).length === 0 && !payInCash) {
              Alert.alert('Please select a payment method.');
            } else {
              navigation.navigate(Screens.ConfirmOrder, {
                orderData: body,
                cartItem: cartItem,
                selectedPayment: payInCash ? '' : selectedPayment,
              });
            }
          }}
        />
      </View>
    </Frame>
  );
};

export default AddPaymentMethod;
