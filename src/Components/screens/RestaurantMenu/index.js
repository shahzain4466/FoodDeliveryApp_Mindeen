import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Frame from '../../common/core/Frame';
import React, {useState, useEffect, useMemo} from 'react';
import styles from './styles';
import RestaurantMenuMenuHeader from '../../common/others/MenuHeader/MenuHeader';
import Whitebag from '../../../assets/svg/Whitebag.svg';
import Txt from '../../common/core/Txt';
import {scale} from '../../../../utils/scale';
import theme from '../../../themes/theme';
import ImageItem from '../../common/core/ImageItem';
import {Screens} from '../../../constants/constants';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {RestaurantMenubyId} from '../../../redux/action/RestaurantMenubyId';
import {MenuCategories} from '../../../redux/action/MenuCategories';

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

const RestaurantMenu = ({route, navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const Item = route?.params?.data;
  const id = Item?.restaurantDetails[0]?._id;
  // console.log('Resturent Detail',Item)
  const {PopularRestaurantInfo, PopularRestaurantID} = route?.params;
  console.log('PopularRestaurantInfo', PopularRestaurantInfo);

  // console.log('PopularRestaurantID',PopularRestaurantID)
  const show = useSelector(state => state.showAddmsg.show);
  const {token} = useSelector(state => state.userData.isAuthenticated);
  const menuCategories = useSelector(state => state.getMenuCategories);
  const restaurantMenu = useSelector(state => state.getRestaurantMenu);

  // console.log('PopularRestaurantInfo: ', );

  const initialSelectedItemId =
    menuCategories?.data?.data[0]?.categories[0]?.categoryId;
  const initialSelectedCategory =
    menuCategories?.data?.data[0]?.categories[0]?.categoryName;
  useEffect(() => {
    setSelectedItemId(initialSelectedItemId);
    setSelectedCatgory(initialSelectedCategory);
  }, [initialSelectedItemId, initialSelectedCategory]);

  const [selectedItemId, setSelectedItemId] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [restaurantItem, setrestaurantItem] = useState([]);
  const [selectedcatgory, setSelectedCatgory] = useState('');
  const [errorState, setError] = useState({status: false, msg: ''});

  const [menuCategoriesLoading, setMenuCategoriesLoading] = useState(true);
  const [restaurantMenuLoading, setRestaurantMenuLoading] = useState(true);

  useEffect(() => {
    // console.log('-----1-----');
    dispatch(RestaurantMenubyId(PopularRestaurantID || id, token));
    // console.log('-----2-----');
  }, [isFocused, token]);

  useEffect(() => {
    // console.log('-----3-----');
    dispatch(MenuCategories(PopularRestaurantID || id, token));
    // console.log('-----4-----');
  }, [isFocused, token]);

  // menu categories
  const {
    data: getmenuCategories,
    loading: loadingmenuCategories,
    error: errormenuCategories,
  } = useMemo(() => menuCategories, [menuCategories]);

  useEffect(() => {
    if (loadingmenuCategories) {
      setError({status: false, msg: ''});
    } else if (errormenuCategories) {
      const {message, success} = errormenuCategories;
      setError({status: !success, msg: message});
    } else if (getmenuCategories) {
      setCategories(getmenuCategories?.data);
      setError({status: false, msg: ''});
    }
  }, [getmenuCategories, loadingmenuCategories, errormenuCategories]);

  //restaurant menu
  const {
    data: getrestaurantMenu,
    loading: loadingrestaurantMenu,
    error: errorrestaurantMenu,
  } = useMemo(() => restaurantMenu, [restaurantMenu]);

  useEffect(() => {
    if (loadingrestaurantMenu) {
      setError({status: false, msg: ''});
    } else if (errorrestaurantMenu) {
      const {message, success} = errorrestaurantMenu;
      setError({status: !success, msg: message});
    } else if (getrestaurantMenu) {
      setMenuItems(getrestaurantMenu?.data);
      setError({status: false, msg: ''});
    }
  }, [getrestaurantMenu, loadingrestaurantMenu, errorrestaurantMenu]);

  useEffect(() => {
    console.log('Selected Id', selectedItemId);
    const items = getrestaurantMenu?.data?.reduce((acc, restaurant) => {
      const category = restaurant?.categories?.find(
        cat => cat?.categoryId === selectedItemId,
      );
      if (category) {
        acc.push(...category?.items);
      }
      return acc;
    }, []);
    // console.log('items ===>', menuItems);
    setrestaurantItem(items);
  }, [selectedItemId, isFocused]);

  // menuItemCard
  const MenuItemCard = ({Listitem, discount}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.menuItemCard}
        onPress={() =>
          navigation.navigate(Screens.AddQuantity, {
            Item: {Listitem},
            Id: PopularRestaurantID,
            restaurantInfo: menuItems,
          })
        }>
        <ImageItem
          priority="high"
          imageUrl={Listitem?.itemImageUrl}
          imageStyling={styles.menuImage}
          imageBackground={true}>
          {discount && (
            <View style={styles.discount}>
              <Txt style={styles.discountTxt}>{discount}% OFF</Txt>
            </View>
          )}
        </ImageItem>
        <View style={styles.vegTxtCont}>
          <Txt style={styles.vegetableName}>{Listitem?.itemName}</Txt>
          <Txt style={styles.inPizzaManiaTxt}>
            {Listitem?.variations[0]?.name}
          </Txt>
          <Txt style={styles.vegetableName}>
            Price. {Listitem?.variations[0]?.price}.00
          </Txt>
        </View>
        {/* <TouchableOpacity style={styles.addbtn}
                    onPress={() => navigation.navigate(Screens.AddQuantity, { Item: { Listitem }, Id: PopularRestaurantID, restaurantInfo: menuItems })}>
                    <Txt style={styles.addTxt}>+</Txt>
                </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };
  const renderItem = ({item, index}) => {
    const itemIsSelected = selectedItemId === item.categoryId;
    return (
      <Pressable
        onPress={() => {
          // toggleSelection(item?.categoryId)
          setSelectedCatgory(item?.categoryName);
          setSelectedItemId(item?.categoryId);
        }}
        key={index}
        style={[
          styles.filterBtn,
          {
            backgroundColor: itemIsSelected
              ? theme.palette.PrimaryDeep
              : theme.palette.GrayLight,
          },
        ]}>
        <Text
          style={{
            color: itemIsSelected
              ? theme.palette.white
              : theme.palette.GrayDeep,
          }}>
          {item?.categoryName}
        </Text>
      </Pressable>
    );
  };

  const toggleSelection = itemId => {
    setSelectedItemId(prevItemId => (prevItemId === itemId ? null : itemId));
  };

  return (
    <View style={{flex: 1}}>
      <Frame headerVariant="blank">
        <View style={styles.header}>
          <RestaurantMenuMenuHeader
            headerImageUri={
              Item?.restaurantDetails[0]?.restaurantLogo ||
              PopularRestaurantInfo?.restaurantLogo
            }
            liked={PopularRestaurantInfo?.isLiked}
            imagesItemUri={[
              DUMMY_URL,
              DUMMY_URL1,
              DUMMY_URL2,
              DUMMY_URL3,
              DUMMY_URL4,
            ]}
            PopularRestaurantID={PopularRestaurantID}
            title={
              Item?.restaurantDetails[0]?.restaurantName ||
              PopularRestaurantInfo?.restaurantName
            }
          />
        </View>

        <View style={{marginVertical: scale(10)}}>
          <Txt style={styles.nameTitle}>
            {Item?.restaurantDetails[0]?.restaurantName ||
              PopularRestaurantInfo?.restaurantName}{' '}
            <Text style={styles.menuTxt}>Menu</Text>
          </Txt>
        </View>
        <View style={styles.menuCategoriesContainer}>
          {/* {loadingrestaurantMenu ? (
          <ActivityIndicator
            size="large"
            color={theme.palette.PrimaryDeep}
            style={styles.activityIndicator}
          />
        ) : errorState.status ? (
          <Text style={styles.errorText}>{errorState.msg}</Text>
        ) : ( */}
          <FlatList
            data={Categories[0]?.categories}
            keyExtractor={(item, index) => item?.categoryId}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />
          {/* )} */}
        </View>
        <View style={styles.bestSellerCont}>
          {loadingrestaurantMenu ? (
            <ActivityIndicator
              size="large"
              color={theme.palette.PrimaryDeep}
              style={styles.activityIndicator}
            />
          ) : errorState.status ? (
            <Text style={styles.errorText}>{errorState.msg}</Text>
          ) : (
            <FlatList
              data={restaurantItem}
              keyExtractor={item => item?.categoryId}
              renderItem={({item}) => {
                return <MenuItemCard Listitem={item} discount={'20'} />;
              }}
            />
          )}
        </View>
        {/* <View style={{paddingHorizontal: scale(5)}}>

          <FlatList
            data={Categories[0]?.categories}
            keyExtractor={(item, index) => item?.categoryId}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View>
        <View style={styles.bestSellerCont}>
          <Txt style={styles.bestSellers}>{selectedcatgory}</Txt>
          <FlatList
            data={restaurantItem}
            keyExtractor={item => item?.categoryId}
            renderItem={({item}) => {
              return <MenuItemCard Listitem={item} discount={'20'} />;
            }}
          />
        </View> */}
        {show ? (
          <View style={styles.showaddmsg}>
            <Whitebag />

            <Text style={styles.itemadd}>{'Item added to cart'}</Text>
          </View>
        ) : null}
      </Frame>
    </View>
  );
};

export default RestaurantMenu;
