import React, {useState, useMemo} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
//* Components
import CustomTouchableOpacity from '../../core/touchableopacity/CustomTouchableOpacity';
import Txt from '../../core/Txt';
import ImageItem from '../../core/ImageItem';
//* Icons
import StarYellowFill from '../../../../assets/svg/StarYellowFill.svg';
import HeartIcon from '../../../../assets/svg/BottomTabIcons/HeartIcon';
import GreenTick from '../../../../assets/svg/TickCircleGreenFillIcon.svg';
import RiderIcon from '../../../../assets/svg/RiderRedIcon.svg';
import TimerIcon from '../../../../assets/svg/TimerClockRed.svg';
//* Others
import theme from '../../../../themes/theme';
import {scale} from '../../../../../utils/scale';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ColorSpace} from 'react-native-reanimated';
import {LikeRestaurant} from '../../../../redux/action/Location/LikeRestaurant';
import PopularRestaurant from '../../../screens/PopularRestaurantScreen';

const ItemCardComp = ({
  item,
  onPress,
  itemCardStyle,
  fav,
  callLiked,
  success = () => {},
}) => {
  const {token} = useSelector(state => state?.userData?.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(item?.isLiked);
  const handleFavourite = async () => {
    setIsLoading(true);
    setIsFavorite(!isFavorite);
    try {
      const res = await dispatch(LikeRestaurant(item?._id, token));
      success(res);
      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <CustomTouchableOpacity
      onPress={onPress}
      style={[styles.itemCardContainer, itemCardStyle]}>
      {/* ImageView */}
      <View>
        {/* Badge */}
        <View style={styles.badgeContainerM}>
          <View style={styles.badgeContainer}>
            <Txt style={styles.rating}>
              {item?.restaurantDetail
                ? item?.restaurantDetail[0]?.rating
                : item?.rating}
            </Txt>
            <StarYellowFill />
            <Txt style={styles.numOfOrder}>
              (
              {item?.restaurantDetail
                ? item?.restaurantDetail[0]?.totalRatingUsers
                : item?.totalRatingUsers}
              )
            </Txt>
          </View>

          <CustomTouchableOpacity
            style={styles.heartIconBg}
            onPress={() => handleFavourite(token)}>
            {isLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <HeartIcon
                customStyles={styles.iconHeart}
                active={fav ? fav : isFavorite}
              />
            )}
          </CustomTouchableOpacity>
        </View>
        {/* Image */}
        <ImageItem
          priority="high"
          imageUrl={
            item?.restaurantLogo || item?.restaurantDetail[0]?.restaurantLogo
          }
          imageStyling={styles.itemImage}
        />
      </View>
      {/* Footer */}
      <View style={styles.footerContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Txt style={styles.title}>
            {item?.restaurantName || item?.restaurantDetail[0]?.restaurantName}
          </Txt>
          <GreenTick />
        </View>
        {/* Others */}
        <View style={styles.othersContainer}>
          {item.isActive ? (
            <View style={styles.freeDeliveryContainer}>
              <RiderIcon />
              <Txt style={styles.defText}>Free delivery</Txt>
            </View>
          ) : null}
          <View style={styles.timeContainer}>
            <TimerIcon />
            {/* <Txt style={styles.defText}>{item?.timings?item.timings[0].day+' '+item.timings[1].day:item?.restaurantDetail[0]?.timings[0]?.day+' '+item?.restaurantDetail[0]?.timings[1]?.day}</Txt> */}
            <Txt style={styles.defText}>{'10-15 mins'}</Txt>
          </View>
        </View>
        {/* Tags 
         <View style={styles.tagsContainer}>
           {item.menu.map(item => {
            return (
              <View style={styles.tagContainer}>
                <Txt style={styles.tag}>{item}</Txt>
              </View>
            );
          })}
        </View>*/}
      </View>
    </CustomTouchableOpacity>
  );
};

ItemCardComp.propTypes = {
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

export default ItemCardComp;

const styles = StyleSheet.create({
  //* Item Card
  itemCardContainer: {
    width: scale(276, true),
    backgroundColor: theme.palette.white,
    borderRadius: theme.radius.r1,
    marginHorizontal: theme.spacing.margin.m1,
    ...theme.commonStyling.defShadow,
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
    justifyContent: 'space-between',
  },
  badgeContainer: {
    backgroundColor: theme.palette.white,
    borderRadius: theme.radius.rounded,
    padding: theme.spacing.padding.p7,
    flexDirection: 'row',
    alignItems: 'center',
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
  iconHeart: {
    height: scale(16),
    width: scale(16),
  },
});
