import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
//* Components
import CustomTouchableOpacity from '../../core/touchableopacity/CustomTouchableOpacity';
import Txt from '../../core/Txt';
import ImageItem from '../../core/ImageItem';
//* Icons
import StarYellowFill from '../../../../assets/svg/StarYellowFill.svg';
import WhiteHeart from '../../../../assets/svg/HeartWhiteIcon.svg'
import GreenTick from '../../../../assets/svg/TickCircleGreenFillIcon.svg';
import RiderIcon from '../../../../assets/svg/RiderRedIcon.svg';
import TimerIcon from '../../../../assets/svg/TimerClockRed.svg';
//* Others
import theme from '../../../../themes/theme';
import { scale } from '../../../../../utils/scale';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../../../../assets/images';
import { Strings } from '../../../../constants/Strings';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../../constants/constants';


const SearchResturent = ({ item, itemCardStyle, onPress, hotel }) => {

    const navigation = useNavigation()

    useEffect(() => {
        console.log("item -SearchResturent -->>>", JSON.stringify(item))
    }, [])

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={[styles.itemcontainer, { pointerEvents: 'box-only' }]}
                onPress={() => navigation.navigate(Screens.AddQuantity, { FoodItem: item })}
                key={index}>
                <Image
                    source={{ uri: item?.imageUrl }}
                    style={styles.item1pic}
                />
                <View>
                    <Text style={styles.itemname}>{item?.title}</Text>
                    <Text style={styles.itemprice}>{item?.itemVariations[0]?.price} {Strings.moneySign}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <CustomTouchableOpacity
            activeOpacity={1}
            style={[styles.itemCardContainer, itemCardStyle,]}
        >
            {/* ImageView */}
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.insideCardContainer}
                onPress={() => navigation.navigate(Screens.RestaurantMenue, { data: item })} >

                {/* Badge */}
                <View style={styles.badgeContainerM}>
                    <View style={styles.badgeContainer}>
                        <Txt style={styles.rating}>{item?.restaurantDetails[0]?.rating || item?.restaurantDetails[0]?.rating}</Txt>
                        <StarYellowFill />
                        <Txt style={styles.numOfOrder}>({item?.restaurantDetails[0]?.totalRatingUsers || item?.restaurantDetails[0]?.totalRatingUsers})</Txt>
                    </View>
                    <TouchableOpacity>
                        <WhiteHeart />
                    </TouchableOpacity>
                </View>
                <Image
                    source={{ uri: item?.restaurantDetails[0]?.restaurantLogo || item?.restaurantDetails[0]?.restaurantLogo || Images?.Resturentimg }}
                    style={styles.itemImage}
                    resizeMode="contain"
                />

                {/* Footer */}
                <View style={styles.footerContainer}>
                    {/* Title */}
                    <View style={styles.titleContainer}>
                        <Txt style={styles.title}>{item?.restaurantDetails[0]?.restaurantName || item?.restaurantDetails[0]?.restaurantName}</Txt>
                        <GreenTick />
                    </View>
                    {/* Others */}
                    <View style={styles.othersContainer}>
                        {item?.restaurantDetails[0]?.isActive || item?.restaurantDetails[0]?.isActive ? (
                            <View style={styles.freeDeliveryContainer}>
                                <RiderIcon />
                                <Txt style={styles.defText}>{Strings.delieveyType}</Txt>
                            </View>
                        ) : null}
                        <View style={styles.timeContainer}>
                            <TimerIcon />
                            <Txt style={styles.defText}>{'10-15 mins'}</Txt>
                        </View>
                    </View>
                    <View style={styles.itemscontainer}>
                        <FlatList
                            data={item?.items?.flat() || item?.items?.flat()}
                            extraData={item?.items || item?.items}
                            numColumns={2}
                            keyExtractor={(item, index) => item?._id}
                            renderItem={renderItem}
                            columnWrapperStyle={styles.columnWrapper}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </CustomTouchableOpacity>
    );
};

SearchResturent.propTypes = {
    item: PropTypes.shape({
        rating: PropTypes.number.isRequired,
        numOfOrders: PropTypes.number.isRequired,
        restaurantImg: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isFreeDelivery: PropTypes.bool.isRequired,
        time: PropTypes.string.isRequired,
        menu: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default SearchResturent;

const styles = StyleSheet.create({
    //* Item Card
    itemCardContainer: {
        width: '98%',
        alignSelf: 'center',
        backgroundColor: theme.palette.white,
        borderRadius: theme.radius.r1,
        marginVertical: scale(10),
        shadowColor: theme.palette.shadowColor,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.19,
        shadowRadius: 5.62,
        elevation: 6

    },
    insideCardContainer: {
        width: '95%',
        alignSelf: 'center',
        marginVertical: scale(10)
    },

    defAlignment: {
        ...theme.commonStyling.defRow,
    },
    defText: {
        color: theme.palette.GrayMedium,
        ...theme.typography.common.bodyr,
        marginLeft: theme.spacing.margin.m6,
    },
    //* Mini Badge
    badgeContainerM: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 1,
        justifyContent: 'space-between'
    },
    badgeContainer: {
        backgroundColor: theme.palette.white,
        borderRadius: theme.radius.rounded,
        padding: theme.spacing.padding.p7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    numOfOrder: {
        color: theme.palette.GrayMedium,
        ...theme.typography.common.note,
    },
    rating: {
        color: theme.palette.TypographyDeep,
        ...theme.typography.common.bodysm,
    },
    //* Main Card Image
    itemImage: {
        height: scale(136),
        width: '100%',
        borderTopLeftRadius: theme.radius.r1,
        borderTopRightRadius: theme.radius.r1,
    },
    //* Footer
    footerContainer: {
        width: '100%',
        padding: theme.spacing.padding.p5,
        backgroundColor: theme.palette.white,
        // borderBottomLeftRadius: theme.radius.r1,
        // borderBottomRightRadius: theme.radius.r1,
    },
    //* Title
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.margin.m6,
    },
    title: {
        color: theme.palette.TypographyDeep,
        ...theme.typography.common.h2sb,
        fontFamily: theme.typography.type.bold,
        marginRight: theme.spacing.margin.m6,
    },
    columnWrapper: {
        justifyContent: 'space-between', // Add this line to space columns
    },
    //* Others
    othersContainer: {
        marginBottom: theme.spacing.margin.m6,
        ...theme.commonStyling.defRow,
    },
    freeDeliveryContainer: {
        marginRight: theme.spacing.margin.m6,
        ...theme.commonStyling.defRow,
    },
    itemscontainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scale(5),
    },
    timeContainer: {
        ...theme.commonStyling.defRow,
    },
    //* Tags
    tagsContainer: {
        ...theme.commonStyling.defRow,
    },
    flatListContainer: {
        marginTop: theme.spacing.margin.m6,
    },
    tagContainer: {},
    tag: {
        color: theme.palette.GrayMedium,
        backgroundColor: theme.palette.GrayLight,
        paddingHorizontal: theme.spacing.padding.p5,
        paddingVertical: theme.spacing.padding.p7,
        marginRight: theme.spacing.margin.m6,
        borderRadius: theme.radius.r5,
        ...theme.typography.common.note,
    },
    itemcontainer: {
        // width: '47%'
        width: scale(158),
        height: scale(52),
        marginHorizontal: scale(3),
        backgroundColor: theme.palette.white,
        flexDirection: 'row',
        borderRadius: scale(9),
        marginVertical: scale(8),
        shadowColor: theme.palette.shadowColor,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 4.22,
        elevation: 3,
    },
    item1pic: {
        width: scale(52),
        height: scale(52),
        borderRadius: scale(9)
    },
    itemname: {
        fontSize: scale(11),
        fontFamily: theme.typography.type.reg,
        lineHeight: scale(12),
        color: theme.palette.black,
        width: scale(93),
        height: scale(24),
        marginLeft: scale(5),
        marginTop: scale(5)

    },
    itemprice: {
        fontSize: scale(9),
        fontFamily: theme.typography.type.reg,
        lineHeight: scale(13),
        fontWeight: '600',
        paddingHorizontal: scale(10),
        paddingTop: scale(5),
        color: theme.palette.PrimaryDeep
    }
});
