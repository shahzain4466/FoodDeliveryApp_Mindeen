import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale} from '../../../../../utils/scale';
import theme from '../../../../themes/theme';
import CloseRed from '../../../../assets/svg/CloseRed.svg';
import QuantityControl from '../QuantityControl/QuantityControl';
import {callApi} from '../../../../../config/apiCall';
import {useDispatch, useSelector} from 'react-redux';
import {CartItems} from '../../../../redux/action/CartItems';
import {CartCounter} from '../../../../redux/action/CartCounter';

const CartItem = props => {
  const {Items, Id, updateMainList = () => {}} = props;

  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // 1
  const [localQuantities, setLocalQuantities] = useState({});
  useEffect(() => {
    const initialQuantities = {};
    Items.forEach(item => {
      initialQuantities[item._id] = item.quantity;
    });
    setLocalQuantities(initialQuantities);
  }, [Items]);

  const dispatch = useDispatch();
  const counter = useSelector(state => state.cartCounter.counter);
  // console.log('counterCounter',counter)

  const {token} = useSelector(state => state?.userData?.isAuthenticated);
  // console.log('token',token)
  const deleteCartItem = async id => {
    // setDeleting(true);
    console.log('RES Del', id);
    try {
      const response = await callApi(
        `/api/v1/addtocart/delete/${id}`,
        'DELETE',
        null,
        token,
      );
      console.log('RES Del', response);
      if (response?.success) {
        dispatch(CartCounter(counter - 1));
        dispatch(CartItems(token));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      // setTimeout(() => {
      //   setDeleting(false);
      // }, 2000);
    }
  };

  // Api for updating cart quantity

  const editCartItem = async (item, newQuantity) => {
    console.log('VAlye', item, newQuantity, Id);
    setAdding(true);
    try {
      const response = await callApi(
        `/api/v1/addtocart/edit/${Id}`,
        'PUT',
        {
          editAddToCartInformation: {
            itemId: item,
            quantity: newQuantity,
          },
        },
        token,
      );
      console.log('ResUpdate', response);
      if (response?.success) {
        dispatch(CartItems(token));
      }
    } catch (error) {
      setAdding(false);
      console.error('Error updating item:', error);
    } finally {
      setTimeout(() => {
        setAdding(false);
      }, 2000);
    }
  };

  // const increaseQuantity = item => {
  //   const newQuantity = item.quantity + 1;
  //   editCartItem(item, newQuantity);
  // };

  // const decreaseQuantity = item => {
  //   if (item.quantity > 1) {
  //     const newQuantity = item.quantity - 1;
  //     editCartItem(item, newQuantity);
  //   } else {
  //     alert('You have to select at least one item');
  //   }
  // };
  // 22222
  const increaseQuantity = async item => {
    const newQuantity = (localQuantities[item._id] || 0) + 1;
    setLocalQuantities(prevQuantities => ({
      ...prevQuantities,
      [item._id]: newQuantity,
    }));
    console.log('New ad', newQuantity);
    await editCartItem(item._id, newQuantity); // Make API call to update the server
  };

  const decreaseQuantity = async item => {
    if (localQuantities[item._id] > 1) {
      const newQuantity = (localQuantities[item._id] || 0) - 1;
      setLocalQuantities(prevQuantities => ({
        ...prevQuantities,
        [item._id]: newQuantity,
      }));
      console.log('New a', newQuantity);
      await editCartItem(item._id, newQuantity); // Make API call to update the server
    } else {
      alert('You have to select at least one item');
    }
  };

  // const calculateTotal = (items) => {
  //   return items.reduce(
  //     (total, item) => total + item.itemVariationDetails.price * item.quantity,
  //     0
  //   );
  // };

  // const [quantity, setQuantity] = useState(quantity);
  // const [price, setPrice] = useState(price);

  // const increaseQuantity = item => {
  //   console.log('Increment Item', item);
  //   // const newQuantity = quantity + 1;
  //   // setCalculatedPrice(price * newQuantity);
  //   // setQuantity(newQuantity);
  // };

  // const decreaseQuantity = item => {
  //   if (quantity > 1) {
  //     const newQuantity = quantity - 1;
  //     // setCalculatedPrice(price * newQuantity);
  //     setQuantity(newQuantity);
  //   }
  // };

  const removeItem = itemId => {
    let itemsTemp = [...Items];
    itemsTemp = itemsTemp.filter(item => item?._id !== itemId);
    updateMainList(itemsTemp);
    deleteCartItem(itemId);
  };

  const renderItem = ({item}) => {
    const {itemDetails} = item;
    return (
      <View style={{width: '100%', flexDirection: 'row'}}>
        <Image
          source={{uri: itemDetails?.imageUrl}}
          style={styles.img}
          resizeMode="cover"
        />
        <View style={{width: '80%'}}>
          <View style={styles.titleView}>
            <Text style={styles.titletxt}>{itemDetails?.title}</Text>
            <TouchableOpacity
              onPress={() => {
                console.log('Items?._id', item);
                removeItem(item?._id);
              }}
              style={{alignItems: 'center'}}>
              <CloseRed />
            </TouchableOpacity>
          </View>
          <View style={styles.dsecView}>
            <View style={{width: '60%'}}>
              <Text style={styles.desctxt}>{itemDetails?.summary}</Text>
              <Text style={styles.pricetxt}>
                ${item?.itemVariationDetails?.price * localQuantities[item._id]}
              </Text>
            </View>
            <View style={{width: '30%'}}>
              <QuantityControl
                add={adding}
                negtiveBtn={'-'}
                quantitybtnstyle={styles.quantitybtn}
                btnStyle={styles.btn}
                btntxt={styles.txt}
                addBtn={'+'}
                addPress={() => increaseQuantity(item)}
                negtivePress={() => decreaseQuantity(item)}
                quantity={localQuantities[item._id] || 0}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  if (Items?.length > 0 && Items?.[0]?.itemDetails)
    return (
      <View style={styles.main}>
        <FlatList
          data={Items}
          keyExtractor={item => item?.itemId}
          renderItem={renderItem}
        />
      </View>
    );
  else return null;
};

export default CartItem;
const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scale(10),
  },
  img: {
    width: '20%',
    backgroundColor: 'red',
    height: scale(87),
    borderRadius: scale(10),
    backgroundColor: theme.palette.white,
    shadowColor: theme.palette.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  titletxt: {
    color: theme.palette.DarkBlack,
    ...theme.typography.common.h4r,
    fontWeight: '800',
    width: '80%',
    marginHorizontal: scale(5),
  },
  desctxt: {
    ...theme.typography.common.bodyr,
    color: theme.palette.GrayDark,
    width: '100%',
    marginHorizontal: scale(5),
  },
  pricetxt: {
    ...theme.typography.common.h2r,
    color: theme.palette.PrimaryDeep,
    fontWeight: '600',
    marginTop: scale(5),
    width: '80%',
    marginHorizontal: scale(5),
  },
  btn: {
    width: scale(25),
    height: scale(25),
    borderRadius: scale(12.5),
    // alignItems:'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: scale(14),
  },
  quantitybtn: {
    width: '100%',
    marginTop: scale(15),
  },
  dsecView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 999,
  },
});
