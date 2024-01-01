import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
//* Components
import CustomTouchableOpacity from '../../core/touchableopacity/CustomTouchableOpacity';
import Txt from '../../core/Txt';

//* Icons
import GreenTick from '../../../../assets/svg/TickCircleGreenFillIcon.svg';
//* Others
import theme from '../../../../themes/theme';
import { scale } from '../../../../../utils/scale';
import DotComp from '../DotComp/DotComp';
import Botton from '../../core/Button';

const PastOrderCard = ({ data, onPress, itemCardStyle,latest }) => {
  const formatTimestamp = timestampString => {
    const timestamp = new Date(timestampString);
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[timestamp.getMonth()];
    const day = timestamp.getDate();
    const hour = timestamp.getHours();
    const minute = timestamp.getMinutes();

    // Format the date as '20 Jun, 10:30'
    const formattedDate = `${day} ${month}, ${hour}:${minute < 10 ? '0' : ''}${minute}`;
    return formattedDate;
  };

  const formattedTimestamp = formatTimestamp(latest?.restaurantDetail[0]?.updatedAt  || data?.restaurantDetail[0]?.updatedAt);

  return (
    <CustomTouchableOpacity
      onPress={onPress}
      style={[styles.itemCardContainer, itemCardStyle]}>
      <View style={styles.footerContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.badgeContainerM}>
              <Image
                source={{ uri: data?.restaurantDetail[0].restaurantLogo || latest?.restaurantDetail[0]?.restaurantLogo}}
                style={styles.badgeContainer}
              />
            </View>
            <View style={{ alignItems: 'flex-start', marginTop: scale(5) }}>
              <Txt style={styles.timing}>{formattedTimestamp + ' 3 Items'}</Txt>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Txt style={styles.rName}>
                  {data?.restaurantDetail[0]?.restaurantName || latest?.restaurantDetail[0]?.restaurantName}
                </Txt>
                <GreenTick />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <DotComp />
                <Txt style={styles.orderDeliver}>{latest?.status || data?.status }</Txt>
              </View>
            </View>
          </View>
          <Txt style={styles.price}>${data?.totalAmount || latest?.totalAmount}</Txt>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: theme.spacing.margin.m1,
            justifyContent: 'space-between',
          }}>
          {latest?.restaurantDetail[0]?.rating || data?.restaurantDetail[0]?.rating ? (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}>
              <Rating
                type="custom"
                ratingColor={theme.palette.SecondaryDark}
                ratingBackgroundColor={theme.palette.white}
                ratingCount={5}
                imageSize={parseInt(scale(16))}
                startingValue={latest?.restaurantDetail[0]?.rating || data?.restaurantDetail[0]?.rating}
                style={{ paddingVertical: scale(10) }}
              />
              <Txt style={styles.orderDeliver}>
                {latest?.restaurantDetail[0]?.rating  || data?.restaurantDetail[0]?.rating }/5
              </Txt>
            </View>
          ) : (
            <Botton
              singleButtonStyle={styles.btn}
              titleStyle={styles.btnTitle}
              title={'Rate'}
            />
          )}
          <Botton
            singleButtonStyle={styles.btnReorder}
            titleStyle={styles.btnTitle1}
            title={'Re-Order'}
          />
        </View>
      </View>
    </CustomTouchableOpacity>
  );
};

export default PastOrderCard;

const styles = StyleSheet.create({
  //* Item Card
  itemCardContainer: {
    marginTop:scale(30),
    width: scale(333, true),
    alignSelf: 'center',
    backgroundColor: theme.palette.white,
    borderRadius: theme.radius.r1,
    marginHorizontal: theme.spacing.margin.m1,
    shadowColor: theme.palette.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4.22,
    elevation: 4,
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
    width: scale(65),
    height: scale(65),
    marginRight: scale(7),
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
    resizeMode: 'center',
  },
  numOfOrder: {
    color: theme.palette.GrayMedium,
    ...theme.typography.common.note,
  },
  timing: {
    color: theme.palette.GrayPlaceHolder,
    ...theme.typography.common.bodyr,
  },
  rName: {
    color: theme.palette.black,
    fontWeight: '600',
    marginRight: theme.spacing.margin.m7,
    ...theme.typography.common.h2r,
  },
  orderDeliver: {
    color: theme.palette.SecondaryDeep,
    fontWeight: '400',
    marginLeft: theme.spacing.margin.m6,
    ...theme.typography.common.bodyr,
    textAlign: 'right',
  },
  price: {
    color: theme.palette.PrimaryDeep,
    fontWeight: '400',
    ...theme.typography.common.h3m,
  },
  btn: {
    width: scale(145),
    backgroundColor: theme.palette.white,
    ...theme.commonStyling.defShadow,
  },
  btnReorder: {
    width: scale(145),
    backgroundColor: theme.palette.white,
    borderColor: theme.palette.PrimaryDark,
    borderWidth: scale(1),
  },
  btnTitle: {
    color: 'black',
  },
  btnTitle1: {
    color: theme.palette.PrimaryDark,
  },
  //* Main Card Image
  itemImage: {
    height: scale(136),
    borderTopLeftRadius: theme.radius.r1,
    borderTopRightRadius: theme.radius.r1,
  },
  //* Footer
  footerContainer: {
    padding: theme.spacing.padding.p4,
    backgroundColor: theme.palette.white,
    borderBottomLeftRadius: theme.radius.r1,
    borderBottomRightRadius: theme.radius.r1,
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
  //* Others
  othersContainer: {
    marginBottom: theme.spacing.margin.m6,
    ...theme.commonStyling.defRow,
  },
  freeDeliveryContainer: {
    marginRight: theme.spacing.margin.m6,
    ...theme.commonStyling.defRow,
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
});
