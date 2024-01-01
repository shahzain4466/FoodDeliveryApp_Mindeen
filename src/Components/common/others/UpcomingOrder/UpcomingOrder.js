import { View, StyleSheet, Text, Button, Image, FlatList } from 'react-native';
import React from 'react'
import theme from '../../../../themes/theme';
import { scale } from '../../../../../utils/scale';
import GreenTick from '../../../../assets/svg/TickCircleGreenFillIcon.svg';
import { Strings } from '../../../../constants/Strings';
import Botton from '../../core/Button';

const UpcomingOrder = ({Orderdata,showInicator}) => {
// console.log('checkrd-=<>',data[0]?._id);
const renderItem=({item})=>{
    console.log("checking", item?.items?.quantity);
    return(
        <View style={styles.itemCardContainer}  key={item?.index}>
            <View style={styles.innercontainer}>
                <View style={styles.mainHeader}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.badgeContainerM}>
                            <Image
                                source={{uri:item?.restaurantDetails[0]?.restaurantLogo}}
                                style={styles.badgeContainer}

                            />
                        </View>
                        <View style={styles.orderprofile}>
                            <Text style={styles.totitem}>{item?.items[0]?.quantity} Items</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.postername}>{item?.restaurantDetails[0]?.restaurantName}</Text>
                                <GreenTick />
                            </View>
                        </View>
                    </View>
                    <Text style={styles.idtxt}>{'#264100'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.arrival}>Estimated Arrival</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.time}>{item?.items[0]?.itemDetails?.cookingTime}</Text>
                            <Text style={styles.mint}>min</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.arrival}>Now</Text>
                        <Text style={styles.way}>Food on the way</Text>
                    </View>
                </View>
                <View style={styles.Btncontainer}>
                    <Botton
                        singleButtonStyle={styles.btn}
                        titleStyle={styles.btnTitle}
                        title={'Cancel'}
                    />
                    <Botton
                        singleButtonStyle={styles.btnReorder}
                        titleStyle={styles.btnTitle1}
                        title={'Track Order'}
                    />
                </View>
            </View>

        </View>
    )
}

    return (
        <FlatList
        data={Orderdata}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item=>item._id}
        />
    )
}

export default UpcomingOrder
const styles = StyleSheet.create({
    itemCardContainer: {
        marginTop: 30,
        // alignSelf: 'center',
        borderColor: theme.palette.TypographyDark,
        backgroundColor: theme.palette.white,
        borderRadius: theme.radius.r1,
        borderWidth: scale(1),
        // marginHorizontal: theme.spacing.margin.m1,
        shadowColor: '#1A1D26',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 4.22,
        elevation: 4,
    },
    innercontainer: {
        padding: 10,

    },
    mainHeader: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    buttonStyle: {
        width: scale(50)
    },
    Btncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scale(10),
        width: '100%',
        marginBottom: scale(10)
    },
    btn: {
        width: '45%',
        backgroundColor: theme.palette.white,
        ...theme.commonStyling.defShadow,
    },
    btnReorder: {
        width: '45%',
        backgroundColor: theme.palette.white,
        borderColor: theme.palette.PrimaryDark,
        borderWidth: scale(1),
    },
    btnTitle: {
        color: theme.palette.simpleblack,
        ...theme.typography.common.h3r,
        fontWeight: '500'
    },
    btnTitle1: {
        color: theme.palette.PrimaryDark,
        ...theme.typography.common.h3r,
        fontWeight: '500'
    },
    badgeContainerM: {
        width: scale(65),
        height: scale(65),
        backgroundColor: theme.palette.white,
        borderRadius: theme.radius.r1,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.commonStyling.defShadow,
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.22,
        shadowRadius: 9.22,
        elevation: 12,
        shadowColor: '#C4C4C4',
    },
    badgeContainer: {
        width: scale(45),
        height: scale(45),
        borderRadius: theme.radius.rounded,
        resizeMode: 'cover',
    },
    postername: {
        ...theme.typography.common.h2r,
        fontWeight: '600',
        marginRight: scale(8),
        color: theme.palette.deepblack
    },
    totitem: {
        ...theme.typography.common.bodyr,
          color:theme.palette.GrayPlaceHolder
    },
    idtxt: {
        ...theme.typography.common.bodyr,
        color: theme.palette.PrimaryDeep,
        marginTop: scale(5)
    },
    orderprofile: {
        marginLeft: scale(7),
        marginTop: 10
    },
    arrival: {
        ...theme.typography.common.bodyr,
        marginTop: scale(10),
        color: theme.palette.GrayPlaceHolder,
        fontWeight: '500'
    },
    time: {
        ...theme.typography.common.h1r,
        color: theme.palette.deepblack,
        fontWeight: '600'
    },
    mint: {
        ...theme.typography.common.h3r,
        color: theme.palette.deepblack,
        marginTop: scale(24),
        marginLeft: scale(2)
    },
    way: {
        ...theme.typography.common.bodyr,
        color: theme.palette.simpleblack,
        fontWeight: '500'
    }
})