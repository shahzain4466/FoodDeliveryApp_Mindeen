import { Text, View, TouchableOpacity, FlatList, LayoutAnimation, ScrollView } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import Frame from '../../common/core/Frame'
import { Screens } from '../../../constants/constants'
import styles from './styles'
import { Strings } from '../../../constants/Strings'
import UpcomingOrder from '../../common/others/UpcomingOrder/UpcomingOrder'
import PastOrderCard from '../../common/others/PastOrderCard/PastOrderCard'
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { GetOrder } from '../../../redux/action/GetOrder'


export default function MyOrders() {
    const { data: orderHistoryList } = useSelector(state => state.orderHistoryData);
    const [pastOrderList, setPastOrderList] = useState([]);
    const [latestOrderList, setLatestOrderList] = useState([]);
    const [OrderList, setOrderList] = useState([]);
    const [errorState, setError] = useState({ status: false, msg: '' });


    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const { token } = useSelector(state => state.userData.isAuthenticated);
    const getAllOrder = useSelector(state => state?.getOrders)

    const {
        data: getsAllOrder,
        loading: loadinggetAllOrder,
        error: errorgetgetAllOrder,
    } = useMemo(() => getAllOrder, [getAllOrder]);

    useEffect(() => {
        if (loadinggetAllOrder) {
            setError({ status: false, msg: '' });
        } else if (errorgetgetAllOrder) {
            const { message, success } = errorgetgetAllOrder;
            setError({ status: !success, msg: message });
        } else if (getsAllOrder) {
            console.log('getAll order:-', getsAllOrder);
            setOrderList(getsAllOrder?.data)
            setError({ status: false, msg: '' });
        }
    }, [getsAllOrder, loadinggetAllOrder, errorgetgetAllOrder]);

    console.log('orderList', OrderList);

    useEffect(() => {
        dispatch(GetOrder(token))
    }, [dispatch, token, isFocused])

    useEffect(() => {
        console.log('data ---', orderHistoryList)
        setPastOrderList(orderHistoryList?.data);
    }, [orderHistoryList]);
    const [selectedOption, setSelectedOption] = useState(Strings.orderProcessing);

    const handleSelectChange = option => {
        LayoutAnimation.configureNext(LayoutAnimation?.Presets?.easeInEaseOut);
        setSelectedOption(option);
    };
    useEffect(() => {
        const sortedData = pastOrderList?.sort((a, b) => {
            return new Date(b?.restaurantDetail?.createdAt) - new Date(a?.restaurantDetail?.createdAt);
        });
        console.log('fffff', JSON.stringify(sortedData));
        setLatestOrderList(sortedData);
    }, [pastOrderList, isFocused]);

    return (
        <Frame

            // headerVariant={'v1'}
            style={styles.container}
            mode={'view'}
            customNavigation={{ screen: Screens.MainMenu }}
        >
            <View style={styles.innerContainer}>
                <View style={styles.container1}>
                    <TouchableOpacity
                        style={[
                            styles.option,
                            selectedOption === Strings.orderProcessing && styles.selected,
                        ]}
                        onPress={() => {
                            handleSelectChange(Strings.orderProcessing);
                            setError('');
                        }}>
                        <Text
                            style={[
                                styles.UpcomingText,
                                selectedOption === Strings.orderProcessing && styles.selectedAccount,
                            ]}>
                            {Strings.snUpcomingBtn}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.option,
                            selectedOption === Strings.orderHistory && styles.selected,
                        ]}
                        onPress={() => {
                            handleSelectChange(Strings.orderHistory);
                            setError('');
                        }}>
                        <Text
                            style={[
                                styles.UpcomingText,
                                selectedOption === Strings.orderHistory && styles.selectedAccount,
                            ]}>
                            {Strings.snHistoryBtn}
                        </Text>
                    </TouchableOpacity>
                </View>
                {selectedOption == Strings.orderProcessing ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <UpcomingOrder Orderdata={OrderList} showInicator={false} />
                        <View style={styles.Latcon}>
                            <Text style={styles.LatOrd}>{Strings.latestOrder}</Text>
                        </View>
                        <FlatList
                            data={latestOrderList?.slice(0, 2)}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.listItemContainer}>
                                    <PastOrderCard latest={item} itemCardStyle={styles.CardStyle} />
                                </View>
                            )}
                        />

                    </ScrollView>
                    :
                    <FlatList
                        data={latestOrderList}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.listItemContainer}>
                                <PastOrderCard data={item} itemCardStyle={styles.CardStyle} />
                            </View>
                        )}
                    />
                }
            </View>
        </Frame>
    )
}