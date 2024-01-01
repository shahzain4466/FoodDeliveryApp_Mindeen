import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  propTy,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ImageItem from '../../core/ImageItem';
import PropTypes from 'prop-types';

import {scale} from '../../../../../utils/scale';
import Txt from '../../core/Txt';
import CustomTouchableOpacity from '../../core/touchableopacity/CustomTouchableOpacity';
import theme from '../../../../themes/theme';
import {LikeRestaurant} from '../../../../redux/action/Location/LikeRestaurant';
import Back from '../../../../assets/svg/ChevronBack.svg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {CartCounter} from '../../../../redux/action/CartCounter';
import {Screens} from '../../../../constants/constants';
import HeartIcon from '../../../../assets/svg/BottomTabIcons/HeartIcon';

const RestaurantMenuMenuHeader = ({
  liked,
  imagesItemUri,
  headerImageUri,
  PopularRestaurantID,
  title,
}) => {
  const {token} = useSelector(state => state?.userData?.isAuthenticated);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [itemImage, setItemImage] = useState(headerImageUri);
  const handleBack = () => {
    // dispatch(CartCounter())
    navigation.goBack();
  };
  const [isFavorite, setIsFavorite] = useState(liked);
  const handleFavourite = () => {
    setIsFavorite(!isFavorite);
    dispatch(LikeRestaurant(PopularRestaurantID, token));
  };

  // const RestaurantCard = ({restaurantId}) => {
  //   const dispatch = useDispatch();
  // };

  return (
    <ImageItem
      imageUrl={itemImage}
      imageStyling={styles.backgroundImage}
      containerStyle={styles.imageContainer}
      priority={'high'}
      imageBackground={'true'}>
      {/* header */}
      <View style={styles.headerContainer}>
        {/* back btn */}
        <CustomTouchableOpacity
          style={styles.iconBg}
          onPress={handleBack}
          disabled={!!!handleBack}>
          <Back />
        </CustomTouchableOpacity>

        {/* favourite btn */}

        <CustomTouchableOpacity
          style={styles.heartIconBg}
          onPress={() => handleFavourite(token)}>
          <HeartIcon 
          customStyles={styles.iconHeart}
          active={isFavorite} />
        </CustomTouchableOpacity>
      </View>
      {/* footer */}
      <View style={styles.footer}>
        <Txt style={styles.title}>{title}</Txt>
        <View style={{height: 'auto'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {imagesItemUri?.slice(0, 4)?.map(URL => (
              <TouchableOpacity onPress={() => setItemImage(URL)}>
                <ImageItem
                  imageUrl={URL}
                  imageStyling={styles.smallImages}
                  containerStyle={{marginBottom: theme.spacing.margin.m7}}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ImageItem>
  );
};

export default RestaurantMenuMenuHeader;

const styles = StyleSheet.create({
  // menu header
  imageContainer: {
    height: scale(205),
  },
  backgroundImage: {
    borderRadius: theme.radius.r3,
    padding: theme.spacing.padding.p4,
    justifyContent: 'space-between',
    ...theme.commonStyling.defShadow,
  },
  headerContainer: {
    ...theme.commonStyling.defRowSpcBtw,
  },
  // menu footer
  footer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    flex: 0.55,
    color: theme.palette.white,
    fontSize: scale(28),
    fontFamily: theme.typography.type.reg,
    fontWeight: '600',
    color: theme.palette.white,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: 0.5, height: 2},
    textShadowRadius: 10,
  },

  iconBg: {
    tintColor: theme.palette.PrimaryDeep,
    backgroundColor: theme.palette.white,
    paddingHorizontal: theme.spacing.padding.p2,
    paddingVertical: theme.spacing.padding.p3,
    borderRadius: theme.radius.r2,
    ...theme.commonStyling.defShadow,
  },
  heartIconBg: {
    height: scale(28),
    width: scale(28, true),
    backgroundColor: theme.palette.white,
    borderRadius: theme.radius.rounded,
    ...theme.commonStyling.defShadow,
    ...theme.commonStyling.defCenter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallImages: {
    height: scale(35),
    width: scale(35, true),
    borderRadius: theme.radius.r5,
  },
  iconHeart:{
    height:scale(17),
    width:scale(16)
  }
});

// Document PropTypes
RestaurantMenuMenuHeader.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  imagesItemUri: PropTypes.arrayOf(PropTypes.string),
  headerImageUri: PropTypes.string.isRequired,
  handleBack: PropTypes.func,
  handleFavourite: PropTypes.func,
};
