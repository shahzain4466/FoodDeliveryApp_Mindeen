import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Frame from '../../common/core/Frame';
import styles from './styles';
import { Strings } from '../../../constants/Strings';
import PastOrderCard from '../../common/others/PastOrderCard/PastOrderCard';
import { GetOrderHistory } from '../../../redux/action/OrderHistory';
//Libraries
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Txt from '../../common/core/Txt';

export default function PastOrderScreen() {

  const { data: orderHistoryList } = useSelector(state => state.orderHistoryData);
  const [pastOrderList, setPastOrderList] = useState([]);
  useEffect(() => {
    setPastOrderList(orderHistoryList.data);
  }, [orderHistoryList]);

  return (
    <Frame mode="view" style={styles.container} screenTitle={Strings.pastOrder}>
      {pastOrderList.length === 0 ? (
        <Txt>No Data</Txt>
      ) : (
        <View>
          <FlatList
            data={pastOrderList}
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <PastOrderCard data={item} />
              </View>
            )}
          />
        </View>
      )}
    </Frame>
  );
}
