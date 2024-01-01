import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Frame from '../../common/core/Frame';
import React, {useState, useMemo, useEffect} from 'react';
import styles from './styles';
import RestaurantMenuMenuHeader from '../../common/others/MenuHeader/MenuHeader';
import Txt from '../../common/core/Txt';
import {scale} from '../../../../utils/scale';
import {useSelector, useDispatch} from 'react-redux';
import theme from '../../../themes/theme';
import Whitebag from '../../../assets/svg/Whitebag.svg';
import ImageItem from '../../common/core/ImageItem';
import StarYellowFill from '../../../assets/svg/StarYellowFill.svg';
import SmallBag from '../../../assets/svg/SmallBag.svg';
import QuantityControl from '../../common/others/QuantityControl/QuantityControl';
import ExtraItem from '../../common/others/ExtraItem/ExtraItem';
import Images from '../../../assets/images';
import AddBtn from '../../common/others/AddBtn/AddBtn';
import Swipeable from 'react-native-swipeable';
import {LARGE, Screens} from '../../../constants/constants';
import {Showaddmsg} from '../../../redux/action/ShowAddmsg';
import {CartCounter} from '../../../redux/action/CartCounter';
import {AddToCart} from '../../../redux/action/AddToCart';
import {useIsFocused} from '@react-navigation/native';

const DUMMY_URL =
  'https://lb-backend.s3.amazonaws.com/c5d723d0-03bc-11ee-93e5-b14550bf5f36-mcdonald.png';
const DUMMY_URL2 =
  'https://lb-backend.s3.amazonaws.com/c5d723d0-03bc-11ee-93e5-b14550bf5f36-mcdonald.png';
const DUMMY_URL3 =
  'https://lb-backend.s3.amazonaws.com/c5d723d0-03bc-11ee-93e5-b14550bf5f36-mcdonald.png';
const DUMMY_URL4 =
  'https://lb-backend.s3.amazonaws.com/c5d723d0-03bc-11ee-93e5-b14550bf5f36-mcdonald.png';
const DUMMY_URL1 =
  'https://lb-backend.s3.amazonaws.com/ff0b7d20-6c5f-11ee-b10b-5b2592292c5d-chicken-fajita.jpeg';

const AddQuantity = ({route, navigation}) => {
  const isFocused = useIsFocused();

  const data = route?.params?.Item || {};
  // let Id = route?.params?.Id
  console.log('09090909', data);
  const list = route?.params?.FoodItem || {};
  // console.log('listliselisr',list)
  const {restaurantInfo, Id, Item} = route?.params || {};
  // console.log('IDESS',restaurantInfo)
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Small');
  const [showView, setShowView] = useState(false);
  const [errorState, setError] = useState({status: false, msg: ''});
  const [selectedItems, setSelectedItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [Itemid, setItemid] = useState('');
  const [variationId, setVariationId] = useState('');
  const [deals, setDeals] = useState([]);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [removePreviousCart, setRemovePreviousCart] = useState(false);
  const [shouldDispatch, setShouldDispatch] = useState(false);
  const [isActionCompleted, setActionCompleted] = useState(false);
  const [visible, setVisible] = useState(false);

  const Actualprice =
    data?.Listitem?.variations[0]?.price || list?.itemVariations[0]?.price;
  const totalAmount = quantity * Actualprice;

  useEffect(() => {
    setShowView(false);
    setRestaurantId(Id || list?.restaurantId);
    setItemid(data?.Listitem?.itemId || list?.itemVariations[0]?.itemId);
    setVariationId(
      data?.Listitem?.variations[0]?._id || list?.itemVariations[0]?._id,
    );
  }, [isFocused]);

  const dispatch = useDispatch();
  const show = useSelector(state => state.showAddmsg.show);
  const counter = useSelector(state => state.cartCounter.counter);
  const {token} = useSelector(state => state.userData.isAuthenticated);
  // console.log('token', token);
  const addTocard = useSelector(state => state.addToCart);

  const increaseQuantity = () => {
    if (quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const leftContent = [<View></View>];

  //Add to Cart
  const {
    data: getaddTocard,
    loading: loadingaddTocard,
    error: erroraddTocard,
  } = useMemo(() => addTocard, [addTocard]);

  useEffect(() => {
    if (loadingaddTocard) {
      setError({status: false, msg: ''});
    } else if (erroraddTocard) {
      const {message, success} = erroraddTocard;
      setError({status: !success, msg: message});
    } else if (getaddTocard) {
      // console.log('Data:all items', getaddTocard);
      if (getaddTocard.success === true) {
        // dispatch(CartCounter(counter + 1));
        // console.log('--=>>', getaddTocard);
      }
      setError({status: false, msg: ''});
    }
  }, [loadingaddTocard, erroraddTocard, getaddTocard]);

  // useEffect(() => {
  //     if (selectedItems.length > 0 && shouldDispatch) {
  //         const cartData = {
  //             restaurantId: restaurantId,
  //             removePreviousCart: removePreviousCart,
  //             addToCartInformation: {
  //                 items: selectedItems,
  //                 deals: deals,
  //                 totalAmount: totalAmount,
  //                 note: 'note updated',
  //             }
  //         }
  //         // Dispatch the AddToCart action with the cartData
  //         dispatch(AddToCyarnart(token, cartData));
  //     }
  // }, [selectedItems, restaurantId, removePreviousCart, deals, totalAmount, token, shouldDispatch]);
  // console.log('=<>',selectedItems,deals,totalAmount);

  const handleButtonClick = rpc => {
    console.log('AddtoQuantityResponse', rpc);
    setAlertVisible(false);
    const selectedItem = {
      itemId: Itemid,
      itemVariationId: variationId,
      quantity: quantity,
    };
    // console.log('DAta', selectedItem);
    // setSelectedItems([...selectedItems, selectedItem]);

    let selectedItemArray = [];
    selectedItemArray.push(selectedItem);

    // dispatch(CartCounter(counter + 1));
    const cartData = {
      restaurantId: Id,
      removePreviousCart: rpc,
      addToCartInformation: {
        items: selectedItemArray,
        deals: deals,
        totalAmount: totalAmount,
        note: 'note updated',
      },
    };
    dispatch(AddToCart(token, cartData)).then(() => {
      setActionCompleted(true);
    });

    setShouldDispatch(true);
  };

  useEffect(() => {
    if (isActionCompleted) {
      setActionCompleted(false);
      if (!errorState.status) {
        setShowView(true);
        setTimeout(() => {
          setShowView(false);
          // navigation.navigate(Screens.Home);
          navigation.goBack();
        }, 2000);
      } else {
        if (
          errorState.msg ===
          'You still have products from another restaurant. Shall we start over with a fresh cart?'
        ) {
          setAlertVisible(true);
        }
      }
    }
  }, [isActionCompleted]);

  const renderItem = (item, index) => {
    const isSelected = selectedCategory?.name === item.name;
    return (
      <View style={styles.itemView}>
        <TouchableOpacity
          style={[
            styles.touchable,
            {
              backgroundColor: isSelected
                ? theme.palette.PrimaryDeep
                : 'transparent',
            },
          ]}
          onPress={() => {
            setSelectedCategory(item);
          }}>
          <Text
            style={[
              styles.suggest,
              {
                color: isSelected
                  ? theme.palette.white
                  : theme.palette.GrayPlaceHolder,
              },
            ]}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const choiceRenderItem = ({item}) => {
    return (
      <ExtraItem
        title={item?.name}
        sourceimg={Images.Cocacola}
        price={`PKR ${item?.price}`}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <Frame headerVariant="blank">
        <View style={styles.header}>
          <RestaurantMenuMenuHeader
            // liked={}
            headerImageUri={data?.Listitem?.itemImageUrl || list?.imageUrl}
            imagesItemUri={[
              DUMMY_URL,
              data?.Listitem?.itemImageUrl || list?.imageUrl,
              DUMMY_URL2,
              DUMMY_URL3,
              DUMMY_URL4,
            ]}
            title={data?.Listitem?.itemName || list?.title}
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.rattingview}>
            <StarYellowFill />
            <Txt style={styles.ratting}>
              {restaurantInfo?.[0]?.restaurantInformation?.rating}{' '}
              <Text style={styles.totalratting}>{'(30+)'}</Text>
            </Txt>
            <Text style={styles.reviewbtn}>{'See Review'}</Text>
          </View>
          <View style={styles.DeliveryCharges}>
            <Text style={styles.DeliveryTxt}>{'DeliveryCharges:'}</Text>
            <Text style={styles.chargesTxt}>{'   (PKR 250)'}</Text>
          </View>
          <View style={{marginTop: scale(16)}}>
            <QuantityControl
              negtiveBtn={'-'}
              addBtn={'+'}
              negtivePress={() => decreaseQuantity()}
              addPress={() => increaseQuantity()}
              quantity={quantity}
              data={
                (selectedCategory?.price
                  ? selectedCategory?.price
                  : data?.Listitem?.variations?.[0]?.price ||
                    list?.itemVariations?.[0]?.price) * quantity
              }
            />
          </View>
          <Text style={styles.Details}>
            {data?.Listitem?.itemSummary || list?.summary}
          </Text>
          <Text style={styles.choose}>{'Choose'}</Text>
          <FlatList
            data={data?.Listitem?.variations || list?.itemVariations}
            horizontal
            renderItem={({item, index}) => renderItem(item, index)}
          />
          {(data?.Listitem?.choiceGroups[0]?.choices ||
            list?.choiceGroupInformation?.[0]?.choices) && (
            <>
              <Text style={styles.choose}>
                {data?.Listitem?.choiceGroups[0]?.name ||
                  list?.choiceGroupInformation?.[0]?.name}
              </Text>
              <FlatList
                data={
                  data?.Listitem?.choiceGroups?.[0]?.choices ||
                  list?.choiceGroupInformation?.[0]?.choices
                }
                renderItem={choiceRenderItem}
                keyExtractor={(item, index) => `${item}, ${index}`}
              />
            </>
          )}
        </View>
      </Frame>
      <TouchableOpacity
        disabled={visible}
        style={[
          styles.cartButtonContainer,
          {
            backgroundColor: visible
              ? theme.palette.white
              : theme.palette.PrimaryDeep,
          },
        ]}
        // disabled={showView ? true : false}
        onPress={() => {
          setVisible(true);
          handleButtonClick(false);
        }}>
        <View
          style={[
            styles.buttonImage,
            {
              backgroundColor: visible
                ? theme.palette.white
                : theme.palette.white,
            },
          ]}>
          {!visible ? (
            <SmallBag />
          ) : (
            <ActivityIndicator size={LARGE} color={theme.palette.PrimaryDeep} />
          )}
        </View>

        <View style={styles.cartTextContainer}>
          <Text style={styles.addcartTxt}>{'Add to cart'}</Text>
        </View>
      </TouchableOpacity>
      {showView && (
        <View style={styles.showaddmsg}>
          <Whitebag />
          <Text style={styles.itemadd}>{'Item added to cart'}</Text>
        </View>
      )}
      <Modal visible={isAlertVisible} animationType="slide" transparent>
        <View style={styles.modelView}>
          <View style={styles.modalContent}>
            <View style={styles.row}>
              <Text style={styles.modalHeading}>Alert</Text>
              <Text
                style={styles.modalClose}
                onPress={() => setAlertVisible(false)}></Text>
            </View>
            <Text style={styles.modalMsg}>{errorState.msg}</Text>
            <View
              style={[
                styles.row,
                {justifyContent: 'flex-end', marginTop: scale(15)},
              ]}>
              <TouchableOpacity
                style={{}}
                onPress={() => setAlertVisible(false)}>
                <Text style={styles.modalCancel}>{'Cancel'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{}}
                onPress={() => handleButtonClick(true)}>
                <Text style={styles.modalClose}>{'Ok'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default AddQuantity;
