import React, {useEffect, useMemo} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Frame from '../../common/core/Frame';
import {Strings} from '../../../constants/Strings';
import ItemCardComp from '../../common/others/ItemCardComp/ItemCardComp';
import HomeData from '../../../assets/dummy/Home.json';
import styles from './styles';
import {GetPopularRestaurants} from '../../../redux/action/PopularRestaurant';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Screens} from '../../../constants/constants';
const PopularRestaurant = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const getRestaurants = useSelector(state => state?.restaurantsdata);
  const {token} = useSelector(state => state.userData.isAuthenticated);

  const data = getRestaurants?.data?.data;

  useEffect(() => {
    dispatch(GetPopularRestaurants(token));
  }, [dispatch, token, isFocused]);
  return (
    <Frame screenTitle={Strings.popularRestaurant}>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item?._id}
          renderItem={({item}) => {
            return (
              <View style={styles.listItemContainer}>
                <ItemCardComp
                  item={item}
                  itemCardStyle={styles.itemCardStyle}
                  onPress={() =>
                    navigation.navigate(Screens.RestaurantMenue, {
                      PopularRestaurantInfo: item,
                      PopularRestaurantID: item?._id,
                    })
                  }
                />
              </View>
            );
          }}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </Frame>
  );
};

export default PopularRestaurant;
