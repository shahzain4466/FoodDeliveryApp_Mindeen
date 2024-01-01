import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {v4 as uuidv4} from 'uuid';
import Txt from '../../core/Txt';
import Button from '../../core/Button';
import ItemCardComp from '../ItemCardComp/ItemCardComp';
import theme from '../../../../themes/theme';
import {Strings} from '../../../../constants/Strings';
import {useDispatch, useSelector} from 'react-redux';
import {GetPopularRestaurants} from '../../../../redux/action/PopularRestaurant';
import {GetOrderHistory} from '../../../../redux/action/OrderHistory';
import {LARGE, Screens} from '../../../../constants/constants';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { scale } from '../../../../../utils/scale';

export const HomeCardRenderer = ({name, onCardClick, onBtnClick}) => {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userData.isAuthenticated);
  const {data: restaurantsList, loading: restaurantsLoading} = useSelector(
    state => state?.restaurantsdata,
  );
  const {data: orderHistoryList, loading: orderHistoryLoading} = useSelector(
    state => state?.orderHistoryData,
  );

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (name === 'Popular Restaurants') {
      setDataList(restaurantsList?.data?.slice(0, 5));
    } else if (name === 'Order Again') {
      setDataList(orderHistoryList?.data?.slice(0, 5));
    } else {
      setDataList([]);
    }
  }, [restaurantsList, orderHistoryList]);

  useEffect(() => {
    if (name === 'Popular Restaurants') {
      dispatch(GetPopularRestaurants(token));
    } else if (name === 'Order Again') {
      dispatch(GetOrderHistory(token));
    }
  }, [name]);

  if (dataList === undefined || dataList === null || dataList?.length === 0) {
    return null;
  }
  console.log('dataLLLLL',dataList);

  return (
    <View>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Txt style={styles.headingName}>{`${name}`}</Txt>
        <Button
          variant={'link'}
          title={Strings.viewAll}
          titleStyle={styles.viewAllBtn}
          onPress={onBtnClick}
        />
      </View>
      {/* Item */}
      <View>
        {restaurantsLoading || orderHistoryLoading ? (
          // <ActivityIndicator color={theme.palette.PrimaryDeep} size={LARGE} />
         <View style={{margin:scale(20)}}>
         <SkeletonPlaceholder borderRadius={4} >
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
    </View>
        ) : (
          <FlatList
            data={dataList}
            keyExtractor={item => item?._id}
            extraData={dataList}
            renderItem={({item}) => {
              return (
                <View style={styles.listItemContainer}>
                  <ItemCardComp
                    onPress={() =>
                      navigation.navigate(Screens.RestaurantMenue, {
                        PopularRestaurantInfo: item,
                        PopularRestaurantID: item?._id,
            
                      })
                    }
                    item={item}
                  />
                </View>
              );
            }}
            contentContainerStyle={styles.flatListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //* Main Card Renderer
  headerContainer: {
    marginBottom: theme.spacing.margin.m1,
    marginHorizontal: theme.spacing.margin.m1,
    ...theme.commonStyling.defRowSpcBtw,
  },
  headingName: {
    color: theme.palette.TypographyDeep,
    ...theme.typography.common.h2m,
    fontFamily: theme.typography.type.bold,
  },
  viewAllBtn: {
    color: theme.palette.PrimaryDeep,
    textDecorationLine: undefined,
    ...theme.typography.common.h3sb,
  },
  //* Card
  listItemContainer: {
    marginBottom: theme.spacing.margin.m1 / 0.6,
  },
});
