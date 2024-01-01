import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Frame from '../../common/core/Frame';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import CartItem from '../../common/others/CartItem/CartItem';
import Images from '../../../assets/images';
import theme from '../../../themes/theme';
import Input from '../../common/core/Input';
import {scale} from '../../../../utils/scale';
import Botton from '../../common/core/Button';
import CalculateView from '../../common/others/CalculateView/CalculateView';
import {Screens} from '../../../constants/constants';
import {CartItems} from '../../../redux/action/CartItems';
import Geolocation from 'react-native-geolocation-service';
import {CartCounter} from '../../../redux/action/CartCounter';
import {
  getPlaceName,
  requestLocationPermission,
} from '../../../../utils/globalMethods';
import EmptyCart from '../../common/others/EmptyCart';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const mapViewRef = useRef(null);

  const {token} = useSelector(state => state.userData.isAuthenticated);
  const allCartItems = useSelector(state => state.getCartItems);
  const counter = useSelector(state => state.cartCounter.counter);

  const [deliveryLocationName, setdeliveryLocationName] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [rsId, setrsId] = useState('');
  const [cartItemsLength, setCartItemsLength] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState('');
  const [amount, setamount] = useState(0);
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [errorState, setError] = useState({status: false, msg: ''});
  const [isActionCompleted, setActionCompleted] = useState(false);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getLocation();
  }, [getLocation, isFocused]);

  useEffect(() => {
    dispatch(CartItems(token)).then(() => {
      setActionCompleted(true);
    });
  }, [dispatch, token, isFocused]);

  //   const updateCalculatedPrice = (newQuantity, price) => {
  //     const newPrice = price * newQuantity;
  //     setCalculatedPrice(newPrice);
  // }

  //* Get Current Location (Long, Lat)
  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        animateToLocation(latitude, longitude);
        reverseGeocode(latitude, longitude);
        setMarkerLocation({latitude, longitude});
      },
      error => {
        console.warn('Error getting current location:', error);
        requestLocationPermission();
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [
    animateToLocation,
    reverseGeocode,
    setMarkerLocation,
    setCurrentLocation,
  ]);
  const animateToLocation = (latitude, longitude) => {
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };
  //* Get Location Name From (Lat, Long)
  const reverseGeocode = async (latitude, longitude) => {
    const placeName = await getPlaceName(latitude, longitude);
    if (placeName) {
      setCurrentLocationName(placeName.placeName);
      setdeliveryLocationName(
        placeName.extractedData.city + ' ' + placeName.extractedData.country,
      );
    }
  };

  const {
    data: getallCartItems,
    loading: loadingallCartItems,
    error: errorallCartItems,
  } = useMemo(() => allCartItems, [allCartItems]);

  useEffect(() => {
    if (loadingallCartItems) {
      setError({status: false, msg: ''});
    } else if (errorallCartItems) {
      const {message, success} = errorallCartItems;
      setError({status: !success, msg: message});
    } else if (getallCartItems) {
      const cartItemsArray = getallCartItems?.data?.[0]?.items;

      // Check if cartItemsArray is not an empty array and contains meaningful data
      if (
        Array.isArray(cartItemsArray) &&
        cartItemsArray.some(item => Object.keys(item).length > 0)
      ) {
        const cartItemsLengthTemp = cartItemsArray.length;
        const amount = getallCartItems?.data?.[0]?.totalAmount;
        const cartItemsTemp =
          cartItemsLengthTemp > 0 ? getallCartItems?.data : [];

        setCartItemsLength(cartItemsLengthTemp);
        setamount(amount);
        setrsId(getallCartItems?.data[0]?._id);
        setCartItems(cartItemsTemp);
        setCalculatedPrice(
          cartItemsLengthTemp > 0 ? cartItemsTemp[0]?.totalAmount : 0,
        );

        dispatch(CartCounter(cartItemsLengthTemp));
      } else {
        setCartItemsLength(0);
        setamount(0);
        setrsId('');
        setCartItems([]);
        setCalculatedPrice(0);
        dispatch(CartCounter(0));
      }

      setError({status: false, msg: ''});
      // console.log("123456789987654321", cartItemsArray);
    }
  }, [getallCartItems, loadingallCartItems, errorallCartItems]);

  useEffect(() => {
    if (isActionCompleted) {
      setActionCompleted(false);
      if (!errorState.status) {
      }
    }
  }, [isActionCompleted]);

  const updateMainList = (updatedList, mainIndex) => {
    let cartItemsTemp = [...cartItems];
    cartItemsTemp[mainIndex] = {
      ...cartItemsTemp[mainIndex],
      items: updatedList,
    };
    setCartItems(cartItemsTemp);
  };

  return (
    <Frame
      mode={'view'}
      style={styles.container}
      headerVariant={'v5'}
      Deliver
      screenTitle={deliveryLocationName}>
      {amount > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={cartItems}
            extraData={cartItems}
            keyExtractor={item => `${item?._id}`}
            renderItem={({item, index}) => (
              <CartItem
                Items={item?.items}
                Id={rsId}
                updateMainList={updatedList =>
                  updateMainList(updatedList, index)
                }
              />
            )}
          />

          <Text style={styles.addmoretxt}>
            {'Missed something ? Add more items'}
          </Text>
          <View style={styles.notesContainer}>
            <Text style={styles.notes}>{'Notes'}</Text>
            <Input
              placeholder="Optional"
              InputStyling={styles.input}
              // value={""}
              // onChangeTest={() => { }}
            />
          </View>
          <View style={styles.promoview}>
            <Input
              placeholder={'Promo Code'}
              InputStyling={{width: '50%', borderWidth: scale(0)}}
            />
            <Botton
              titleStyle={styles.titletxt}
              title={'Apply'}
              singleButtonStyle={styles.btn}
              onPress={() => {}}
            />
          </View>
          <CalculateView
            ChargesTitle={'Subtotal'}
            Charges={calculatedPrice}
            bottomline={true}
          />
          <CalculateView
            ChargesTitle={'Tax and Fees'}
            Charges={'$5.30'}
            bottomline={true}
          />
          <CalculateView
            ChargesTitle={'Delivery'}
            Charges={'$1.00'}
            bottomline={true}
          />
          <CalculateView
            ChargesTitle={'Total'}
            Charges={calculatedPrice + 1 + 5.3}
          />
          <Botton
            titleStyle={styles.titletxt}
            title={'CHECKOUT'}
            singleButtonStyle={styles.check}
            onPress={() =>
              navigation.navigate(Screens.MYAddresses, {cartItem: allCartItems})
            }
          />
        </ScrollView>
      ) : (
        <View
          showsVerticalScrollIndicator={false}
          style={{flex: 1, alignSelf: 'center'}}>
          <Text>
            {loadingallCartItems ? (
              <ActivityIndicator color={theme.palette.PrimaryDeep} />
            ) : errorallCartItems ? (
              'Error loading items.'
            ) : (
              <EmptyCart navigation={navigation} />
            )}
          </Text>
        </View>
      )}
    </Frame>
  );
};

export default CartScreen;
