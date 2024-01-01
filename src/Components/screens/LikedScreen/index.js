import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Frame from '../../common/core/Frame';
import {callApi} from '../../../../config/apiCall';
import {useIsFocused} from '@react-navigation/native';
import ItemCardComp from '../../common/others/ItemCardComp/ItemCardComp';
import theme from '../../../themes/theme';
import {scale} from '../../../../utils/scale';
import {GetPopularRestaurants} from '../../../redux/action/PopularRestaurant';
import {useDispatch} from 'react-redux';
import Images from '../../../assets/images';
import {symbol} from 'prop-types';
import {POPPINS_REGULAR} from '../../../constants/constants';
export default function LikedScreen({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.userData.isAuthenticated);
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [likedStatus, setLikedStatus] = useState({});
  const [run, setRun] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getLikedItems();
    dispatch(GetPopularRestaurants(token));
  }, [run, isFocused]);

  const getLikedItems = async () => {
    try {
      const response = await callApi(
        '/api/v1/users/likedRestaurant',
        'GET',
        null,
        token,
      );
      setLikedRestaurants(response?.data?.restaurantDetails);
    } catch (error) {
      console.error('Error fetching liked restaurants:', error);
    }
  };

  return (
    <Frame 
    headerVariant={'v1'}
    screenTitle={'Favourite Restaurants'}>
      <View>
        {likedRestaurants?.length != 0 ? (
          <FlatList
            data={likedRestaurants}
            extraData={likedRestaurants}
            keyExtractor={item => item?._id}
            renderItem={({item}) => (
              <View style={styles.listItemContainer}>
                <ItemCardComp
                  item={item}
                  itemCardStyle={styles.itemCardStyle}
                  fav={true}
                  success={val => setRun(!run)}
                />
              </View>
            )}
            contentContainerStyle={styles.flatListContainer}
          />
        ) : (
          <View style={styles.emptyView}>
            <Image source={Images.pana} style={styles.imagStyle} />
            <Text style={styles.TxtStyle}>{'No favourite restaurant'}</Text>
          </View>
        )}
      </View>
    </Frame>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
  },
  restaurantItem: {
    padding: scale(16),
    borderBottomWidth: scale(1),
    borderBottomColor: '#e0e0e0',
  },
  listItemContainer: {
    marginBottom: theme.spacing.margin.m1 / 0.7,
  },
  itemCardStyle: {
    width: scale(337, true),
  },
  flatListContainer: {
    alignSelf: 'center',
    marginTop: theme.spacing.margin.max,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TxtStyle: {
    fontSize: scale(16),
    color: theme.palette.GrayDark,
    lineHeight: scale(24),
    fontFamily: POPPINS_REGULAR,
    marginTop: scale(30),
  },
  imagStyle: {height: scale(187), width: scale(181), marginTop: scale(180)},
});
