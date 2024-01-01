import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import Images from '../../../../assets/images';
import {scale} from '../../../../../utils/scale';
import {Strings} from '../../../../constants/Strings';
import {POPPINS_MEDIUM, Screens} from '../../../../constants/constants';
import theme from '../../../../themes/theme';
import Botton from '../../core/Button';
const EmptyCart = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageView}>
        <Image source={Images.Group} style={styles.cartImage} />
      </View>
      <Text style={styles.emptyText}>{Strings.emptyCart}</Text>
      <Botton
        title={Strings.addItem}
        variant="single"
        singleButtonStyle={styles.customSingleButtonStyle}
        titleStyle={styles.customTitleStyle}
        onPress={()=>navigation.navigate(Screens.Home)}
      />
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    height: scale(151),
    width: scale(151),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:scale(140)
  },
  cartImage: {
    height: scale(124),
    width: scale(150),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emptyText: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: scale(18),
    fontWeight: '400',
    color: theme.palette.PrimaryDark,
    marginTop: scale(16),
    marginBottom:scale(228)
  },
  btnStyle: {
    height: scale(120),
  },
  customSingleButtonStyle: {
    width: scale(248),
    height: scale(57),
    marginBottom:scale(16)
  },
});
